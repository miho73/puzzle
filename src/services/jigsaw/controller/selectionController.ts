import render from "../render.ts";
import * as Var from "../globalVariables.ts";
import {pieces} from "../globalVariables.ts";

function updateSelection(
  x0: number, y0: number, x1: number, y1: number
) {
  render();

  Var.ctx.beginPath();
  Var.ctx.fillStyle = '#fafafa44';
  Var.ctx.strokeStyle = '#000';
  Var.ctx.lineWidth = 1;
  Var.ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
  Var.ctx.stroke();
  Var.ctx.closePath();
}

function completeSelection(
  x0: number, y0: number, x1: number, y1: number
) {
  const areaLeftX = Math.min(x0, x1), areaLeftY = Math.min(y0, y1);
  const areaRightX = Math.max(x0, x1), areaRightY = Math.max(y0, y1);

  Var.setSelectedLength(-1);

  pieces.forEach((piece, i) => {
    const ltx = piece.x, lty = piece.y;
    const rbx = piece.x + piece.width, rby = piece.y + piece.height;
    if (
      ((ltx - areaLeftX) * (ltx - areaRightX) < 0 || (rbx - areaLeftX) * (rbx - areaRightX) < 0) &&
      ((lty - areaLeftY) * (lty - areaRightY) < 0 || (rby - areaLeftY) * (rby - areaRightY) < 0)
    ) {
      Var.setSelectedLength(
        Var.selectedLength + 1
      );

      const piece = pieces.splice(i, 1)[0];
      const edge = Var.piecePaths.splice(i, 1)[0];
      pieces.unshift(piece);
      Var.piecePaths.unshift(edge);
    }
  });

  render();
}

export {completeSelection};
export {updateSelection};
