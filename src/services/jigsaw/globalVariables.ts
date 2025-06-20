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
let scale: number = 1;
let dx = 0, dy = 0;

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

function setScale(
  scale_: number,
) {
  scale = scale_;
}

function setTranslation(
  dx_: number, dy_: number,
) {
  dx = dx_;
  dy = dy_;
}

function setDx(
  dx_: number,
) {
  if(dx_ < canvasW * (1 - scale) / 2) dx = canvasW * (1 - scale) / 2;
  else if(dx_ > canvasW * (scale - 1) / 2) dx = canvasW * (scale - 1) / 2;
  else dx = dx_;
}

function setDy(
  dy_: number,
) {
  if(dy_ < canvasH * (1 - scale) / 2) dy = canvasH * (1 - scale) / 2;
  else if(dy_ > canvasH * (scale - 1) / 2) dy = canvasH * (scale - 1) / 2;
  else dy = dy_;
}

export {
  ctx,
  pieces, piecePaths,
  selectedLength,
  canvasW, canvasH,
  pictureW, pictureH,
  rows, cols,
  pw, ph,
  scale,
  dx, dy,
}

export {
  setPiecesCount,
  setCanvasSize,
  setPictureSize,
  setPieceSize,
  setCanvas,
  setSelectedLength,
  setScale,
  setTranslation, setDx, setDy
}

export type {Piece};
