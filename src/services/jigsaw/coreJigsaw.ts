import {loadImage, makePiece, splitImage} from "./producer/image.ts";
import {translate} from "./producer/edge.ts";

let img: ImageData;
const pieces: Piece[] = [];
const piecePaths: Path2D[] = [];

let ctx: CanvasRenderingContext2D;
let canvasW: number, canvasH: number;
let pictureW: number, pictureH: number;
let rows: number, cols: number;
let pw: number, ph: number;

interface Piece {
  x: number;
  y: number;
  pos: number[];
  width: number;
  height: number;
  imageData: ImageBitmap;
  mask: number[][];
}

async function beginPuzzle() {
  const dpr = window.devicePixelRatio || 1;
  canvasW = window.innerWidth * dpr;
  canvasH = window.innerHeight * dpr;

  rows = 10; // number of rows
  cols = 20; // number of columns

  // load image
  const imageData = await loadImage(canvasW, canvasH);
  if (!imageData) {
    throw new Error('Failed to load image');
  }
  img = imageData;
  pictureW = imageData.width;
  pictureH = imageData.height;

  // split image into pieces
  const piecesImg = await splitImage(imageData, rows, cols);

  // make it into pieces
  const piecesArray = makePiece(
    piecesImg,
    window.innerWidth, window.innerHeight,
    imageData.width, imageData.height,
    rows, cols
  );
  pieces.push(...piecesArray);

  pw = pieces[0].width;
  ph = pieces[0].height;
}

function setCanvasContext(
  ctx_: CanvasRenderingContext2D
) {
  ctx = ctx_;
  const dpr = window.devicePixelRatio || 1;
  canvasW = window.innerWidth * dpr;
  canvasH = window.innerHeight * dpr;

  render();
}

function reportMouseSelection(
  x: number, y: number
): number {
  for(let i=0; i<piecePaths.length; i++)
    if(ctx.isPointInPath(piecePaths[i], x, y)) {
      const piece = pieces.splice(i, 1)[0];
      const edge = piecePaths.splice(i, 1)[0];
      pieces.push(piece);
      piecePaths.push(edge);
      return 1;
    }

  return 0;
}

function reportMouseUp() {
  const lastIdx = pieces.length - 1;
  const x = pieces[lastIdx].x + (pw/2);
  const y = pieces[lastIdx].y + (ph/2);

  const aStartX = (canvasW - pictureW) / 2;
  const aStartY = (canvasH - pictureH) / 2;
  const ax = x - aStartX;
  const ay = y - aStartY;

  if(ax > 0 && ay > 0 && ax < pictureW && ay < pictureH) {
    const col = Math.floor(ax / pw);
    const row = Math.floor(ay / ph);

    pieces[lastIdx].x = (aStartX + (pw * col));
    pieces[lastIdx].y = (aStartY + (ph * row));

    render();
  }
}

function reportMousePosition(
  dx: number, dy: number,
) {
  const lastIdx = pieces.length - 1;
  pieces[lastIdx].x += dx;
  pieces[lastIdx].y += dy;

  render();
}

function render() {
  // clear canvas
  ctx.clearRect(0, 0, canvasW, canvasH);

  // clear path array
  piecePaths.length = 0;

  // set background color
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, canvasW, canvasH);

  ctx.lineWidth = 1;
  ctx.lineCap = 'round';

  // draw answer grid
  ctx.strokeStyle = '#000';
  ctx.beginPath();
  const sx = Math.floor((canvasW-pictureW)/2);
  const sy = Math.floor((canvasH-pictureH)/2);
  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < cols; j++) {
      ctx.rect(sx + j * pw, sy + i * ph, pw, ph);
    }
  }
  ctx.stroke();

  // draw pieces
  for(let i = 0; i<pieces.length; i++) {
    const piece = pieces[i];

    const path = new Path2D();
    const mask = translate(piece.mask, piece.x, piece.y);
    path.moveTo(mask[0][0], mask[0][1]);
    mask.forEach((q) => {
      path.lineTo(q[0], q[1]);
      path.quadraticCurveTo(
        q[2], q[3],
        q[4], q[5]
      );
    });
    path.closePath();

    ctx.save();
    ctx.clip(path);

    ctx.drawImage(
      piece.imageData,
      piece.x - (piece.pos[1] === 0 ? 0 : piece.width  * 0.3),
      piece.y - (piece.pos[0] === 0 ? 0 : piece.height * 0.3),
    );
    ctx.restore();

    ctx.stroke(path);
    piecePaths.push(path);
  }
}

export {
  beginPuzzle, setCanvasContext,
  reportMousePosition, reportMouseSelection, reportMouseUp,
  render
};

export type {
  Piece
};

