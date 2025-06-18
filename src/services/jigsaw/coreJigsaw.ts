import render from "./render.ts";
import * as Var from "./globalVariables.ts";
import {
  pieces,
  setCanvas,
  setCanvasSize,
  setPictureSize,
  setPieceSize
} from "./globalVariables.ts";
import {loadImage, makePiece, splitImage} from "./puzzleProducer/image.ts";


function setCanvasContext(
  ctx_: CanvasRenderingContext2D
) {
  setCanvas(ctx_);
  setCanvasSize(window.innerWidth, window.innerHeight);

  render();
}

async function beginPuzzle() {
  Var.setCanvasSize(window.innerWidth, window.innerHeight);
  Var.setPiecesCount(10, 20);

  // load image
  const imageData = await loadImage(Var.canvasW, Var.canvasH, 0.6);
  if (!imageData) {
    throw new Error('Failed to load image');
  }
  const img = imageData;
  setPictureSize(img.width, img.height);

  // split image into pieces
  const piecesImg = await splitImage(imageData, Var.rows, Var.cols);

  // make it into pieces
  const piecesArray = makePiece(
    piecesImg,
    Var.canvasW, Var.canvasH,
    imageData.width, imageData.height,
    Var.rows, Var.cols
  );
  Var.pieces.push(...piecesArray);

  setPieceSize(
    pieces[0].width, pieces[0].height
  );
}

export {
  setCanvasContext,
  beginPuzzle
};

