import { aboutFacts, coreStack, profile, projects } from '@/content';
import { Section } from '@/components/layout/Section';
import { asset } from '@/lib/asset';
import styles from './About.module.css';

function countProjects(matches: readonly string[]): number {
  return projects.filter((p) => p.stack.some((tech) => matches.includes(tech))).length;
}

export function About() {
  return (
    <Section
      id="sobre-mi"
      number={1}
      title="Perfil"
      intro="Quién soy, dónde me formo y con qué componentes construyo mis proyectos."
    >
      <div className={styles.layout}>
        <div className={styles.profile}>
          {profile.photo && (
            <img
              src={asset(profile.photo)}
              alt={`Foto de ${profile.name}`}
              className={styles.photo}
              width={160}
              height={160}
            />
          )}
          <p className={styles.summary}>{profile.summary}</p>
          <p className={styles.status}>
            <span className={styles.statusDot} aria-hidden="true" />
            {profile.availability}
          </p>
        </div>

        <div className={styles.sheet}>
          <h3 className={styles.tableTitle}>Ficha técnica</h3>
          <dl className={styles.facts}>
            {aboutFacts.map((fact) => (
              <div key={fact.label} className={styles.factRow}>
                <dt>{fact.label}</dt>
                <dd>
                  <span className={styles.factValue}>{fact.value}</span>
                  {fact.detail && <span className={styles.factDetail}>{fact.detail}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className={styles.bom}>
        <h3 className={styles.tableTitle}>Lista de componentes</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Componente</th>
              <th scope="col">Tipo</th>
              <th scope="col" className={styles.num}>
                Proyectos que lo usan
              </th>
            </tr>
          </thead>
          <tbody>
            {coreStack.map((item) => {
              const count = countProjects(item.matches);
              return (
                <tr key={item.name}>
                  <th scope="row">{item.name}</th>
                  <td>{item.kind}</td>
                  <td className={styles.num}>
                    <div className={styles.meter}>
                      <span className={styles.track} aria-hidden="true">
                        <span
                          className={styles.bar}
                          style={{ inlineSize: `${(count / projects.length) * 100}%` }}
                        />
                      </span>
                      <span className={styles.count}>
                        {count} de {projects.length}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
