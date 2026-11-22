import { useLanguage } from '@/i18n/useLanguage';
import styles from './Footer.module.css';

export function Footer() {
  const { c, t } = useLanguage();
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p>
          © {year} {c.profile.name}. {c.profile.location}.
        </p>
        <p>{t.footer.built}</p>
      </div>
    </footer>
  );
}
