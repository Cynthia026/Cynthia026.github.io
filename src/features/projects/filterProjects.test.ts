import type { Project } from '@/types/content';
import { ALL, filterProjects, getTechOptions } from './filterProjects';

const base = {
  year: 2026,
  context: '',
  role: '',
  summary: '',
  problem: '',
  solution: '',
};

const projects: Project[] = [
  { ...base, slug: 'a', title: 'A', stack: ['JavaScript', 'Three.js'] },
  { ...base, slug: 'b', title: 'B', stack: ['JavaScript', 'CSS'] },
  { ...base, slug: 'c', title: 'C', stack: ['Canvas'] },
];

describe('getTechOptions', () => {
  it('ordena por frecuencia y luego alfabéticamente', () => {
    expect(getTechOptions(projects)).toEqual(['JavaScript', 'Canvas', 'CSS', 'Three.js']);
  });

  it('respeta el límite de opciones', () => {
    expect(getTechOptions(projects, 2)).toEqual(['JavaScript', 'Canvas']);
  });
});

describe('filterProjects', () => {
  it('devuelve todos con el filtro "Todos"', () => {
    expect(filterProjects(projects, ALL)).toHaveLength(3);
  });

  it('filtra por tecnología', () => {
    expect(filterProjects(projects, 'JavaScript').map((p) => p.slug)).toEqual(['a', 'b']);
  });

  it('no muta el arreglo original', () => {
    const result = filterProjects(projects, ALL);
    expect(result).not.toBe(projects);
  });
});
