import { lab } from '@/content';
import { Section } from '@/components/layout/Section';
import styles from './Lab.module.css';

export function Lab() {
  return (
    <Section
      id="laboratorio"
      title="Laboratorio"
      intro="Prácticas y experimentos más cortos donde aprendí las bases que uso en los proyectos de arriba."
    >
      <ul role="list" className={styles.list}>
        {lab.map((item) => (
          <li key={item.repoUrl} className={styles.item}>
            <h3 className={styles.title}>
              <a href={item.repoUrl} target="_blank" rel="noopener noreferrer">
                {item.title}
                <span className="visually-hidden"> (repositorio, abre en otra pestaña)</span>
              </a>
            </h3>
            <p className={styles.description}>{item.description}</p>
            <p className={styles.meta}>
              <span>{item.year}</span>
              <span>{item.stack.join(', ')}</span>
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
