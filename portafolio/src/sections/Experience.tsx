import { experience } from '@/content';
import { Section } from '@/components/layout/Section';
import styles from './Experience.module.css';

export function Experience() {
  return (
    <Section
      id="trayectoria"
      component="Experience"
      title="Trayectoria"
      intro="Mi formación y cómo ha crecido mi trabajo, de lo más reciente a lo más antiguo."
    >
      <ol role="list" className={styles.timeline}>
        {experience.map((item) => (
          <li key={`${item.period}-${item.title}`} className={styles.item}>
            <p className={styles.period}>{item.period}</p>
            <div className={styles.body}>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.place}>{item.place}</p>
              <p className={styles.description}>{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
