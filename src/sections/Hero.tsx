import { profile } from '@/content';
import { Button } from '@/components/ui/Button';
import { ContactList } from '@/components/ui/ContactList';
import styles from './Hero.module.css';

export function Hero() {
  const [first, ...rest] = profile.name.split(' ');
  return (
    <section id="inicio" aria-labelledby="hero-title" className={styles.hero}>
      <div className="container">
        <div className={styles.top}>
          <p className={styles.role}>
            <span>{profile.role}</span>
            <span className={styles.location}>{profile.location}</span>
          </p>
          <ContactList />
        </div>

        <h1 id="hero-title" className={styles.name}>
          <span className={styles.line}>{first}</span>
          <span className={styles.line}>{rest.join(' ')}</span>
        </h1>

        <div className={styles.body}>
          <p className={styles.headline}>{profile.headline}</p>
          <div className={styles.aside}>
            <p className={styles.summary}>{profile.summary}</p>
            <div className={styles.ctas}>
              <Button href="#proyectos">Ver proyectos</Button>
              {profile.cvUrl && (
                <Button href={profile.cvUrl} variant="secondary" download>
                  Descargar CV
                </Button>
              )}
            </div>
            <p className={styles.status}>
              <span className={styles.dot} aria-hidden="true" />
              {profile.availability}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
