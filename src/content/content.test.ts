import { content } from '@/content';
import { projects as esProjects } from './es/projects';
import { projectTextForTests } from './en/projects';

const { es, en } = content;

describe('Contenido en ambos idiomas', () => {
  it('tiene los mismos proyectos, en el mismo orden', () => {
    expect(en.projects.map((p) => p.slug)).toEqual(es.projects.map((p) => p.slug));
  });

  it('traduce todas las métricas, globos y repos relacionados', () => {
    for (const project of esProjects) {
      const t = projectTextForTests[project.slug];
      expect(t, project.slug).toBeDefined();
      expect(t?.metrics?.length ?? 0, `${project.slug} métricas`).toBe(
        project.metrics?.length ?? 0,
      );
      expect(t?.callouts?.length ?? 0, `${project.slug} globos`).toBe(
        project.callouts?.length ?? 0,
      );
      expect(t?.related?.length ?? 0, `${project.slug} repos`).toBe(project.related?.length ?? 0);
      expect(t?.architecture?.length ?? 0, `${project.slug} arquitectura`).toBe(
        project.architecture?.length ?? 0,
      );
    }
  });

  it('tiene el mismo número de elementos en cada lista', () => {
    for (const key of [
      'titleBlock',
      'aboutFacts',
      'coreStack',
      'lab',
      'experience',
      'certifications',
    ] as const) {
      expect(en[key].length, key).toBe(es[key].length);
    }
  });

  it('no deja texto en español en los títulos de proyecto en inglés', () => {
    for (const [i, project] of en.projects.entries()) {
      expect(project.title).not.toBe(es.projects[i]?.title);
    }
  });
});
