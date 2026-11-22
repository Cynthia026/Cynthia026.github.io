import { ALL, type TechFilter } from './filterProjects';
import type { Tech } from '@/types/content';
import { useLanguage } from '@/i18n/useLanguage';
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
        <button
          key={option}
          type="button"
          className={styles.option}
          aria-pressed={value === option}
          onClick={() => onChange(option)}
        >
          {option === ALL ? t.projects.all : option}
        </button>
      ))}
    </div>
  );
}
