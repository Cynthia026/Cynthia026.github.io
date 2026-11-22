import type { ReactNode } from 'react';
import styles from './Section.module.css';

interface SectionProps {
  id: string;
  title: string;
  /** Texto breve que explica qué contiene la sección. */
  intro?: string;
  children: ReactNode;
}

/** Contenedor semántico de cada sección: <section> con encabezado enlazado por aria-labelledby. */
export function Section({ id, title, intro, children }: SectionProps) {
  const headingId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={headingId} className={styles.section}>
      <div className="container">
        <header className={styles.header}>
          <h2 id={headingId} className={styles.title}>
            {title}
          </h2>
          {intro && <p className={styles.intro}>{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
