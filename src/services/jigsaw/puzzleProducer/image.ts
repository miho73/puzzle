import {Jimp} from 'jimp';
import type {Piece} from "../coreJigsaw.ts";
import {
  flipX,
  flipY,
  generateEdgeCurve,
  reflect,
  reverse,
  translate
} from "./edge.ts";

async function loadImage(w: number, h: number): Promise<ImageData> {
  const image = await Jimp.read('src/assets/alps-wonderful-region.png');

  // Resize the image to fit the canvas
  let ratio = Math.min(0.7 * w / image.width, 0.7 * h / image.height);
  if (ratio > 1) {
    ratio = 1;
  }
  image.scale(ratio);

  // Convert the image to RGBA format
  return new ImageData(
    new Uint8ClampedArray(image.bitmap.data),
    image.bitmap.width,
    image.bitmap.height
  );
}

async function splitImage(
  imageData: ImageData,
  rows: number,
  cols: number
): Promise<ImageBitmap[]> {
  const w = imageData.width;
  const h = imageData.height;

  const pieces: ImageBitmap[] = [];
  const imageDataArray = imageData.data;

  const pieceWidth = Math.floor(w / cols);
  const pieceHeight = Math.floor(h / rows);
  const bufferWidth = Math.floor(pieceWidth * 0.3);
  const bufferHeight = Math.floor(pieceHeight * 0.3);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let width = pieceWidth, height = pieceHeight;
      let x = col * pieceWidth, y = row * pieceHeight;

      if(row !== 0) {
        height += bufferHeight;
        y -= bufferHeight;
      }
      if(row !== rows-1) {
        height += bufferHeight;
      }
      if(col !== 0) {
        width += bufferWidth;
        x -= bufferWidth;
      }
      if(col !== cols-1) {
        width += bufferWidth;
      }

      const pieceDataArray = new Uint8ClampedArray(width * height * 4);

      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          const srcIndex = ((y + i) * w + (x + j)) * 4;
          const destIndex = (i * width + j) * 4;
          pieceDataArray[destIndex] = imageDataArray[srcIndex];
          pieceDataArray[destIndex + 1] = imageDataArray[srcIndex + 1];
          pieceDataArray[destIndex + 2] = imageDataArray[srcIndex + 2];
          pieceDataArray[destIndex + 3] = imageDataArray[srcIndex + 3];
        }
      }

      const pieceData = new ImageData(
        pieceDataArray,
        width,
        height
      );

      const bitmap = await createImageBitmap(pieceData);
      pieces.push(bitmap);
    }
  }

  return pieces;
}

interface Edge {
  left: number[][];
  right: number[][];
  top: number[][];
  bottom: number[][];
}

function makePiece(
  pieces: ImageBitmap[],
  canvasWidth: number, canvasHeight: number,
  width: number,
  height: number,
  rows: number,
  cols: number
): Piece[] {
  const pw = Math.floor(width / cols);
  const ph = Math.floor(height / rows);
  const areaMarginH = 40;
  const areaMarginV = 40;

  const forbiddenAreaBeginX = Math.floor((canvasWidth - width) / 2);

  const seg: Piece[] = pieces.map((piece) => {
    const side = Math.round(Math.random());
    let x = areaMarginH + Math.floor(Math.random() * (forbiddenAreaBeginX - areaMarginH - pw * 1.2));
    const y = areaMarginV + Math.floor(Math.random() * (canvasHeight - areaMarginV * 2 - ph));

    if(side === 1) {
      x = (canvasWidth - x - pw);
    }

    return {
      x: x,
      y: y,
      width: pw,
      height: ph,
      imageData: piece,
      mask: [],
      pos: []
    };
  });

  // Initialize edges for each piece
  const edges: Edge[][] = [];
  for(let i=0; i<rows; i++) {
    edges[i] = [];
    for(let j=0; j<cols; j++) {
      edges[i].push({
        left: [],
        right: [],
        top: [],
        bottom: []
      });
    }
  }

  // crust maker
  for(let i=0; i<rows; i++) {
    edges[i][0].left = [[0, ph, 0, 0, 0, 0]];
    edges[i][cols-1].right = [[pw, 0, pw, ph, pw, ph]]
  }
  for(let i=0; i<cols; i++) {
    edges[0][i].top = [[0, 0, 0, 0, pw, 0]];
    edges[rows-1][i].bottom = [[pw, ph, 0, ph, 0, ph]];
  }

  // horizontal edges
  for(let i=0; i<rows-1; i++) {
    for(let j=0; j<cols; j++) {
      let edge = generateEdgeCurve(pw, ph, 0, 0);
      let conjugate = translate(edge, 0, ph);
      if(Math.random() > 0.5) {
        edge = flipY(0, edge);
        conjugate = flipY(ph, conjugate);
      }
      conjugate = reverse(conjugate);

      conjugate.forEach((path) => {
        edges[i][j].bottom.push(path);
      });
      edge.forEach((path) => {
        edges[i+1][j].top.push(path);
      });
    }
  }

  // vertical edges
  for(let i=0; i<rows; i++) {
    for(let j=0; j<cols-1; j++) {
      let edge = reflect(generateEdgeCurve(ph, pw, 0, 0));
      let conjugate = translate(edge, pw, 0);
      if(Math.random() > 0.5) {
        edge = flipX(0, edge);
        conjugate = flipX(pw, conjugate);
      }
      edge = reverse(edge);

      conjugate.forEach((path) => {
        edges[i][j].right.push(path);
      });
      edge.forEach((path) => {
        edges[i][j+1].left.push(path);
      });
    }
  }

  // apply edges to pieces
  for(let i=0; i<rows; i++) {
    for(let j=0; j<cols; j++) {
      const edge = edges[i][j];

      edge.top.forEach((path) => seg[i*cols+j].mask.push(path));
      edge.right.forEach((path) => seg[i*cols+j].mask.push(path));
      edge.bottom.forEach((path) => seg[i*cols+j].mask.push(path));
      edge.left.forEach((path) => seg[i*cols+j].mask.push(path));
      seg[i*cols+j].pos = [i, j];
    }
  }

  // shuffle pieces
  for (let i = seg.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [seg[i].x, seg[j].x] = [seg[j].x, seg[i].x];
    [seg[i].y, seg[j].y] = [seg[j].y, seg[i].y];
  }

  return seg;
}

export {
  loadImage,
  splitImage,
  makePiece
}
