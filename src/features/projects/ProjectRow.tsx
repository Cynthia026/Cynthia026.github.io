import type { Project } from '@/types/content';
import { Tag } from '@/components/ui/Tag';
import { ExternalIcon } from '@/components/ui/icons';
import { ProjectSchematic } from './ProjectSchematic';
import styles from './ProjectRow.module.css';

export function ProjectRow({ project }: { project: Project }) {
  const titleId = `${project.slug}-title`;
  return (
    <article
      id={project.slug}
      aria-labelledby={titleId}
      className={styles.row}
      data-component="ProjectRow"
    >
      <div className={styles.media}>
        {project.image ? (
          <img
            src={project.image}
            alt={`Captura de ${project.title}`}
            loading="lazy"
            decoding="async"
            width={800}
            height={520}
          />
        ) : (
          <ProjectSchematic seed={project.slug} />
        )}
      </div>

      <div className={styles.content}>
        <p className={styles.meta}>
          <span>{project.year}</span>
          <span>{project.context}</span>
        </p>
        <h3 id={titleId} className={styles.title}>
          {project.title}
        </h3>
        <p className={styles.summary}>{project.summary}</p>

        <dl className={styles.details}>
          <div>
            <dt>Reto</dt>
            <dd>{project.problem}</dd>
          </div>
          <div>
            <dt>Qué hice</dt>
            <dd>{project.solution}</dd>
          </div>
          <div>
            <dt>Mi rol</dt>
            <dd>{project.role}</dd>
          </div>
        </dl>

        {project.metrics && project.metrics.length > 0 && (
          <ul role="list" className={styles.metrics} aria-label="Resultados">
            {project.metrics.map((metric) => (
              <li key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </li>
            ))}
          </ul>
        )}

        <ul role="list" className={styles.stack} aria-label="Tecnologías">
          {project.stack.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>

        {(project.demoUrl || project.repoUrl || project.related) && (
          <p className={styles.links}>
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                Ver demo <ExternalIcon />
                <span className="visually-hidden"> de {project.title} (abre en otra pestaña)</span>
              </a>
            )}
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                Ver código <ExternalIcon />
                <span className="visually-hidden"> de {project.title} (abre en otra pestaña)</span>
              </a>
            )}
            {project.related?.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondary}
              >
                {link.label} <ExternalIcon />
                <span className="visually-hidden"> (abre en otra pestaña)</span>
              </a>
            ))}
          </p>
        )}
      </div>
    </article>
  );
}
