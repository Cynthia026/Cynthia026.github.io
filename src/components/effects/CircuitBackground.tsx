import { useEffect, useRef } from 'react';
import { distanceToTrace, generateTraces, pointAt, type Point, type Trace } from './circuit';
import styles from './CircuitBackground.module.css';

const GRID = 40;
const HOVER_RADIUS = 220;
const PULSE_SPEED = 0.26; // px por milisegundo
const PULSE_EVERY = 260; // ms entre señales automáticas
const MAX_PULSES = 60;
/** Ancho de la columna de contenido (coincide con --container). */
const CONTENT_WIDTH = 74 * 16;

interface Pulse {
  trace: Trace;
  d: number;
  dir: 1 | -1;
  color: 'signal' | 'active';
}

interface Ring {
  x: number;
  y: number;
  r: number;
}

interface Palette {
  trace: string;
  active: string;
  signal: string;
  font: string;
}

function readPalette(): Palette {
  const css = getComputedStyle(document.documentElement);
  const v = (name: string) => css.getPropertyValue(name).trim();
  return {
    trace: v('--color-line-strong'),
    active: v('--color-accent'),
    signal: v('--color-note'),
    font: v('--font-mono'),
  };
}

/**
 * Fondo de circuito impreso fijo detrás de toda la página.
 * - Pistas con señales que viajan solas, con brillo.
 * - El cursor ilumina las pistas cercanas y muestra una sonda con la coordenada de la retícula.
 * - Un clic en un espacio vacío dispara pulsos desde ese punto.
 * - En la columna de texto el circuito es más tenue para no afectar la lectura.
 * - Respeta «reducir movimiento» (dibujo estático) y se pausa con la pestaña oculta.
 */
