import { lab } from '@/content';
import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import styles from './Lab.module.css';

export function Lab() {
  return (
    <Section
      id="laboratorio"
      title="Laboratorio"
      intro="Prácticas y experimentos más cortos donde aprendí las bases que uso en mis proyectos."
    >
      <ul role="list" className={styles.list}>
        {lab.map((item) => (
          <li key={item.repoUrl}>
            <a
              href={item.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`card ${styles.item}`}
            >
              <span className={styles.year}>{item.year}</span>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
              <span className={styles.tags}>
                {item.stack.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </span>
              <span className="visually-hidden"> (repositorio, abre en otra pestaña)</span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
