import { lab } from '@/content';
import { Section } from '@/components/layout/Section';
import { ExternalIcon } from '@/components/ui/icons';
import styles from './Lab.module.css';

export function Lab() {
  return (
    <Section
      id="laboratorio"
      number={3}
      title="Laboratorio"
      intro="Prácticas y experimentos más cortos donde aprendí las bases que uso en mis proyectos."
    >
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Año</th>
            <th scope="col">Práctica</th>
            <th scope="col" className={styles.stackCol}>
              Tecnologías
            </th>
            <th scope="col">
              <span className="visually-hidden">Repositorio</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {lab.map((item) => (
            <tr key={item.repoUrl}>
              <td className={styles.year}>{item.year}</td>
              <th scope="row" className={styles.name}>
                <span className={styles.title}>{item.title}</span>
                <span className={styles.description}>{item.description}</span>
              </th>
              <td className={styles.stackCol}>{item.stack.join(', ')}</td>
              <td className={styles.link}>
                <a href={item.repoUrl} target="_blank" rel="noopener noreferrer">
                  Código <ExternalIcon />
                  <span className="visually-hidden"> de {item.title} (abre en otra pestaña)</span>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}
