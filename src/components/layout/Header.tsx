import { profile } from '@/content';
import { MoonIcon, SunIcon } from '@/components/ui/icons';
import { ToggleButton } from '@/components/ui/ToggleButton';
import { useActiveSection } from '@/hooks/useActiveSection';
import type { Theme } from '@/hooks/useTheme';
import styles from './Header.module.css';

const NAV_ITEMS = [
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'trayectoria', label: 'Trayectoria' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'contacto', label: 'Contacto' },
] as const;

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
  const active = useActiveSection(SECTION_IDS);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#inicio" className={styles.brand}>
          <span className={styles.monogram} aria-hidden="true">
            {initials(profile.name)}
          </span>
          <span className={styles.brandName}>{profile.name}</span>
        </a>

        <nav aria-label="Secciones" className={styles.nav}>
          <ul role="list" className={styles.list}>
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={styles.link}
                  aria-current={active === item.id ? 'location' : undefined}
                >
                  {item.label}
                </a>
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
