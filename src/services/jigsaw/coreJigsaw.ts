import {loadImage, makePiece, splitImage} from "./producer/image.ts";
import {translate} from "./producer/edge.ts";

let img: ImageData;
const pieces: Piece[] = [];
const piecePaths: Path2D[] = [];

let selectedLength = -1;
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

  rows = 2; // number of rows
  cols = 4; // number of columns

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
    canvasW, canvasH,
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
  for(let i=0; i<pieces.length; i++) {
    if (ctx.isPointInPath(piecePaths[i], x, y)) {
      if (i > selectedLength) {
        const piece = pieces.splice(i, 1)[0];
        const edge = piecePaths.splice(i, 1)[0];
        pieces.unshift(piece);
        piecePaths.unshift(edge);
        selectedLength = 0;
      }
      return 1;
    }
  }
  selectedLength = -1;

  return 0;
}

function reportMouseUp() {
  const aStartX = (canvasW - pictureW) / 2;
  const aStartY = (canvasH - pictureH) / 2;

  for(let i=0; i<=selectedLength; i++) {
    const x = pieces[i].x + (pw / 2);
    const y = pieces[i].y + (ph / 2);
    const ax = x - aStartX;
    const ay = y - aStartY;

    if (ax > 0 && ay > 0 && ax < pictureW && ay < pictureH) {
      const col = Math.floor(ax / pw);
      const row = Math.floor(ay / ph);

      pieces[i].x = (aStartX + (pw * col));
      pieces[i].y = (aStartY + (ph * row));
    }
  }

  render();
}

function reportMousePosition(
  dx: number, dy: number,
) {
  for(let i=0; i<=selectedLength; i++) {
    pieces[i].x += dx;
    pieces[i].y += dy;
  }

  render();
}

function render() {
  // clear canvas
  ctx.clearRect(0, 0, canvasW, canvasH);

  // clear path array
  piecePaths.length = 0;

  ctx.lineWidth = 1;
  ctx.lineCap = 'round';

  // draw answer grid
  ctx.strokeStyle = '#fafafa';
  ctx.beginPath();
  const sx = Math.floor((canvasW-pictureW)/2);
  const sy = Math.floor((canvasH-pictureH)/2);
  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < cols; j++) {
      ctx.rect(sx + j * pw, sy + i * ph, pw, ph);
    }
  }
  ctx.stroke();

  ctx.strokeStyle = '#000';
  ctx.fillStyle = '#fafafaaa';
  // draw pieces
  for(let i = pieces.length - 1; i>=0; i--) {
    const piece = pieces[i];

    const path = new Path2D();
    const mask = translate(piece.mask, piece.x, piece.y);

    if(i <= selectedLength) ctx.lineWidth = 4;
    else ctx.lineWidth = 1;

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

  // reverse path array
  piecePaths.reverse();
}

function updateSelection(
  x0: number, y0: number, x1: number, y1: number
) {
  render();

  ctx.beginPath();
  ctx.fillStyle = '#fafafa44';
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 1;
  ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
  ctx.stroke();
  ctx.closePath();
}

function completeSelection(
  x0: number, y0: number, x1: number, y1: number
) {
  const areaLeftX = Math.min(x0, x1), areaLeftY = Math.min(y0, y1);
  const areaRightX = Math.max(x0, x1), areaRightY = Math.max(y0, y1);

  selectedLength = -1;

  pieces.forEach((piece, i) => {
    const ltx = piece.x, lty = piece.y;
    const rbx = piece.x + piece.width, rby = piece.y + piece.height;
    if(
      ((ltx - areaLeftX) * (ltx - areaRightX) < 0 || (rbx - areaLeftX) * (rbx - areaRightX) < 0) &&
      ((lty - areaLeftY) * (lty - areaRightY) < 0 || (rby - areaLeftY) * (rby - areaRightY) < 0)
    ) {
      selectedLength++;

      const piece = pieces.splice(i, 1)[0];
      const edge = piecePaths.splice(i, 1)[0];
      pieces.unshift(piece);
      piecePaths.unshift(edge);
    }
  });

  render();
}

export {
  beginPuzzle, setCanvasContext,
  updateSelection, completeSelection,
  reportMousePosition, reportMouseSelection, reportMouseUp,
  render
};

export type {
  Piece
};

