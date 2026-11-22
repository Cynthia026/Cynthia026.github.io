import { profile } from '@/content';
import { MoonIcon, SunIcon } from '@/components/ui/icons';
import { ToggleButton } from '@/components/ui/ToggleButton';
import type { Theme } from '@/hooks/useTheme';
import styles from './Header.module.css';

const NAV_ITEMS = [
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#laboratorio', label: 'Laboratorio' },
  { href: '#trayectoria', label: 'Trayectoria' },
  { href: '#habilidades', label: 'Habilidades' },
  { href: '#contacto', label: 'Contacto' },
];

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#inicio" className={styles.brand}>
          {profile.name}
        </a>

        <nav aria-label="Secciones" className={styles.nav}>
          <ul role="list" className={styles.list}>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <ToggleButton
            pressed={theme === 'dark'}
            onToggle={onToggleTheme}
            label="Modo oscuro"
            icon={theme === 'dark' ? <MoonIcon /> : <SunIcon />}
          />
        </div>
      </div>
    </header>
  );
}
