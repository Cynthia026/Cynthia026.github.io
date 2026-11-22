import styles from './ProjectSchematic.module.css';

/** Hash determinista para que cada proyecto tenga siempre el mismo esquema. */
function hash(text: string): number {
  let h = 2166136261;
  for (const char of text) h = Math.imul(h ^ char.charCodeAt(0), 16777619);
  return h >>> 0;
}

/**
 * Wireframe de interfaz generado a partir del slug. Sirve como portada
 * mientras no haya una captura real del proyecto.
 */
export function ProjectSchematic({ seed }: { seed: string }) {
  const h = hash(seed);
  const sidebar = h % 2 === 0;
  const cards = 2 + (h % 3);
  const x0 = sidebar ? 92 : 16;
  const width = 384 - x0;
  const cardW = (width - (cards - 1) * 10) / cards;

  return (
    <svg viewBox="0 0 400 260" className={styles.svg} aria-hidden="true" focusable="false">
      <rect x="0.5" y="0.5" width="399" height="259" rx="8" className={styles.frame} />
      <rect x="0" y="0" width="400" height="28" rx="8" className={styles.bar} />
      <circle cx="16" cy="14" r="4" className={styles.dim} />
      <circle cx="30" cy="14" r="4" className={styles.dim} />
      <circle cx="44" cy="14" r="4" className={styles.dim} />
      {sidebar && (
        <g>
          <rect x="16" y="44" width="60" height="200" rx="4" className={styles.soft} />
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x="24"
              y={56 + i * 22}
              width={36 + ((h >>> i) % 12)}
              height="8"
              rx="2"
              className={styles.dim}
            />
          ))}
        </g>
      )}
      <rect x={x0} y="44" width={width * 0.55} height="14" rx="3" className={styles.ink} />
      <rect x={x0} y="66" width={width * 0.8} height="8" rx="2" className={styles.dim} />
      {Array.from({ length: cards }, (_, i) => (
        <rect
          key={i}
          x={x0 + i * (cardW + 10)}
          y="90"
          width={cardW}
          height="70"
          rx="5"
          className={i === h % cards ? styles.accent : styles.soft}
        />
      ))}
      <rect x={x0} y="172" width={width} height="72" rx="5" className={styles.soft} />
      <polyline
        className={styles.line}
        points={Array.from(
          { length: 8 },
          (_, i) => `${x0 + 10 + (i * (width - 20)) / 7},${232 - ((h >>> (i * 3)) % 48)}`,
        ).join(' ')}
      />
    </svg>
  );
}
