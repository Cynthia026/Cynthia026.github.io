import { useId, useState } from 'react';
import type { Project } from '@/types/content';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { ChevronIcon, ExternalIcon } from '@/components/ui/icons';
import { asset } from '@/lib/asset';
import { ProjectCover } from './ProjectCover';
import styles from './ProjectCard.module.css';

const MAX_TAGS = 6;

interface ProjectCardProps {
  project: Project;
  /** La tarjeta destacada ocupa todo el ancho con la imagen a un lado. */
  featured?: boolean;
  /** Número de figura, p. ej. «2.1». */
  figure: string;
}

export function ProjectCard({ project, featured = false, figure }: ProjectCardProps) {
  const [open, setOpen] = useState(false);
  const detailsId = useId();
  const titleId = `${project.slug}-title`;
  const extraTags = project.stack.length - MAX_TAGS;

  return (
    <article
      id={project.slug}
      aria-labelledby={titleId}
      className={`card ${styles.card} ${featured ? styles.featured : ''}`}
    >
      <div className={styles.media}>
        {project.image ? (
          <img
            src={asset(project.image)}
            alt={`Captura de ${project.title}`}
            loading="lazy"
            decoding="async"
            width={800}
            height={500}
          />
        ) : (
          <ProjectCover project={project} />
        )}
        <span className={styles.figure}>Fig. {figure}</span>
      </div>

      <div className={styles.body}>
        <p className={styles.meta}>
          <span>{project.year}</span>
          <span>{project.context}</span>
        </p>
        <h3 id={titleId} className={styles.title}>
          {project.title}
        </h3>
        <p className={styles.summary}>{project.summary}</p>

        <ul role="list" className={styles.tags} aria-label="Tecnologías">
          {project.stack.slice(0, MAX_TAGS).map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
          {extraTags > 0 && (
            <li>
              <Tag>{`+${extraTags}`}</Tag>
            </li>
          )}
        </ul>

        <div className={styles.actions}>
          {project.demoUrl && (
            <Button href={project.demoUrl} size="small">
              Ver demo
              <ExternalIcon />
              <span className="visually-hidden"> de {project.title} (abre en otra pestaña)</span>
            </Button>
          )}
          {project.repoUrl && (
            <Button href={project.repoUrl} size="small" variant="secondary">
              Código
              <span className="visually-hidden"> de {project.title} (abre en otra pestaña)</span>
            </Button>
          )}
          <Button
            size="small"
            variant="ghost"
            aria-expanded={open}
            aria-controls={detailsId}
            onClick={() => setOpen((v) => !v)}
            className={styles.toggle}
          >
            {open ? 'Ocultar detalles' : 'Ver detalles'}
            <ChevronIcon />
          </Button>
        </div>

        <div id={detailsId} className={styles.details} hidden={!open}>
          <dl className={styles.dl}>
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
              <dd>
                {project.role}
                {project.team && <> con {project.team}</>}
              </dd>
            </div>
          </dl>

          {project.architecture && (
            <div>
              <p className={styles.detailTitle}>Arquitectura</p>
              <ol className={styles.architecture} aria-label={`Arquitectura de ${project.title}`}>
                {project.architecture.map((layer) => (
                  <li key={layer.name}>
                    <strong>{layer.name}</strong>
                    <span>{layer.detail}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

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

          {project.related && (
            <p className={styles.related}>
              <span>Repos relacionados:</span>
              {project.related.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                  <span className="visually-hidden"> (abre en otra pestaña)</span>
                </a>
              ))}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
