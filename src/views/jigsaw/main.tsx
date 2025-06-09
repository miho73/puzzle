import {useEffect, useRef} from "react";
import {
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onResize
} from "../../services/jigsaw/controller/canvasController.ts";
import {
  beginPuzzle,
  setCanvasContext
} from "../../services/jigsaw/coreJigsaw.ts";

function Jigsaw() {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  // Overall initialization
  useEffect(() => {
    // canvas initialization
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctxRef.current = ctx;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    // prepare puzzle and start
    beginPuzzle()
      .then(() => {
        if(!ctxRef.current) throw new Error('Canvas content was not initialized');
        setCanvasContext(ctxRef.current);
      });
  }, [ctxRef, canvasRef]);

  // register event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = ctxRef.current;
    if (!ctx) return;

    window.addEventListener('resize', () => onResize(canvas));
    window.addEventListener('mousedown', (event) => onMouseDown(event));
    window.addEventListener('mousemove', (event) => onMouseMove(event));
    window.addEventListener('mouseup', (event) => onMouseMove(event));
    window.addEventListener('mouseleave', (event) => onMouseUp(event));
    window.addEventListener('pointerdown', (event) => onMouseDown(event));
    window.addEventListener('pointermove', (event) => onMouseMove(event));
    window.addEventListener('pointerup', (event) => onMouseUp(event));
    window.addEventListener('pointerleave', (event) => onMouseUp(event));

    return () => {
      window.removeEventListener('resize', () => onResize(canvas));
      window.removeEventListener('mousedown', (event) => onMouseDown(event));
      window.removeEventListener('mousemove', (event) => onMouseMove(event));
      window.removeEventListener('mouseup', (event) => onMouseMove(event));
      window.removeEventListener('mouseleave', (event) => onMouseUp(event));
      window.removeEventListener('pointerdown', (event) => onMouseDown(event));
      window.removeEventListener('pointermove', (event) => onMouseMove(event));
      window.removeEventListener('pointerup', (event) => onMouseUp(event));
      window.removeEventListener('pointerleave', (event) => onMouseUp(event));
    }
  }, [ctxRef]);

  return (
    <>
      <canvas ref={canvasRef} className={'w-screen h-screen'}/>
    </>
  );
}

export default Jigsaw;
