import type { ReactNode } from 'react';
import styles from './ToggleButton.module.css';

interface ToggleButtonProps {
  pressed: boolean;
  onToggle: () => void;
  label: string;
  icon: ReactNode;
  /** Muestra el texto junto al icono en pantallas anchas. */
  showLabel?: boolean;
  shortcut?: string;
}

/** Botón de dos estados accesible (aria-pressed). */
export function ToggleButton({
  pressed,
  onToggle,
  label,
  icon,
  showLabel,
  shortcut,
}: ToggleButtonProps) {
  return (
    <button
      type="button"
      className={styles.toggle}
      aria-pressed={pressed}
      onClick={onToggle}
      title={shortcut ? `${label} (tecla ${shortcut})` : label}
      aria-keyshortcuts={shortcut}
    >
      <span aria-hidden="true" className={styles.icon}>
        {icon}
      </span>
      <span className={showLabel ? styles.label : 'visually-hidden'}>{label}</span>
    </button>
  );
}
