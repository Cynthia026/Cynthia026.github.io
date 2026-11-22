/**
 * Lógica pura del fondo de circuito: generación de pistas y geometría.
 * Separada del componente para poder probarla sin canvas.
 */

export interface Point {
  x: number;
  y: number;
}

export interface Trace {
  points: Point[];
  /** Longitud acumulada al final de cada segmento. */
  lengths: number[];
  total: number;
}

/** Generador pseudoaleatorio con semilla (mulberry32) para que el dibujo sea estable. */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function measure(points: Point[]): Trace {
  const lengths: number[] = [];
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1]!;
    const b = points[i]!;
    total += Math.hypot(b.x - a.x, b.y - a.y);
    lengths.push(total);
  }
  return { points, lengths, total };
}

/**
 * Pistas tipo PCB sobre una retícula: tramos horizontales y verticales
 * unidos por chaflanes a 45°, como en una tarjeta de circuito impreso.
 */
export function generateTraces(width: number, height: number, grid: number, seed = 7): Trace[] {
  const rand = seededRandom(seed);
  const cols = Math.max(2, Math.floor(width / grid));
  const rows = Math.max(2, Math.floor(height / grid));
  const count = Math.min(70, Math.round((cols * rows) / 9));
  const traces: Trace[] = [];
  const clampX = (v: number) => Math.min(cols, Math.max(0, v));
  const clampY = (v: number) => Math.min(rows, Math.max(0, v));

  for (let i = 0; i < count; i++) {
    let cx = Math.floor(rand() * (cols + 1));
    let cy = Math.floor(rand() * (rows + 1));
    const points: Point[] = [{ x: cx * grid, y: cy * grid }];
    let horizontal = rand() < 0.5;
    const segments = 2 + Math.floor(rand() * 4);

    for (let s = 0; s < segments; s++) {
      const step = (1 + Math.floor(rand() * 4)) * (rand() < 0.5 ? -1 : 1);
      if (horizontal) cx = clampX(cx + step);
      else cy = clampY(cy + step);
      const last = points[points.length - 1]!;
      const next = { x: cx * grid, y: cy * grid };
      if (next.x === last.x && next.y === last.y) continue;
      // Chaflán de 45° antes de cambiar de dirección
      if (s < segments - 1 && rand() < 0.6) {
        const d = grid / 2;
        const dir = rand() < 0.5 ? -1 : 1;
        points.push(next);
        const chamfer = horizontal
          ? { x: next.x + d * Math.sign(step), y: next.y + d * dir }
          : { x: next.x + d * dir, y: next.y + d * Math.sign(step) };
        if (
          chamfer.x >= 0 &&
          chamfer.x <= cols * grid &&
          chamfer.y >= 0 &&
          chamfer.y <= rows * grid
        ) {
          points.push(chamfer);
          cx = chamfer.x / grid;
          cy = chamfer.y / grid;
        }
      } else {
        points.push(next);
      }
      horizontal = !horizontal;
    }
    if (points.length >= 2) traces.push(measure(points));
  }
  return traces;
}

/** Punto a una distancia `d` a lo largo de la pista. */
export function pointAt(trace: Trace, d: number): Point {
  const { points, lengths } = trace;
  const dist = Math.max(0, Math.min(trace.total, d));
  let prev = 0;
  for (let i = 0; i < lengths.length; i++) {
    const end = lengths[i]!;
    if (dist <= end) {
      const a = points[i]!;
      const b = points[i + 1]!;
      const t = end === prev ? 0 : (dist - prev) / (end - prev);
      return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
    }
    prev = end;
  }
  return points[points.length - 1]!;
}

/** Distancia mínima de un punto a la pista (por segmentos). */
export function distanceToTrace(trace: Trace, p: Point): number {
  let best = Infinity;
  for (let i = 1; i < trace.points.length; i++) {
    const a = trace.points[i - 1]!;
    const b = trace.points[i]!;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len2 = dx * dx + dy * dy || 1;
    const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2));
    best = Math.min(best, Math.hypot(p.x - (a.x + dx * t), p.y - (a.y + dy * t)));
  }
  return best;
}
