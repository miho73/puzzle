import {
  reportMousePosition,
  reportMouseSelection,
  reportMouseUp
} from "./mouseEventContoller.ts";
import {
  completeSelection,
  updateSelection
} from "./selectionController.ts";
import render from "../render.ts";
import * as Var from "../globalVariables.ts";
import {dx, dy, scale, setDx, setDy, setScale} from "../globalVariables.ts";

const dpr = window.devicePixelRatio || 1;
let trackingMouse = false;
let drawingRect = false;
let x0 = -1, y0 = -1;

function invTransformMatMul(x: number, y: number) {
  return [
    x / scale - (Var.canvasW * 0.5 * (1 - scale) + dx) / scale,
    y / scale - (Var.canvasH * 0.5 * (1 - scale) + dy) / scale
  ];
}

function onResize(
  canvas: HTMLCanvasElement,
) {
  const dpr = window.devicePixelRatio || 1;

  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;

  render();
}

function onMouseDown(
  event: MouseEvent
) {
  if(event.button !== 0) return;

  const x = event.clientX * dpr;
  const y = event.clientY * dpr;

  const pos = invTransformMatMul(x, y);

  const current = reportMouseSelection(x, y);
  if(current === 1) {
    trackingMouse = true;
    x0 = -1;
    y0 = -1;
  } else {
    drawingRect = true;
    x0 = pos[0];
    y0 = pos[1];
  }
}

function onMouseMove(
  event: MouseEvent,
) {
  if(trackingMouse) {
    const x = event.clientX * dpr;
    const y = event.clientY * dpr;

    const pos = invTransformMatMul(x, y);

    if(x0 != -1 && y0 != -1) {
      const dx = pos[0] - x0;
      const dy = pos[1] - y0;

      reportMousePosition(dx, dy);
    }
    else {
      reportMousePosition(0, 0);
    }
    x0 = pos[0];
    y0 = pos[1];
  }
  else if(drawingRect) {
    const x = event.clientX * dpr;
    const y = event.clientY * dpr;

    const pos = invTransformMatMul(x, y);

    updateSelection(
      x0, y0,
      pos[0], pos[1],
    );
  }
}

function onMouseUp(
  event: MouseEvent,
) {
  if(drawingRect) {
    const x = event.clientX * dpr;
    const y = event.clientY * dpr;

    const pos = invTransformMatMul(x, y);

    completeSelection(
      x0, y0,
      pos[0], pos[1],
    )
  }
  if(trackingMouse) {
    reportMouseUp();
  }

  trackingMouse = false;
  drawingRect = false;
  x0 = -1;
  y0 = -1;
}

function onTouchStart(
  event: TouchEvent,
) {
  const x = event.touches[0].clientX * dpr;
  const y = event.touches[0].clientY * dpr;
  const pos = invTransformMatMul(x, y);

  const current = reportMouseSelection(pos[0], pos[1]);

  if(current === 1) {
    trackingMouse = true;
    x0 = -1;
    y0 = -1;
  } else {
    drawingRect = true;
    x0 = pos[0];
    y0 = pos[1];
  }
}

function onTouchMove(
  event: TouchEvent,
) {
  if(trackingMouse) {
    const x = event.touches[0].clientX * dpr;
    const y = event.touches[0].clientY * dpr;
    const pos = invTransformMatMul(x, y);

    if(x0 != -1 && y0 != -1) {
      const dx = pos[0] - x0;
      const dy = pos[1] - y0;

      reportMousePosition(dx, dy);
    }
    else {
      reportMousePosition(0, 0);
    }
    x0 = pos[0];
    y0 = pos[1];
  }
  else if(drawingRect) {
    const x = event.touches[0].clientX * dpr;
    const y = event.touches[0].clientY * dpr;
    const pos = invTransformMatMul(x, y);

    updateSelection(
      x0, y0,
      pos[0], pos[1],
    );
  }
}

function onTouchEnd(
  event: TouchEvent,
) {
  if(drawingRect) {
    const x = event.changedTouches[0].clientX * dpr;
    const y = event.changedTouches[0].clientY * dpr;
    const pos = invTransformMatMul(x, y);

    completeSelection(
      x0, y0,
      pos[0], pos[1],
    )
  }
  if(trackingMouse) {
    reportMouseUp();
  }

  trackingMouse = false;
  drawingRect = false;
  x0 = -1;
  y0 = -1;
}

function onWheel(
  event: WheelEvent,
) {
  event.preventDefault();

  let deltaY = 0;
  let deltaX = 0;

  switch (event.deltaMode) {
    case WheelEvent.DOM_DELTA_PIXEL:
      deltaY = event.deltaY;
      deltaX = event.deltaX;
      break;
    case WheelEvent.DOM_DELTA_LINE:
      deltaY = event.deltaY * 16;
      deltaX = event.deltaX * 16;
      break;
    case WheelEvent.DOM_DELTA_PAGE:
      deltaY = event.deltaY * window.innerHeight;
      deltaX = event.deltaX * window.innerWidth;
      break;
    default:
      console.warn('Unknown delta mode:', event.deltaMode);
      return;
  }

  setDy(dy - deltaY * 0.0005 * Var.canvasW);
  setDx(dx - deltaX * 0.0005 * Var.canvasW);

  Var.ctx.setTransform(
    scale, 0, 0, scale, Var.canvasW*0.5*(1-scale)+dx, Var.canvasH*0.5*(1-scale)+dy
  );

  render();
}

function keyDownTranslation(
  event: KeyboardEvent,
) {
  if(event.key === 'ArrowUp' || event.key === 'w') {
    setDy(dy + 100 / scale);
  } else if(event.key === 'ArrowDown' || event.key === 's') {
    setDy(dy - 100 / scale);
  } else if(event.key === 'ArrowLeft' || event.key === 'a') {
    setDx(dx + 100 / scale);
  } else if(event.key === 'ArrowRight' || event.key === 'd') {
    setDx(dx - 100 / scale);
  } else if(event.key === '=') {
    setScale(Math.max(scale * 1.005, 1));
  } else if(event.key === '-') {
    setScale(Math.max(scale * 0.995, 1));
  } else {
    return;
  }

  Var.ctx.setTransform(
    scale, 0, 0, scale, Var.canvasW*0.5*(1-scale)+dx, Var.canvasH*0.5*(1-scale)+dy
  );

  render();
}


export {
  onResize,
  onMouseDown, onMouseMove, onMouseUp,
  onTouchStart, onTouchEnd, onTouchMove,
  onWheel,
  keyDownTranslation
}
