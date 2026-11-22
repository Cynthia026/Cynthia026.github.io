import { experience } from '@/content';
import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import type { ExperienceKind } from '@/types/content';
import styles from './Experience.module.css';

const KIND_CLASS: Record<ExperienceKind, string | undefined> = {
  Educación: styles.education,
  Proyecto: styles.project,
  Trabajo: styles.work,
  Certificación: styles.certification,
};

export function Experience() {
  return (
    <Section
      id="trayectoria"
      title="Trayectoria"
      intro="Mi formación y cómo ha crecido mi trabajo, de lo más reciente a lo más antiguo."
    >
      <ol role="list" className={styles.timeline}>
        {experience.map((item) => (
          <li key={`${item.period}-${item.title}`} className={styles.item}>
            <span className={styles.marker} aria-hidden="true" />
            <article className={`card ${styles.card}`}>
              <header className={styles.head}>
                <p className={styles.place}>{item.place}</p>
                <div className={styles.badges}>
                  <span className={`${styles.kind} ${KIND_CLASS[item.kind] ?? ''}`}>
                    {item.kind}
                  </span>
                  <span className={styles.period}>{item.period}</span>
                </div>
              </header>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
              {item.tags && (
                <ul role="list" className={styles.tags} aria-label="Tecnologías">
                  {item.tags.map((tag) => (
                    <li key={tag}>
                      <Tag>{tag}</Tag>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
