import { ALL, type TechFilter } from './filterProjects';
import type { Tech } from '@/types/content';
import { useLanguage } from '@/i18n/useLanguage';
import { useRipple } from '@/hooks/useRipple';
import styles from './ProjectFilter.module.css';

interface ProjectFilterProps {
  options: Tech[];
  value: TechFilter;
  onChange: (value: TechFilter) => void;
}

export function ProjectFilter({ options, value, onChange }: ProjectFilterProps) {
  const { t } = useLanguage();
  return (
    <div role="group" aria-label={t.projects.filterLabel} className={styles.group}>
      {[ALL, ...options].map((option) => (
        <FilterOption
          key={option}
          pressed={value === option}
          onClick={() => onChange(option)}
          label={option === ALL ? t.projects.all : option}
        />
      ))}
    </div>
  );
}

interface FilterOptionProps {
  pressed: boolean;
  onClick: () => void;
  label: string;
}

function FilterOption({ pressed, onClick, label }: FilterOptionProps) {
  const { onPointerDown, ripples } = useRipple(styles.ripple ?? '');
  return (
    <button
      type="button"
      className={styles.option}
      aria-pressed={pressed}
      onClick={onClick}
      onPointerDown={onPointerDown}
    >
      {label}
      {ripples}
    </button>
  );
}
