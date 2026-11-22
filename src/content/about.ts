import type { AboutFact, Tech } from '@/types/content';

/** Ficha técnica de la sección «Perfil». */
export const aboutFacts: AboutFact[] = [
  {
    label: 'Formación',
    value: 'Ingeniería en Sistemas Computacionales',
    detail: 'Tecnológico Nacional de México, campus Pachuca, 2022 a 2026 (en curso)',
  },
  {
    label: 'Enfoque',
    value: 'Frontend, interfaces 3D e IoT',
    detail: 'Con backend propio cuando el proyecto lo necesita',
  },
  { label: 'Ubicación', value: 'Pachuca, Hidalgo, México' },
  {
    label: 'Idiomas',
    value: 'Español nativo',
    detail: 'Inglés intermedio (B1), lectura técnica y redacción',
  },
  { label: 'Certificación', value: 'Cloud Foundations', detail: 'Insignia de AWS Educate' },
];

export interface StackComponent {
  name: string;
  kind: 'Lenguaje' | 'Interfaz' | 'Gráficos' | 'Backend' | 'Datos' | 'Nube';
  /** Tecnologías de los proyectos que cuentan como uso de este componente. */
  matches: Tech[];
}

/** «Lista de componentes» del stack, en el orden en que se muestra. */
export const coreStack: StackComponent[] = [
  { name: 'JavaScript (ES6+)', kind: 'Lenguaje', matches: ['JavaScript'] },
  { name: 'HTML y CSS', kind: 'Interfaz', matches: ['HTML', 'CSS'] },
  { name: 'Three.js y WebXR', kind: 'Gráficos', matches: ['Three.js', 'WebXR'] },
  { name: 'Canvas y SVG', kind: 'Gráficos', matches: ['Canvas', 'SVG'] },
  { name: 'Node.js', kind: 'Backend', matches: ['Node.js'] },
  { name: 'FastAPI (Python)', kind: 'Backend', matches: ['FastAPI', 'Python'] },
  { name: 'Spring Boot (Java)', kind: 'Backend', matches: ['Spring Boot', 'Java'] },
  { name: 'MySQL', kind: 'Datos', matches: ['MySQL'] },
  { name: 'AWS y Vercel', kind: 'Nube', matches: ['AWS', 'Vercel'] },
];
