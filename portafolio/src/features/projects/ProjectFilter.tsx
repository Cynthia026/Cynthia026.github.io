import { ALL, type TechFilter } from './filterProjects';
import type { Tech } from '@/types/content';
import styles from './ProjectFilter.module.css';

interface ProjectFilterProps {
  options: Tech[];
  value: TechFilter;
  onChange: (value: TechFilter) => void;
}

export function ProjectFilter({ options, value, onChange }: ProjectFilterProps) {
  return (
    <div
      role="group"
      aria-label="Filtrar proyectos por tecnología"
      className={styles.group}
      data-component="ProjectFilter"
    >
      {[ALL, ...options].map((option) => (
        <button
          key={option}
          type="button"
          className={styles.option}
          aria-pressed={value === option}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
