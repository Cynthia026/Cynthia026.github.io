import type { Project } from '@/types/content';
import styles from './ProjectCover.module.css';

/**
 * Portada tipográfica para proyectos sin captura: nombre corto del proyecto
 * sobre una retícula suave, con las tecnologías principales.
 */
export function ProjectCover({ project }: { project: Project }) {
  const shortName = project.title.split(':')[0] ?? project.title;
  return (
    <div className={styles.cover} aria-hidden="true">
      <span className={styles.name}>{shortName}</span>
      <span className={styles.stack}>{project.stack.slice(0, 3).join('  /  ')}</span>
    </div>
  );
}
