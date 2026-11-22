import { useLanguage } from '@/i18n/useLanguage';
import { LOCALES } from '@/i18n/locales';
import styles from './LanguageSwitch.module.css';

const NAMES = { es: 'Español', en: 'English' } as const;

/** Selector ES / EN. Cada botón indica con aria-pressed si es el idioma activo. */
export function LanguageSwitch() {
  const { locale, setLocale, t } = useLanguage();
  return (
    <div role="group" aria-label={t.a11y.language} className={styles.switch}>
      {LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-pressed={locale === code}
          aria-label={NAMES[code]}
          className={styles.option}
          onClick={() => setLocale(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
