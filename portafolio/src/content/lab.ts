import type { LabItem } from '@/types/content';

const GH = 'https://github.com/Cynthia026';

/** Prácticas y experimentos cortos. */
export const lab: LabItem[] = [
  {
    title: 'Escenario 3D',
    year: 2025,
    description: 'Escena 3D en Three.js con modelos importados.',
    stack: ['Three.js', 'JavaScript'],
    repoUrl: `${GH}/graf-threejs-3d-scenario`,
  },
  {
    title: 'Modelo 3D personalizado',
    year: 2025,
    description: 'Carga y personalización de un modelo 3D en el navegador.',
    stack: ['Three.js', 'JavaScript'],
    repoUrl: `${GH}/threejs-3d-model-personalized`,
  },
  {
    title: 'Colisiones en canvas',
    year: 2025,
    description: 'Simulación de objetos en movimiento que detectan y responden a choques.',
    stack: ['Canvas', 'JavaScript'],
    repoUrl: `${GH}/graf-canvas-collision`,
  },
  {
    title: 'Consumo de APIs con Angular',
    year: 2026,
    description: 'Interfaces en Angular 21 que consultan APIs públicas y hacen operaciones CRUD.',
    stack: ['Angular', 'TypeScript'],
    repoUrl: `${GH}/APIs-NASA-Angular`,
  },
  {
    title: 'Ecolíderes',
    year: 2025,
    description: 'Sitio informativo para un grupo ambiental, con galería y video.',
    stack: ['HTML', 'CSS'],
    repoUrl: `${GH}/ECOLIDERES`,
  },
];
