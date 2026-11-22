import { useEffect, useRef } from 'react';
import { distanceToTrace, generateTraces, pointAt, type Point, type Trace } from './circuit';
import styles from './CircuitBackground.module.css';

const GRID = 40;
const HOVER_RADIUS = 170;
const PULSE_SPEED = 0.22; // px por milisegundo
const PULSE_EVERY = 650; // ms entre señales automáticas

interface Pulse {
  trace: Trace;
  d: number;
  dir: 1 | -1;
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
 * Fondo interactivo con pistas de circuito impreso.
 * - El cursor ilumina las pistas cercanas y muestra una sonda con la coordenada de la retícula.
 * - Un clic dispara pulsos de señal desde ese punto.
 * - Respeta «reducir movimiento» (dibujo estático) y se pausa fuera de pantalla.
 */
export function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !host || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let palette = readPalette();
    let width = 0;
    let height = 0;
    let traces: Trace[] = [];
    let pulses: Pulse[] = [];
    let rings: Ring[] = [];
    let pointer: Point | null = null;
    let visible = true;
    let frame = 0;
    let last = performance.now();
    let sinceSpawn = 0;

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      traces = generateTraces(width, height, GRID);
      pulses = [];
      draw();
    };

    /** Más tenue a la izquierda, donde está el texto, para no restarle legibilidad. */
    const fade = (x: number) => 0.1 + 0.9 * Math.min(1, Math.max(0, (x / width - 0.35) / 0.35));

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
      pulses.push({ trace, d: dir === 1 ? 0 : trace.total, dir });
      if (pulses.length > 40) pulses.shift();
    };

    const drawTrace = (trace: Trace, color: string, alpha: number, lineWidth: number) => {
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      trace.points.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
      ctx.stroke();
      // Pads en los extremos
      for (const p of [trace.points[0]!, trace.points[trace.points.length - 1]!]) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.2, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      ctx!.lineCap = 'round';
      ctx!.lineJoin = 'round';

      for (const trace of traces) {
        const mid = trace.points[Math.floor(trace.points.length / 2)]!;
        const f = fade(mid.x);
        drawTrace(trace, palette.trace, 0.55 * f, 1.25);
        if (pointer) {
          const dist = distanceToTrace(trace, pointer);
          // Sobre el texto la pista se ilumina menos para no tapar las letras.
          const strength = 0.9 * (1 - dist / HOVER_RADIUS) * Math.max(f, 0.3);
          if (dist < HOVER_RADIUS) drawTrace(trace, palette.active, strength, 1.75);
        }
      }

      // Señales viajando por las pistas, con estela
      for (const pulse of pulses) {
        const head = pointAt(pulse.trace, pulse.d);
        const tail = pointAt(pulse.trace, pulse.d - pulse.dir * 26);
        ctx!.globalAlpha = 0.9;
        ctx!.strokeStyle = palette.signal;
        ctx!.lineWidth = 2.5;
        ctx!.beginPath();
        ctx!.moveTo(tail.x, tail.y);
        ctx!.lineTo(head.x, head.y);
        ctx!.stroke();
        ctx!.globalAlpha = 1;
        ctx!.fillStyle = palette.signal;
        ctx!.beginPath();
        ctx!.arc(head.x, head.y, 2.6, 0, Math.PI * 2);
        ctx!.fill();
      }

      for (const ring of rings) {
        ctx!.globalAlpha = Math.max(0, 1 - ring.r / 140);
        ctx!.strokeStyle = palette.active;
        ctx!.lineWidth = 1.5;
        ctx!.beginPath();
        ctx!.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
        ctx!.stroke();
      }

      // Sonda: cruz en la intersección de la retícula más cercana y su coordenada
      if (pointer) {
        const gx = Math.round(pointer.x / GRID);
        const gy = Math.round(pointer.y / GRID);
        const sx = gx * GRID;
        const sy = gy * GRID;
        ctx!.globalAlpha = Math.max(fade(sx), 0.35);
        ctx!.strokeStyle = palette.active;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.moveTo(sx - 10, sy);
        ctx!.lineTo(sx + 10, sy);
        ctx!.moveTo(sx, sy - 10);
        ctx!.lineTo(sx, sy + 10);
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
        return p.d >= -30 && p.d <= p.trace.total + 30;
      });
      rings = rings.filter((ring) => (ring.r += dt * 0.25) < 140);
      draw();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      if (reduceMotion.matches || !visible || document.hidden) {
        draw();
        return;
      }
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const toLocal = (event: PointerEvent): Point => {
      const rect = canvas.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      pointer = toLocal(event);
      if (reduceMotion.matches) draw();
    };
    const onLeave = () => {
      pointer = null;
      draw();
    };
    const onDown = (event: PointerEvent) => {
      // No interferir con clics en enlaces, botones o campos.
      if ((event.target as Element).closest('a, button, input, textarea, select')) return;
      const p = toLocal(event);
      if (reduceMotion.matches) return;
      rings.push({ x: p.x, y: p.y, r: 4 });
      traces
        .map((trace) => ({ trace, dist: distanceToTrace(trace, p) }))
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 5)
        .forEach(({ trace }) => spawn(trace, p));
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      start();
    });
    intersection.observe(host);
    // Cambios de tema: volver a leer los colores
    const themeObserver = new MutationObserver(() => {
      palette = readPalette();
      draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    const schemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const onScheme = () => {
      palette = readPalette();
      draw();
    };

    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    host.addEventListener('pointerdown', onDown);
    document.addEventListener('visibilitychange', start);
    reduceMotion.addEventListener('change', start);
    schemeQuery.addEventListener('change', onScheme);

    resize();
    start();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      themeObserver.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      host.removeEventListener('pointerdown', onDown);
      document.removeEventListener('visibilitychange', start);
      reduceMotion.removeEventListener('change', start);
      schemeQuery.removeEventListener('change', onScheme);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
