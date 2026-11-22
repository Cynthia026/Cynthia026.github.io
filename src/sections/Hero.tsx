import { Button } from '@/components/ui/Button';
import { ContactList } from '@/components/ui/ContactList';
import { DownloadIcon } from '@/components/ui/icons';
import { Icon } from '@/components/ui/Icon';
import { useLanguage } from '@/i18n/useLanguage';
import { asset } from '@/lib/asset';
import { trackSpotlight } from '@/lib/spotlight';
import styles from './Hero.module.css';

export function Hero() {
  const { c, t } = useLanguage();
  const { profile, projects } = c;
  const [first, ...rest] = profile.name.split(' ');
  const featured = projects.find((p) => p.image && p.callouts) ?? projects[0];

  return (
    <section id="inicio" aria-labelledby="hero-title" className={styles.hero}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.text}>
          <p className={styles.kicker}>{t.hero.kicker}</p>
          <h1 id="hero-title" className={styles.name}>
            {first} <span className={styles.last}>{rest.join(' ')}</span>
          </h1>
          <p className={styles.role}>{profile.role}</p>
          <p className={styles.headline}>{profile.headline}</p>

          <div className={styles.ctas}>
            <Button href="#proyectos">
              <Icon name="folder" size={16} />
              {t.hero.seeProjects}
            </Button>
            {profile.cvUrl && (
              <Button href={profile.cvUrl} variant="secondary" download>
                <DownloadIcon />
                {t.hero.downloadCv}
              </Button>
            )}
          </div>

          <ContactList />
        </div>

        {featured?.image && (
          <figure className={styles.figure}>
            <a href={`#${featured.slug}`} className={styles.drawing}>
              <img
                src={asset(featured.image)}
                alt={`${t.hero.screenshotOf} ${featured.title}`}
                width={800}
                height={500}
                fetchPriority="high"
              />
              {featured.callouts?.map((callout, i) => (
                <span
                  key={callout.label}
                  className={styles.balloon}
                  style={{ left: `${callout.x}%`, top: `${callout.y}%` }}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
              ))}
            </a>
            <figcaption className={styles.caption}>
              <p className={styles.figTitle}>
                <span className={styles.figNumber}>{t.hero.figure} 1</span>
                {featured.title.split(':')[0]}
              </p>
              {featured.callouts && (
                <ol className={styles.legend}>
                  {featured.callouts.map((callout) => (
                    <li key={callout.label}>{callout.label}</li>
                  ))}
                </ol>
              )}
            </figcaption>
          </figure>
        )}
      </div>

      <div className="container">
        <dl className={styles.titleBlock}>
          {c.titleBlock.map((cell) => (
            <div
              key={cell.label}
              className={`spotlight ${styles.cell}`}
              onPointerMove={trackSpotlight}
            >
              <dt>
                <Icon name={cell.icon} size={14} />
                {cell.label}
              </dt>
              <dd>{cell.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
