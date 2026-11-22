import { profile, projects } from '@/content';
import { Button } from '@/components/ui/Button';
import { ContactList } from '@/components/ui/ContactList';
import { DownloadIcon } from '@/components/ui/icons';
import { asset } from '@/lib/asset';
import styles from './Hero.module.css';

export function Hero() {
  const [first, ...rest] = profile.name.split(' ');
  const featured = projects.find((p) => p.image) ?? projects[0];

  return (
    <section id="inicio" aria-labelledby="hero-title" className={styles.hero}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.text}>
          <p className={styles.hello}>Hola, soy</p>
          <h1 id="hero-title" className={styles.name}>
            <span>{first}</span> <span className={styles.last}>{rest.join(' ')}</span>
          </h1>
          <p className={styles.role}>
            <span className={styles.dot} aria-hidden="true" />
            {profile.role}
          </p>
          <p className={styles.headline}>{profile.headline}</p>

          <div className={styles.ctas}>
            <Button href="#proyectos">Ver proyectos</Button>
            {profile.cvUrl && (
              <Button href={profile.cvUrl} variant="secondary" download>
                <DownloadIcon />
                Descargar CV
              </Button>
            )}
          </div>

          <ContactList />
        </div>

        {featured?.image && (
          <figure className={styles.visual}>
            <a href={`#${featured.slug}`} className={styles.frame}>
              <span className={styles.bar} aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <img
                src={asset(featured.image)}
                alt={`Captura de ${featured.title}`}
                width={800}
                height={500}
                fetchPriority="high"
              />
            </a>
            <figcaption className={styles.caption}>
              <span className={styles.captionLabel}>Proyecto destacado</span>
              <span className={styles.captionTitle}>{featured.title.split(':')[0]}</span>
              <span className={styles.captionText}>{featured.summary}</span>
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
