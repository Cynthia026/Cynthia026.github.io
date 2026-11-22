import { Section } from '@/components/layout/Section';
import { ExternalIcon } from '@/components/ui/icons';
import { Icon } from '@/components/ui/Icon';
import { useLanguage } from '@/i18n/useLanguage';
import { asset } from '@/lib/asset';
import { trackSpotlight } from '@/lib/spotlight';
import styles from './Skills.module.css';

export function Skills() {
  const { c, t, locale } = useLanguage();
  const formatDate = new Intl.DateTimeFormat(locale === 'es' ? 'es-MX' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <Section
      id="habilidades"
      number={5}
      icon="wrench"
      title={t.skills.title}
      intro={t.skills.intro}
    >
      <div className={styles.grid}>
        {c.skills.map((group) => (
          <article
            key={group.name}
            className={`spotlight ${styles.group}`}
            onPointerMove={trackSpotlight}
          >
            <h3 className={styles.name}>
              <span className={styles.groupIcon}>
                <Icon name={group.icon} size={16} />
              </span>
              {group.name}
            </h3>
            <ul role="list" className={styles.items}>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className={styles.certs}>
        <h3 className={styles.tableTitle}>{t.skills.certifications}</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">{t.skills.date}</th>
              <th scope="col">{t.skills.name}</th>
              <th scope="col">
                <span className="visually-hidden">{t.skills.view}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {c.certifications.map((cert) => (
              <tr key={cert.name}>
                <td className={styles.date}>
                  {cert.date ? (
                    <time dateTime={cert.date}>{formatDate.format(new Date(cert.date))}</time>
                  ) : (
                    <span className={styles.noDate}>{t.skills.noDate}</span>
                  )}
                </td>
                <th scope="row" className={styles.cert}>
                  <span className={styles.certName}>
                    <Icon name={cert.verifyUrl ? 'badge' : 'award'} size={16} />
                    {cert.name}
                  </span>
                  <span className={styles.issuer}>{cert.issuer}</span>
                </th>
                <td className={styles.link}>
                  {cert.verifyUrl && (
                    <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
                      <Icon name="shield" size={15} />
                      {t.skills.verify} <ExternalIcon />
                      <span className="visually-hidden">
                        {' '}
                        {cert.name} {t.a11y.newTab}
                      </span>
                    </a>
                  )}
                  {cert.url && (
                    <a
                      href={/^https?:/.test(cert.url) ? cert.url : asset(cert.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon name="file" size={15} />
                      {t.skills.view} <ExternalIcon />
                      <span className="visually-hidden">
                        {' '}
                        {cert.name} {t.a11y.newTab}
                      </span>
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
