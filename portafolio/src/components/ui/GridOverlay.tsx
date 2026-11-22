import styles from './GridOverlay.module.css';

/** Retícula de 12 columnas visible solo en modo inspección. */
export function GridOverlay({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div className={styles.overlay} aria-hidden="true">
      <div className={`container ${styles.columns}`}>
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} className={styles.column} />
        ))}
      </div>
      <p className={styles.legend}>12 columnas, máx. 1216 px. Pulsa «i» o Esc para salir.</p>
    </div>
  );
}
