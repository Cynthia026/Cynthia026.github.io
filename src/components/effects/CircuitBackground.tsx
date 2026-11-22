import { useEffect, useRef } from 'react';
import { generateTraces, type Trace } from './circuit';
import styles from './CircuitBackground.module.css';

const GRID = 40;

interface Palette {
  trace: string;
}

function readPalette(): Palette {
  const css = getComputedStyle(document.documentElement);
  return { trace: css.getPropertyValue('--color-line-strong').trim() };
}

/**
 * Fondo estático con pistas de circuito impreso sobre la retícula.
 * Se redibuja al cambiar el tamaño de la sección o el tema.
 */
export function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !host || !ctx) return;

    let palette = readPalette();
    let width = 0;
    let height = 0;
    let traces: Trace[] = [];

    /** Más tenue a la izquierda, donde está el texto, para no restarle legibilidad. */
    const fade = (x: number) => 0.1 + 0.9 * Math.min(1, Math.max(0, (x / width - 0.35) / 0.35));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = palette.trace;
      ctx.lineWidth = 1.25;
      for (const trace of traces) {
        const mid = trace.points[Math.floor(trace.points.length / 2)]!;
        ctx.globalAlpha = 0.55 * fade(mid.x);
        ctx.beginPath();
        trace.points.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
        ctx.stroke();
        // Pads en los extremos
        for (const p of [trace.points[0]!, trace.points[trace.points.length - 1]!]) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3.2, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      traces = generateTraces(width, height, GRID);
      draw();
    };

    const onTheme = () => {
      palette = readPalette();
      draw();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const themeObserver = new MutationObserver(onTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    const schemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    schemeQuery.addEventListener('change', onTheme);

    resize();

    return () => {
      resizeObserver.disconnect();
      themeObserver.disconnect();
      schemeQuery.removeEventListener('change', onTheme);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
