import { MoonIcon, SunIcon } from '@/components/ui/icons';
import { Icon, type IconName } from '@/components/ui/Icon';
import { LanguageSwitch } from '@/components/ui/LanguageSwitch';
import { ToggleButton } from '@/components/ui/ToggleButton';
import { useLanguage } from '@/i18n/useLanguage';
import type { UiStrings } from '@/i18n/ui';
import { useActiveSection } from '@/hooks/useActiveSection';
import type { Theme } from '@/hooks/useTheme';
import styles from './Header.module.css';

const NAV_ITEMS: { id: string; key: keyof UiStrings['nav']; icon: IconName }[] = [
  { id: 'sobre-mi', key: 'profile', icon: 'user' },
  { id: 'proyectos', key: 'projects', icon: 'folder' },
  { id: 'laboratorio', key: 'lab', icon: 'flask' },
  { id: 'trayectoria', key: 'experience', icon: 'history' },
  { id: 'habilidades', key: 'skills', icon: 'wrench' },
  { id: 'contacto', key: 'contact', icon: 'send' },
];

// «inicio» se observa para limpiar el resaltado al volver arriba.
const SECTION_IDS = ['inicio', ...NAV_ITEMS.map((item) => item.id)];

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}

function initials(name: string): string {
  const [first = '', second = ''] = name.split(' ');
  return `${first[0] ?? ''}${second[0] ?? ''}`;
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const { c, t } = useLanguage();
  const active = useActiveSection(SECTION_IDS);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#inicio" className={styles.brand}>
          <span className={styles.monogram} aria-hidden="true">
            {initials(c.profile.name)}
          </span>
          <span className={styles.brandName}>{c.profile.name}</span>
        </a>

        <nav aria-label={t.a11y.sections} className={styles.nav}>
          <ul role="list" className={styles.list}>
            {NAV_ITEMS.map((item, index) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={styles.link}
                  aria-current={active === item.id ? 'location' : undefined}
                >
                  <span className={styles.linkNumber}>{index + 1}.</span>
                  <Icon name={item.icon} size={15} className={styles.linkIcon} />
                  {t.nav[item.key]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <LanguageSwitch />
          <ToggleButton
            pressed={theme === 'dark'}
            onToggle={onToggleTheme}
            label={t.a11y.darkMode}
            icon={theme === 'dark' ? <MoonIcon /> : <SunIcon />}
          />
        </div>
      </div>
    </header>
  );
}
