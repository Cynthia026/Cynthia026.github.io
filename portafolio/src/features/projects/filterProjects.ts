import type { Project, Tech } from '@/types/content';

export const ALL = 'Todos' as const;
export type TechFilter = Tech | typeof ALL;

/** Tecnologías presentes en los proyectos, ordenadas por frecuencia de uso. */
export function getTechOptions(projects: readonly Project[], limit?: number): Tech[] {
  const counts = new Map<Tech, number>();
  for (const project of projects) {
    for (const tech of project.stack) counts.set(tech, (counts.get(tech) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort(([a, ca], [b, cb]) => cb - ca || a.localeCompare(b, 'es'))
    .map(([tech]) => tech)
    .slice(0, limit);
}

export function filterProjects(projects: readonly Project[], filter: TechFilter): Project[] {
  if (filter === ALL) return [...projects];
  return projects.filter((project) => project.stack.includes(filter));
}
