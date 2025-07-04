import {useEffect, useRef} from "react";
import {
  keyDownTranslation,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onResize, onTouchEnd, onTouchMove, onTouchStart, onWheel
} from "../../services/jigsaw/controller/canvasController.ts";
import {
  beginPuzzle,
  setCanvasContext
} from "../../services/jigsaw/coreJigsaw.ts";
import {useAppSelector} from "../../services/redux/hooks.ts";

function Jigsaw() {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const rows = useAppSelector(state => state.puzzle.verticalPieces);
  const cols = useAppSelector(state => state.puzzle.horizontalPieces);
  const imageData = useAppSelector(state => state.puzzle.imageData);

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
    beginPuzzle(
      rows || 0,
      cols || 0,
      imageData || null
    )
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
    window.addEventListener('mouseup', (event) => onMouseUp(event));
    window.addEventListener('mouseleave', (event) => onMouseUp(event));
    window.addEventListener('touchstart', (event) => onTouchStart(event));
    window.addEventListener('touchmove', (event) => onTouchMove(event));
    window.addEventListener('touchmove', (event) => event.preventDefault(), {passive: false});
    window.addEventListener('touchend', (event) => onTouchEnd(event));
    window.addEventListener('wheel', (event) => onWheel(event));
    window.addEventListener('wheel', (event) => event.preventDefault(), {passive: false});
    window.addEventListener('keydown', (event) => keyDownTranslation(event));

    return () => {
      window.removeEventListener('resize', () => onResize(canvas));
      window.removeEventListener('mousedown', (event) => onMouseDown(event));
      window.removeEventListener('mousemove', (event) => onMouseMove(event));
      window.removeEventListener('mouseup', (event) => onMouseUp(event));
      window.removeEventListener('mouseleave', (event) => onMouseUp(event));
      window.removeEventListener('touchstart', (event) => onTouchStart(event));
      window.removeEventListener('touchmove', (event) => onTouchMove(event));
      window.removeEventListener('touchmove', (event) => event.preventDefault());
      window.removeEventListener('touchend', (event) => onTouchEnd(event));
      window.removeEventListener('wheel', (event) => onWheel(event));
      window.removeEventListener('wheel', (event) => event.preventDefault());
      window.removeEventListener('keydown', (event) => keyDownTranslation(event));
    }
  }, [ctxRef]);

  return (
    <canvas ref={canvasRef} className={'w-screen h-screen'}/>
  );
}

export default Jigsaw;
