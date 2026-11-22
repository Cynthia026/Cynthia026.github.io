import { useId, useState } from 'react';
import type { Project } from '@/types/content';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { ChevronIcon, ExternalIcon } from '@/components/ui/icons';
import { asset } from '@/lib/asset';
import { ProjectCover } from './ProjectCover';
import { useLanguage } from '@/i18n/useLanguage';
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
  const { t } = useLanguage();
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
            alt={`${t.hero.screenshotOf} ${project.title}`}
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

        <ul role="list" className={styles.tags} aria-label={t.projects.technologies}>
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
              {t.projects.demo}
              <ExternalIcon />
              <span className="visually-hidden">
                {' '}
                {t.projects.of} {project.title} {t.a11y.newTab}
              </span>
            </Button>
          )}
          {project.repoUrl && (
            <Button href={project.repoUrl} size="small" variant="secondary">
              {t.projects.code}
              <span className="visually-hidden">
                {' '}
                {t.projects.of} {project.title} {t.a11y.newTab}
              </span>
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
            {open ? t.projects.hideDetails : t.projects.showDetails}
            <ChevronIcon />
          </Button>
        </div>

        <div id={detailsId} className={styles.details} hidden={!open}>
          <dl className={styles.dl}>
            <div>
              <dt>{t.projects.challenge}</dt>
              <dd>{project.problem}</dd>
            </div>
            <div>
              <dt>{t.projects.whatIDid}</dt>
              <dd>{project.solution}</dd>
            </div>
            <div>
              <dt>{t.projects.myRole}</dt>
              <dd>
                {project.role}
                {project.team && (
                  <>
                    {' '}
                    {t.projects.with} {project.team}
                  </>
                )}
              </dd>
            </div>
          </dl>

          {project.architecture && (
            <div>
              <p className={styles.detailTitle}>{t.projects.architecture}</p>
              <ol
                className={styles.architecture}
                aria-label={`${t.projects.architectureOf} ${project.title}`}
              >
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
            <ul role="list" className={styles.metrics} aria-label={t.projects.results}>
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
              <span>{t.projects.related}</span>
              {project.related.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                  <span className="visually-hidden"> {t.a11y.newTab}</span>
                </a>
              ))}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
