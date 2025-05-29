import {
  completeSelection,
  render,
  reportMousePosition,
  reportMouseSelection, reportMouseUp, updateSelection
} from "./coreJigsaw.ts";

const dpr = window.devicePixelRatio || 1;
let trackingMouse = false;
let drawingRect = false;
let x0 = -1, y0 = -1;

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
  const current = reportMouseSelection(x, y);
  if(current === 1) {
    trackingMouse = true;
    x0 = -1;
    y0 = -1;
  } else {
    drawingRect = true;
    x0 = x;
    y0 = y;
  }
}

function onMouseMove(
  event: MouseEvent,
) {
  if(trackingMouse) {
    const x = event.clientX * dpr;
    const y = event.clientY * dpr;

    if(x0 != -1 && y0 != -1) {
      const dx = x - x0;
      const dy = y - y0;

      reportMousePosition(dx, dy);
    }
    else {
      reportMousePosition(0, 0);
    }
    x0 = x;
    y0 = y;
  }
  else if(drawingRect) {
    const x = event.clientX * dpr;
    const y = event.clientY * dpr;

    updateSelection(
      x0, y0,
      x, y,
    );
  }
}

function onMouseUp(
  event: MouseEvent,
) {
  if(drawingRect) {
    const x = event.clientX * dpr;
    const y = event.clientY * dpr;

    completeSelection(
      x0, y0,
      x, y,
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

export {
  onResize,
  onMouseDown, onMouseMove, onMouseUp,
}
