import { distanceToTrace, generateTraces, measure, pointAt, seededRandom } from './circuit';

describe('circuito', () => {
  it('genera siempre las mismas pistas con la misma semilla', () => {
    expect(generateTraces(800, 400, 40, 3)).toEqual(generateTraces(800, 400, 40, 3));
  });

  it('mantiene las pistas dentro del área', () => {
    for (const trace of generateTraces(800, 400, 40)) {
      for (const p of trace.points) {
        expect(p.x).toBeGreaterThanOrEqual(0);
        expect(p.x).toBeLessThanOrEqual(800);
        expect(p.y).toBeGreaterThanOrEqual(0);
        expect(p.y).toBeLessThanOrEqual(400);
      }
    }
  });

  it('calcula puntos y distancias sobre una pista', () => {
    const trace = measure([
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
    ]);
    expect(trace.total).toBe(200);
    expect(pointAt(trace, 150)).toEqual({ x: 100, y: 50 });
    expect(distanceToTrace(trace, { x: 50, y: 10 })).toBe(10);
  });

  it('produce números entre 0 y 1', () => {
    const rand = seededRandom(1);
    for (let i = 0; i < 100; i++) {
      const v = rand();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
});
