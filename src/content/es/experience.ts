import type { ExperienceItem } from '@/types/content';

/** Formación y etapas de trabajo, de lo más reciente a lo más antiguo. */
export const experience: ExperienceItem[] = [
  {
    kind: 'education',
    period: 'Ago 2022 — 2026',
    title: 'Ingeniería en Sistemas Computacionales',
    place: 'Tecnológico Nacional de México, campus Pachuca',
    description:
      'En curso. Áreas de enfoque: desarrollo web, sistemas programables, redes de computadoras, graficación e IoT.',
  },
  {
    kind: 'project',
    period: 'Oct — nov 2026',
    title: 'Sistemas IoT, 3D y realidad virtual',
    place: 'Proyecto integrador',
    description:
      'Plataforma completa para un vehículo IoT: interfaz 3D y VR, control por voz y gestos, API en FastAPI y base de datos en AWS.',
    tags: ['Three.js', 'WebXR', 'FastAPI', 'AWS'],
  },
  {
    kind: 'project',
    period: 'Feb — may 2026',
    title: 'Desarrollo web full stack',
    place: 'Proyectos académicos',
    description:
      'Aplicaciones con varios roles de usuario conectadas a APIs propias en Spring Boot y Node.js, y prácticas con Angular 21.',
    tags: ['Spring Boot', 'Node.js', 'Angular'],
  },
  {
    kind: 'event',
    period: 'Mayo 2025',
    title: 'InnovaTecNM 2025, etapa local',
    place: 'Instituto Tecnológico de Pachuca',
    description:
      'Concursé con el proyecto Eco Líderes en la categoría «Sostenibilidad y Cambio Climático» de la Cumbre Nacional de Desarrollo Tecnológico, Emprendimiento e Innovación.',
    evidence: 'certificados/innovatecnm-2025-eco-lideres.pdf',
  },
  {
    kind: 'project',
    period: 'Feb — may 2025',
    title: 'Graficación y programación lógica',
    place: 'Proyectos académicos',
    description:
      'Gráficos 2D con Canvas, escenas 3D con Three.js y un videojuego, además de prácticas en Prolog, Python y Haskell.',
    tags: ['Canvas', 'Three.js', 'Prolog'],
  },
];
