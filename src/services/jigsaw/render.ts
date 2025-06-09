import * as Var from "./globalVariables.ts";
import {pieces} from "./globalVariables.ts";
import {translate} from "./puzzleProducer/edge.ts";

function render() {
  // clear canvas
  Var.ctx.clearRect(0, 0, Var.canvasW, Var.canvasH);

  // clear path array
  Var.piecePaths.length = 0;

  Var.ctx.lineWidth = 1;
  Var.ctx.lineCap = 'round';

  // draw answer grid
  Var.ctx.strokeStyle = '#fafafa';
  Var.ctx.shadowColor = 'transparent';

  Var.ctx.beginPath();
  const sx = Math.floor((Var.canvasW - Var.pictureW)/2);
  const sy = Math.floor((Var.canvasH - Var.pictureH)/2);
  for(let i = 0; i < Var.rows; i++) {
    for(let j = 0; j < Var.cols; j++) {
      Var.ctx.rect(sx + j * Var.pw, sy + i * Var.ph, Var.pw, Var.ph);
    }
  }
  Var.ctx.stroke();

  Var.ctx.strokeStyle = '#000';
  Var.ctx.fillStyle = '#fafafaaa';

  // draw pieces
  for(let i = pieces.length - 1; i>=0; i--) {
    const piece = pieces[i];

    const path = new Path2D();
    const mask = translate(piece.mask, piece.x, piece.y);

    if(i <= Var.selectedLength) {
      Var.ctx.shadowColor = '#fff';
      Var.ctx.shadowBlur = 10;
    }
    else {
      Var.ctx.shadowColor = 'transparent';
      Var.ctx.shadowBlur = 0;
    }

    path.moveTo(mask[0][0], mask[0][1]);
    mask.forEach((q) => {
      path.lineTo(q[0], q[1]);
      path.quadraticCurveTo(
        q[2], q[3],
        q[4], q[5]
      );
    });
    path.closePath();

    Var.ctx.save();
    Var.ctx.clip(path);

    Var.ctx.drawImage(
      piece.imageData,
      piece.x - (piece.pos[1] === 0 ? 0 : piece.width  * 0.3),
      piece.y - (piece.pos[0] === 0 ? 0 : piece.height * 0.3),
    );
    Var.ctx.restore();

    Var.ctx.stroke(path);
    Var.piecePaths.push(path);
  }

  // reverse path array
  Var.piecePaths.reverse();
}

export default render;