export function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(pointer: fine)');
    let palette = readPalette();
    let width = 0;
    let height = 0;
    let traces: Trace[] = [];
    let pulses: Pulse[] = [];
    let rings: Ring[] = [];
    let pointer: Point | null = null;
    let frame = 0;
    let last = performance.now();
    let sinceSpawn = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      traces = generateTraces(width, height, GRID, 11);
      pulses = [];
      draw();
    };

    /** 1 en los márgenes laterales, más tenue sobre la columna de contenido. */
    const fade = (x: number) => {
      const half = Math.min(CONTENT_WIDTH, width) / 2;
      const fromCenter = Math.abs(x - width / 2);
      const t = Math.min(1, Math.max(0, (fromCenter - half * 0.55) / (half * 0.6)));
      return 0.38 + 0.62 * t;
    };

    const spawn = (trace: Trace, from?: Point) => {
      let dir: 1 | -1 = Math.random() < 0.5 ? 1 : -1;
      if (from) {
        const start = trace.points[0]!;
        const end = trace.points[trace.points.length - 1]!;
        dir =
          Math.hypot(start.x - from.x, start.y - from.y) <=
          Math.hypot(end.x - from.x, end.y - from.y)
            ? 1
            : -1;
      }
      pulses.push({
        trace,
        d: dir === 1 ? 0 : trace.total,
        dir,
        color: Math.random() < 0.6 ? 'signal' : 'active',
      });
      if (pulses.length > MAX_PULSES) pulses.shift();
    };

    const strokeTrace = (trace: Trace) => {
      ctx.beginPath();
      trace.points.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
      ctx.stroke();
    };

    const drawPads = (trace: Trace, fill: string) => {
      for (const p of [trace.points[0]!, trace.points[trace.points.length - 1]!]) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.6, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = fill;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      ctx!.lineCap = 'round';
      ctx!.lineJoin = 'round';
      ctx!.shadowBlur = 0;

      for (const trace of traces) {
        const mid = trace.points[Math.floor(trace.points.length / 2)]!;
        const f = fade(mid.x);
        ctx!.globalAlpha = 0.75 * f;
        ctx!.strokeStyle = palette.trace;
        ctx!.lineWidth = 1.5;
        strokeTrace(trace);
        drawPads(trace, palette.trace);

        if (pointer) {
          const dist = distanceToTrace(trace, pointer);
          if (dist < HOVER_RADIUS) {
            const strength = (1 - dist / HOVER_RADIUS) * Math.max(f, 0.55);
            ctx!.globalAlpha = strength;
            ctx!.strokeStyle = palette.active;
            ctx!.lineWidth = 2.25;
            ctx!.shadowColor = palette.active;
            ctx!.shadowBlur = 10;
            strokeTrace(trace);
            drawPads(trace, palette.active);
            ctx!.shadowBlur = 0;
          }
        }
      }

      // Señales con brillo y estela
      for (const pulse of pulses) {
        const color = pulse.color === 'signal' ? palette.signal : palette.active;
        const head = pointAt(pulse.trace, pulse.d);
        const tail = pointAt(pulse.trace, pulse.d - pulse.dir * 34);
        const f = fade(head.x);
        const gradient = ctx!.createLinearGradient(tail.x, tail.y, head.x, head.y);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(1, color);
        ctx!.globalAlpha = Math.max(f, 0.4);
        ctx!.shadowColor = color;
        ctx!.shadowBlur = 14;
        ctx!.strokeStyle = gradient;
        ctx!.lineWidth = 3;
        ctx!.beginPath();
        ctx!.moveTo(tail.x, tail.y);
        ctx!.lineTo(head.x, head.y);
        ctx!.stroke();
        ctx!.fillStyle = color;
        ctx!.beginPath();
        ctx!.arc(head.x, head.y, 3, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.shadowBlur = 0;

      for (const ring of rings) {
        ctx!.globalAlpha = Math.max(0, 1 - ring.r / 180);
        ctx!.strokeStyle = palette.active;
        ctx!.lineWidth = 2;
        ctx!.beginPath();
        ctx!.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
        ctx!.stroke();
      }

      // Sonda en la intersección más cercana de la retícula
      if (pointer) {
        const gx = Math.round(pointer.x / GRID);
        const gy = Math.round(pointer.y / GRID);
        const sx = gx * GRID;
        const sy = gy * GRID;
        ctx!.globalAlpha = Math.max(fade(sx), 0.45);
        ctx!.strokeStyle = palette.active;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.moveTo(sx - 12, sy);
        ctx!.lineTo(sx + 12, sy);
        ctx!.moveTo(sx, sy - 12);
        ctx!.lineTo(sx, sy + 12);
        ctx!.stroke();
        ctx!.strokeRect(sx - 5, sy - 5, 10, 10);
        ctx!.font = `500 11px ${palette.font}`;
        ctx!.fillStyle = palette.active;
        ctx!.fillText(
          `x${String(gx).padStart(2, '0')} y${String(gy).padStart(2, '0')}`,
          sx + 10,
          sy - 10,
        );
      }
      ctx!.globalAlpha = 1;
    }

    const tick = (now: number) => {
      const dt = Math.min(50, now - last);
      last = now;
      sinceSpawn += dt;
      if (sinceSpawn > PULSE_EVERY && traces.length) {
        sinceSpawn = 0;
        spawn(traces[Math.floor(Math.random() * traces.length)]!);
      }
      pulses = pulses.filter((p) => {
        p.d += p.dir * PULSE_SPEED * dt;
        return p.d >= -40 && p.d <= p.trace.total + 40;
      });
      rings = rings.filter((ring) => (ring.r += dt * 0.3) < 180);
      draw();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      if (reduceMotion.matches || document.hidden) {
        draw();
        return;
      }
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      if (!finePointer.matches || event.pointerType === 'touch') return;
      pointer = { x: event.clientX, y: event.clientY };
      if (reduceMotion.matches) draw();
    };
    const onLeave = () => {
      pointer = null;
      draw();
    };
    const onDown = (event: PointerEvent) => {
      // No interferir con clics en controles ni en texto seleccionable de las tarjetas.
      if ((event.target as Element).closest('a, button, input, textarea, select, label, .card'))
        return;
      if (reduceMotion.matches) return;
      const p = { x: event.clientX, y: event.clientY };
      rings.push({ x: p.x, y: p.y, r: 4 });
      traces
        .map((trace) => ({ trace, dist: distanceToTrace(trace, p) }))
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 6)
        .forEach(({ trace }) => spawn(trace, p));
    };
    const onTheme = () => {
      palette = readPalette();
      draw();
    };

    const themeObserver = new MutationObserver(onTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    const schemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove);
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerdown', onDown);
    document.addEventListener('visibilitychange', start);
    reduceMotion.addEventListener('change', start);
    schemeQuery.addEventListener('change', onTheme);

    resize();
    start();

    return () => {
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
      document.removeEventListener('visibilitychange', start);
      reduceMotion.removeEventListener('change', start);
      schemeQuery.removeEventListener('change', onTheme);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
