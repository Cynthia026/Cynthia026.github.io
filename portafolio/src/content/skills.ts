import type { SkillGroup } from '@/types/content';

export const skills: SkillGroup[] = [
  {
    name: 'Frontend y diseño',
    items: [
      'JavaScript (ES6+)',
      'HTML5 y CSS3',
      'React y Tailwind CSS',
      'Bootstrap 5',
      'Diseño responsivo',
      'Figma y prototipado',
    ],
  },
  {
    name: 'APIs del navegador',
    items: [
      'Three.js y WebXR',
      'Canvas 2D y SVG',
      'Web Speech y Web Audio',
      'Cámara y giroscopio',
      'Service workers (PWA)',
    ],
  },
  {
    name: 'Servicios y backend',
    items: [
      'APIs REST, JSON y Fetch',
      'WebSockets',
      'FastAPI y Spring Boot',
      'Node.js con Express',
      'MySQL',
    ],
  },
  {
    name: 'Nube, redes e IoT',
    items: [
      'AWS (EC2 y RDS)',
      'Vercel y GitHub Pages',
      'IPv4, IPv6 y VLSM',
      'Cisco Packet Tracer',
      'Microcontroladores, sensores y telemetría',
    ],
  },
  {
    name: 'Complementarias',
    items: [
      'IA generativa e ingeniería de prompts',
      'Metodologías ágiles',
      'Git, GitHub y npm',
      'Trabajo colaborativo',
    ],
  },
  {
    name: 'Certificación',
    items: ['Cloud Foundations, insignia de AWS Educate'],
  },
  {
    name: 'Idiomas',
    items: ['Español: nativo', 'Inglés: intermedio (B1), lectura técnica y redacción'],
  },
];
