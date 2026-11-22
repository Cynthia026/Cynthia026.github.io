import { useMemo, useState } from 'react';
import type { Project } from '@/types/content';
import { ALL, filterProjects, getTechOptions, type TechFilter } from './filterProjects';
import { ProjectFilter } from './ProjectFilter';
import { ProjectRow } from './ProjectRow';
import styles from './ProjectList.module.css';

/** Solo se ofrecen como filtro las tecnologías más usadas. */
const MAX_FILTERS = 8;

export function ProjectList({ projects }: { projects: readonly Project[] }) {
  const [filter, setFilter] = useState<TechFilter>(ALL);
  const options = useMemo(() => getTechOptions(projects, MAX_FILTERS), [projects]);
  const visible = useMemo(() => filterProjects(projects, filter), [projects, filter]);

  return (
    <div data-component="ProjectList">
      <div className={styles.toolbar}>
        <ProjectFilter options={options} value={filter} onChange={setFilter} />
        <p className={styles.count} aria-live="polite">
          {visible.length} de {projects.length} proyectos
        </p>
      </div>

      {visible.length > 0 ? (
        <div className={styles.list}>
          {visible.map((project) => (
            <ProjectRow key={project.slug} project={project} />
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
