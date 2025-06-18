import * as Var from "../globalVariables.ts";
import {pieces, setSelectedLength} from "../globalVariables.ts";
import render from "../render.ts";

function reportMouseSelection(
  x: number, y: number
): number {
  for (let i = 0; i < pieces.length; i++) {
    if (Var.ctx.isPointInPath(Var.piecePaths[i], x, y)) {
      if (i > Var.selectedLength) {
        const piece = pieces.splice(i, 1)[0];
        const edge = Var.piecePaths.splice(i, 1)[0];
        pieces.unshift(piece);
        Var.piecePaths.unshift(edge);

        setSelectedLength(0);
      }
      return 1;
    }
  }
  setSelectedLength(-1);

  return 0;
}

function reportMouseUp() {
  const aStartX = (Var.canvasW - Var.pictureW) / 2;
  const aStartY = (Var.canvasH - Var.pictureH) / 2;

  for (let i = 0; i <= Var.selectedLength; i++) {
    const x = pieces[i].x + (Var.pw / 2);
    const y = pieces[i].y + (Var.ph / 2);
    const ax = x - aStartX;
    const ay = y - aStartY;

    if (ax > 0 && ay > 0 && ax < Var.pictureW && ay < Var.pictureH) {
      const col = Math.floor(ax / Var.pw);
      const row = Math.floor(ay / Var.ph);

      pieces[i].x = (aStartX + (Var.pw * col));
      pieces[i].y = (aStartY + (Var.ph * row));
    }
  }

  render();
}

function reportMousePosition(
  dx: number, dy: number,
) {
  for (let i = 0; i <= Var.selectedLength; i++) {
    if(pieces[i].x + dx >= 0 && pieces[i].x + Var.pw + dx <= Var.canvasW) pieces[i].x += dx;
    if(pieces[i].y + dy >= 0 && pieces[i].y + Var.ph + dy <= Var.canvasH) pieces[i].y += dy;
  }

  render();
}

export {reportMousePosition};
export {reportMouseUp};
export {reportMouseSelection};
