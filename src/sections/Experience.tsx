import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import type { ExperienceKind } from '@/types/content';
import { useLanguage } from '@/i18n/useLanguage';
import styles from './Experience.module.css';

const KIND_CLASS: Record<ExperienceKind, string | undefined> = {
  education: styles.education,
  project: styles.project,
  work: styles.work,
};

export function Experience() {
  const { c, t } = useLanguage();
  return (
    <Section id="trayectoria" number={4} title={t.experience.title} intro={t.experience.intro}>
      <ol role="list" className={styles.log}>
        {c.experience.map((item) => (
          <li key={`${item.period}-${item.title}`} className={styles.entry}>
            <div className={styles.when}>
              <span className={styles.period}>{item.period}</span>
              <span className={`${styles.kind} ${KIND_CLASS[item.kind] ?? ''}`}>
                {t.experience.kinds[item.kind]}
              </span>
            </div>
            <div className={styles.what}>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.place}>{item.place}</p>
              <p className={styles.description}>{item.description}</p>
              {item.tags && (
                <ul role="list" className={styles.tags} aria-label={t.projects.technologies}>
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
