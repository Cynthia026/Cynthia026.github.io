import { experience } from '@/content';
import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import type { ExperienceKind } from '@/types/content';
import styles from './Experience.module.css';

const KIND_CLASS: Record<ExperienceKind, string | undefined> = {
  Educación: styles.education,
  Proyecto: styles.project,
  Trabajo: styles.work,
  Certificación: styles.work,
};

export function Experience() {
  return (
    <Section
      id="trayectoria"
      number={4}
      title="Trayectoria"
      intro="Mi formación y cómo ha crecido mi trabajo, de lo más reciente a lo más antiguo."
    >
      <ol role="list" className={styles.log}>
        {experience.map((item) => (
          <li key={`${item.period}-${item.title}`} className={styles.entry}>
            <div className={styles.when}>
              <span className={styles.period}>{item.period}</span>
              <span className={`${styles.kind} ${KIND_CLASS[item.kind] ?? ''}`}>{item.kind}</span>
            </div>
            <div className={styles.what}>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.place}>{item.place}</p>
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
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
