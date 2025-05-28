import {
  render,
  reportMousePosition,
  reportMouseSelection, reportMouseUp
} from "./coreJigsaw.ts";

const dpr = window.devicePixelRatio || 1;
let trackingMouse = false;
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
  const x = event.clientX * dpr;
  const y = event.clientY * dpr;
  const current = reportMouseSelection(x, y);
  if(current === 1) {
    trackingMouse = true;
    x0 = -1;
    y0 = -1;
  }
}

function onMouseMove(
  event: MouseEvent,
) {
  if(!trackingMouse) return;

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

function onMouseUp() {
  trackingMouse = false;
  x0 = -1;
  y0 = -1;

  reportMouseUp();
}

export {
  onResize,
  onMouseDown, onMouseMove, onMouseUp,
}
