import { useLanguage } from '@/i18n/useLanguage';
import styles from './SkipLink.module.css';

export function SkipLink() {
  const { t } = useLanguage();
  return (
    <a href="#contenido" className={styles.skip}>
      {t.a11y.skip}
    </a>
  );
}
