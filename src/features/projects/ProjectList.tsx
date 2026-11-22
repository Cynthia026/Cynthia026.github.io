import { useMemo, useState } from 'react';
import type { Project } from '@/types/content';
import { ALL, filterProjects, getTechOptions, type TechFilter } from './filterProjects';
import { ProjectFilter } from './ProjectFilter';
import { ProjectCard } from './ProjectCard';
import styles from './ProjectList.module.css';

/** Solo se ofrecen como filtro las tecnologías más usadas. */
const MAX_FILTERS = 8;

export function ProjectList({ projects }: { projects: readonly Project[] }) {
  const [filter, setFilter] = useState<TechFilter>(ALL);
  const options = useMemo(() => getTechOptions(projects, MAX_FILTERS), [projects]);
  const visible = useMemo(() => filterProjects(projects, filter), [projects, filter]);
  // La primera tarjeta ocupa todo el ancho; si la última queda sola en su fila, también.
  const lastIsAlone = visible.length > 2 && (visible.length - 1) % 2 === 1;

  return (
    <div>
      <div className={styles.toolbar}>
        <ProjectFilter options={options} value={filter} onChange={setFilter} />
        <p className={styles.count} aria-live="polite">
          {visible.length} de {projects.length} proyectos
        </p>
      </div>

      {visible.length > 0 ? (
        <div className={styles.list}>
          {visible.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              featured={index === 0 || (index === visible.length - 1 && lastIsAlone)}
            />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>
          Ningún proyecto usa esa tecnología todavía.{' '}
          <button type="button" onClick={() => setFilter(ALL)}>
            Ver todos los proyectos
          </button>
        </p>
      )}
    </div>
  );
}
