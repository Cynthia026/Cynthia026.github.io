import type { AboutFact } from '@/types/content';

/** Datos breves de la sección «Sobre mí». */
export const aboutFacts: AboutFact[] = [
  {
    label: 'Formación',
    value: 'Ingeniería en Sistemas Computacionales',
    detail: 'TecNM, campus Pachuca, 2022 a 2026',
  },
  { label: 'Ubicación', value: 'Pachuca, Hidalgo', detail: 'México' },
  { label: 'Idiomas', value: 'Español nativo', detail: 'Inglés intermedio (B1)' },
  { label: 'Certificación', value: 'Cloud Foundations', detail: 'Insignia de AWS Educate' },
];

/** Tecnologías principales, en el orden en que se muestran. */
export const coreStack: string[] = [
  'JavaScript',
  'TypeScript',
  'React',
  'Three.js',
  'WebXR',
  'HTML y CSS',
  'Tailwind CSS',
  'FastAPI',
  'Spring Boot',
  'Node.js',
  'MySQL',
  'AWS',
];
