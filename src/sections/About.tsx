import { aboutFacts, coreStack, profile } from '@/content';
import { Section } from '@/components/layout/Section';
import { asset } from '@/lib/asset';
import styles from './About.module.css';

function initials(name: string): string {
  const [first = '', second = ''] = name.split(' ');
  return `${first[0] ?? ''}${second[0] ?? ''}`;
}

export function About() {
  return (
    <Section
      id="sobre-mi"
      title="Sobre mí"
      intro="Quién soy, con qué herramientas trabajo y dónde estoy formándome."
    >
      <div className={styles.bento}>
        <article className={`card ${styles.profile}`}>
          {profile.photo ? (
            <img
              src={asset(profile.photo)}
              alt={`Foto de ${profile.name}`}
              className={styles.avatar}
              width={96}
              height={96}
            />
          ) : (
            <span className={`${styles.avatar} ${styles.initials}`} aria-hidden="true">
              {initials(profile.name)}
            </span>
          )}
          <div className={styles.profileText}>
            <h3 className={styles.profileName}>{profile.name}</h3>
            <p className={styles.profileRole}>{profile.role}</p>
          </div>
          <p className={styles.summary}>{profile.summary}</p>
          <p className={styles.status}>
            <span className={styles.statusDot} aria-hidden="true" />
            {profile.availability}
          </p>
        </article>

        <article className={`card ${styles.stack}`}>
          <h3 className={styles.cardLabel}>Stack principal</h3>
          <ul role="list" className={styles.stackGrid}>
            {coreStack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </article>

        {aboutFacts.map((fact) => (
          <article key={fact.label} className={`card ${styles.fact}`}>
            <h3 className={styles.cardLabel}>{fact.label}</h3>
            <p className={styles.factValue}>{fact.value}</p>
            {fact.detail && <p className={styles.factDetail}>{fact.detail}</p>}
          </article>
        ))}
      </div>
    </Section>
  );
}
