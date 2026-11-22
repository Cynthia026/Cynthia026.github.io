import type { AboutFact, StackComponent } from '@/types/content';

/** Ficha técnica de la sección «Perfil». */
export const aboutFacts: AboutFact[] = [
  {
    icon: 'graduation',
    label: 'Formación',
    value: 'Ingeniería en Sistemas Computacionales',
    detail: 'Tecnológico Nacional de México, campus Pachuca, 2022 a 2026 (en curso)',
  },
  {
    icon: 'target',
    label: 'Enfoque',
    value: 'Frontend, interfaces 3D e IoT',
    detail: 'Con backend propio cuando el proyecto lo necesita',
  },
  { icon: 'mapPin', label: 'Ubicación', value: 'Pachuca, Hidalgo, México' },
  {
    icon: 'languages',
    label: 'Idiomas',
    value: 'Español nativo',
    detail: 'Inglés intermedio (B1), lectura técnica y redacción',
  },
  {
    icon: 'badge',
    label: 'Certificaciones',
    value: 'Cisco Networking Academy, AWS Academy y TecNM',
    detail: 'Ciberseguridad, defensa de redes, IoT, Packet Tracer, Python y nube',
  },
];

/** «Lista de componentes» del stack, en el orden en que se muestra. */
export const coreStack: StackComponent[] = [
  { name: 'JavaScript (ES6+)', kind: 'Lenguaje', icon: 'braces', matches: ['JavaScript'] },
  { name: 'HTML y CSS', kind: 'Interfaz', icon: 'layout', matches: ['HTML', 'CSS'] },
  { name: 'Three.js y WebXR', kind: 'Gráficos', icon: 'box', matches: ['Three.js', 'WebXR'] },
  { name: 'Canvas y SVG', kind: 'Gráficos', icon: 'box', matches: ['Canvas', 'SVG'] },
  { name: 'Node.js', kind: 'Backend', icon: 'server', matches: ['Node.js'] },
  { name: 'FastAPI (Python)', kind: 'Backend', icon: 'server', matches: ['FastAPI', 'Python'] },
  { name: 'Spring Boot (Java)', kind: 'Backend', icon: 'server', matches: ['Spring Boot', 'Java'] },
  { name: 'MySQL', kind: 'Datos', icon: 'database', matches: ['MySQL'] },
  { name: 'AWS y Vercel', kind: 'Nube', icon: 'cloud', matches: ['AWS', 'Vercel'] },
];
