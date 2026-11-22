import { Section } from '@/components/layout/Section';
import { Icon } from '@/components/ui/Icon';
import { useLanguage } from '@/i18n/useLanguage';
import { asset } from '@/lib/asset';
import type { Project } from '@/types/content';
import styles from './About.module.css';

function countProjects(projects: readonly Project[], matches: readonly string[]): number {
  return projects.filter((p) => p.stack.some((tech) => matches.includes(tech))).length;
}

export function About() {
  const { c, t } = useLanguage();
  const { profile, aboutFacts, coreStack, projects } = c;
  return (
    <Section id="sobre-mi" number={1} icon="user" title={t.about.title} intro={t.about.intro}>
      <div className={styles.layout}>
        <div className={styles.profile}>
          <div className={styles.identity}>
            {profile.photo && (
              <figure className={styles.photoFrame}>
                <img
                  src={asset(profile.photo)}
                  alt={`${t.about.photoOf} ${profile.name}`}
                  className={styles.photo}
                  width={320}
                  height={320}
                  loading="lazy"
                />
              </figure>
            )}
            <div>
              <p className={styles.name}>{profile.name}</p>
              <p className={styles.role}>
                <Icon name="cpu" size={15} />
                {profile.role}
              </p>
              <p className={styles.role}>
                <Icon name="mapPin" size={15} />
                {profile.location}
              </p>
            </div>
          </div>
          <p className={styles.summary}>{profile.summary}</p>
          <p className={styles.status}>
            <span className={styles.statusDot} aria-hidden="true" />
            {profile.availability}
          </p>
        </div>

        <div className={styles.sheet}>
          <h3 className={styles.tableTitle}>{t.about.sheet}</h3>
          <dl className={styles.facts}>
            {aboutFacts.map((fact) => (
              <div key={fact.label} className={styles.factRow}>
                <dt>
                  <Icon name={fact.icon} size={15} />
                  {fact.label}
                </dt>
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
        <h3 className={styles.tableTitle}>{t.about.bom}</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">{t.about.component}</th>
              <th scope="col">{t.about.kind}</th>
              <th scope="col" className={styles.num}>
                {t.about.usedIn}
              </th>
            </tr>
          </thead>
          <tbody>
            {coreStack.map((item) => {
              const count = countProjects(projects, item.matches);
              return (
                <tr key={item.name}>
                  <th scope="row">
                    <span className={styles.component}>
                      <span className={styles.componentIcon}>
                        <Icon name={item.icon} size={15} />
                      </span>
                      {item.name}
                    </span>
                  </th>
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
                        {count} {t.about.of} {projects.length}
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
