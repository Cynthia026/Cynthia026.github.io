import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { Icon, type IconName } from '@/components/ui/Icon';
import { ExternalIcon } from '@/components/ui/icons';
import { asset } from '@/lib/asset';
import type { ExperienceKind } from '@/types/content';
import { useLanguage } from '@/i18n/useLanguage';
import styles from './Experience.module.css';

const KIND_CLASS: Record<ExperienceKind, string | undefined> = {
  education: styles.education,
  project: styles.project,
  work: styles.work,
  event: styles.event,
};

const KIND_ICON: Record<ExperienceKind, IconName> = {
  education: 'graduation',
  project: 'rocket',
  work: 'briefcase',
  event: 'trophy',
};

export function Experience() {
  const { c, t } = useLanguage();
  return (
    <Section
      id="trayectoria"
      number={4}
      icon="history"
      title={t.experience.title}
      intro={t.experience.intro}
    >
      <ol role="list" className={styles.log}>
        {c.experience.map((item) => (
          <li key={`${item.period}-${item.title}`} className={styles.entry}>
            <div className={styles.when}>
              <span className={styles.period}>{item.period}</span>
              <span className={`${styles.kind} ${KIND_CLASS[item.kind] ?? ''}`}>
                <Icon name={KIND_ICON[item.kind]} size={13} />
                {t.experience.kinds[item.kind]}
              </span>
            </div>
            <div className={styles.what}>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.place}>{item.place}</p>
              <p className={styles.description}>{item.description}</p>
              {item.evidence && (
                <a
                  className={styles.evidence}
                  href={asset(item.evidence)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.experience.evidence} <ExternalIcon />
                  <span className="visually-hidden">
                    {' '}
                    {item.title} {t.a11y.newTab}
                  </span>
                </a>
              )}
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
