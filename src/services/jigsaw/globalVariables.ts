interface Piece {
  x: number;
  y: number;
  pos: number[];
  width: number;
  height: number;
  imageData: ImageBitmap;
  mask: number[][];
}

const pieces: Piece[] = [];
const piecePaths: Path2D[] = [];

let selectedLength = -1;
let ctx: CanvasRenderingContext2D;
let canvasW: number, canvasH: number;
let pictureW: number, pictureH: number;
let rows: number, cols: number;
let pw: number, ph: number;

function setPiecesCount(
  rows_: number, cols_: number,
) {
  rows = rows_;
  cols = cols_;
}

function setPieceSize(
  pw_: number, ph_: number,
) {
  pw = pw_;
  ph = ph_;
}

function setCanvasSize(
  width: number, height: number,
) {
  const dpr = window.devicePixelRatio || 1;
  canvasW = width * dpr;
  canvasH = height * dpr;
}

function setCanvas(
  ctx_: CanvasRenderingContext2D,
) {
  ctx = ctx_;
}

function setPictureSize(
  width: number, height: number,
) {
  pictureW = width;
  pictureH = height;
}

function setSelectedLength(
  length: number,
) {
  selectedLength = length;
}

export {
  ctx,
  pieces, piecePaths,
  selectedLength,
  canvasW, canvasH,
  pictureW, pictureH,
  rows, cols,
  pw, ph,
}

export {
  setPiecesCount,
  setCanvasSize,
  setPictureSize,
  setPieceSize,
  setCanvas,
  setSelectedLength,
}

export type PieceType = Piece;
