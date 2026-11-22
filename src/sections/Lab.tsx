import { Section } from '@/components/layout/Section';
import { ExternalIcon } from '@/components/ui/icons';
import { useLanguage } from '@/i18n/useLanguage';
import styles from './Lab.module.css';

export function Lab() {
  const { c, t } = useLanguage();
  return (
    <Section id="laboratorio" number={3} title={t.lab.title} intro={t.lab.intro}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">{t.lab.year}</th>
            <th scope="col">{t.lab.exercise}</th>
            <th scope="col" className={styles.stackCol}>
              {t.lab.technologies}
            </th>
            <th scope="col">
              <span className="visually-hidden">{t.lab.repository}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {c.lab.map((item) => (
            <tr key={item.repoUrl}>
              <td className={styles.year}>{item.year}</td>
              <th scope="row" className={styles.name}>
                <span className={styles.title}>{item.title}</span>
                <span className={styles.description}>{item.description}</span>
              </th>
              <td className={styles.stackCol}>{item.stack.join(', ')}</td>
              <td className={styles.link}>
                <a href={item.repoUrl} target="_blank" rel="noopener noreferrer">
                  {t.lab.code} <ExternalIcon />
                  <span className="visually-hidden">
                    {' '}
                    {item.title} {t.a11y.newTab}
                  </span>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}
