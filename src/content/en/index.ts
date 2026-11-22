import type { SiteContent } from '@/types/content';
import { profile as esProfile } from '../es/profile';
import { coreStack as esStack } from '../es/about';
import { experience as esExperience } from '../es/experience';
import { lab as esLab } from '../es/lab';
import { certifications as esCertifications } from '../es/certifications';
import { projects } from './projects';

const profile: SiteContent['profile'] = {
  ...esProfile,
  role: 'Frontend and IoT Developer',
  headline:
    'I build web interfaces that control real things: 3D, virtual reality, voice, and gestures connected to cloud systems.',
  summary:
    'I study Computer Systems Engineering at the Tecnológico Nacional de México, Pachuca campus. I work mostly with modern JavaScript and browser APIs (Three.js, WebXR, speech, camera, and phone sensors), consume REST APIs and WebSockets, and deploy to Vercel, GitHub Pages, and AWS. Here is the evidence from my most complete projects: what problem they solved, what I decided, and what came out of it.',
  location: 'Pachuca, Hidalgo, Mexico',
  availability: 'Available for internships and frontend projects',
};

const stackKinds: Record<string, string> = {
  Lenguaje: 'Language',
  Interfaz: 'Interface',
  Gráficos: 'Graphics',
  Backend: 'Backend',
  Datos: 'Data',
  Nube: 'Cloud',
};

const stackNames: Record<string, string> = {
  'HTML y CSS': 'HTML and CSS',
  'Three.js y WebXR': 'Three.js and WebXR',
  'Canvas y SVG': 'Canvas and SVG',
  'AWS y Vercel': 'AWS and Vercel',
};

const labText: Record<string, { title: string; description: string }> = {
  'graf-threejs-3d-scenario': {
    title: '3D scene',
    description: '3D scene in Three.js with imported models.',
  },
  'threejs-3d-model-personalized': {
    title: 'Custom 3D model',
    description: 'Loading and customizing a 3D model in the browser.',
  },
  'graf-canvas-collision': {
    title: 'Canvas collisions',
    description: 'Simulation of moving objects that detect and react to collisions.',
  },
  'APIs-NASA-Angular': {
    title: 'API integration with Angular',
    description: 'Angular 21 interfaces that query public APIs and perform CRUD operations.',
  },
  ECOLIDERES: {
    title: 'Ecolíderes',
    description: 'Website for the Eco Líderes project, which I entered in InnovaTecNM 2025.',
  },
};

const experienceText = [
  {
    period: 'Aug 2022 — 2026',
    title: 'B.S. in Computer Systems Engineering',
    place: 'Tecnológico Nacional de México, Pachuca campus',
    description:
      'In progress. Focus areas: web development, programmable systems, computer networks, computer graphics, and IoT.',
  },
  {
    period: 'Oct — Nov 2026',
    title: 'IoT, 3D, and virtual reality systems',
    place: 'Capstone project',
    description:
      'Complete platform for an IoT vehicle: 3D and VR interface, voice and gesture control, FastAPI backend, and a database on AWS.',
  },
  {
    period: 'Feb — May 2026',
    title: 'Full-stack web development',
    place: 'Academic projects',
    description:
      'Multi-role applications connected to my own Spring Boot and Node.js APIs, plus Angular 21 exercises.',
  },
  {
    period: 'May 2025',
    title: 'InnovaTecNM 2025, local stage',
    place: 'Instituto Tecnológico de Pachuca',
    description:
      'Competed with the Eco Líderes project in the “Sustainability and Climate Change” category of the National Summit for Technology Development, Entrepreneurship, and Innovation.',
  },
  {
    period: 'Feb — May 2025',
    title: 'Computer graphics and logic programming',
    place: 'Academic projects',
    description:
      '2D graphics with Canvas, 3D scenes with Three.js, and a video game, plus exercises in Prolog, Python, and Haskell.',
  },
];

const certificationNames: Record<string, { name: string; issuer: string }> = {
  'Fundamentos de Ciberseguridad': {
    name: 'Cybersecurity Fundamentals',
    issuer: 'Cisco Networking Academy, taught by Instituto Tecnológico de Pachuca',
  },
  'Introducción a Cisco Packet Tracer': {
    name: 'Getting Started with Cisco Packet Tracer',
    issuer: 'Cisco Networking Academy',
  },
  'Con Educación Financiera: Construye tu Futuro Financiero (MOOC)': {
    name: 'Financial Education: Build Your Financial Future (MOOC, in Spanish)',
    issuer: 'TecNM and CONDUSEF',
  },
  'Python Essentials 1': {
    name: 'Python Essentials 1',
    issuer: 'Cisco Networking Academy and OpenEDG Python Institute',
  },
  'Cloud Foundations (insignia)': { name: 'Cloud Foundations (badge)', issuer: 'AWS Educate' },
};

function lookup<T>(table: Record<string, T>, key: string, what: string): T {
  const value = table[key];
  if (value === undefined) throw new Error(`Falta la traducción de ${what} «${key}»`);
  return value;
}

export const en: SiteContent = {
  profile,
  titleBlock: [
    { label: 'Author', value: profile.name },
    { label: 'Specialty', value: 'Frontend and IoT' },
    { label: 'Education', value: 'B.S. Computer Systems Engineering, TecNM Pachuca' },
    { label: 'Location', value: 'Pachuca, Hidalgo' },
    { label: 'Status', value: 'Open to internships' },
  ],
  aboutFacts: [
    {
      label: 'Education',
      value: 'B.S. in Computer Systems Engineering',
      detail: 'Tecnológico Nacional de México, Pachuca campus, 2022 to 2026 (in progress)',
    },
    {
      label: 'Focus',
      value: 'Frontend, 3D interfaces, and IoT',
      detail: 'With my own backend when a project needs one',
    },
    { label: 'Location', value: 'Pachuca, Hidalgo, Mexico' },
    {
      label: 'Languages',
      value: 'Spanish (native)',
      detail: 'English intermediate (B1), technical reading and writing',
    },
    {
      label: 'Certifications',
      value: 'Cisco Networking Academy, AWS Educate, and TecNM',
      detail: 'Cybersecurity, network defense, Packet Tracer, Python, and cloud',
    },
  ],
  coreStack: esStack.map((item) => ({
    ...item,
    name: stackNames[item.name] ?? item.name,
    kind: lookup(stackKinds, item.kind, 'tipo de componente'),
  })),
  projects,
  lab: esLab.map((item) => {
    const repo = item.repoUrl.split('/').pop() ?? '';
    return { ...item, ...lookup(labText, repo, 'la práctica') };
  }),
  experience: esExperience.map((item, i) => {
    const t = experienceText[i];
    if (!t) throw new Error(`Falta la traducción de la etapa ${i + 1} de la trayectoria`);
    return { ...item, ...t };
  }),
  skills: [
    {
      name: 'Frontend and design',
      items: [
        'JavaScript (ES6+)',
        'HTML5 and CSS3',
        'React and Tailwind CSS',
        'Bootstrap 5',
        'Responsive design',
        'Figma and prototyping',
      ],
    },
    {
      name: 'Browser APIs',
      items: [
        'Three.js and WebXR',
        'Canvas 2D and SVG',
        'Web Speech and Web Audio',
        'Camera and gyroscope',
        'Service workers (PWA)',
      ],
    },
    {
      name: 'Services and backend',
      items: [
        'REST APIs, JSON, and Fetch',
        'WebSockets',
        'FastAPI and Spring Boot',
        'Node.js with Express',
        'MySQL',
      ],
    },
    {
      name: 'Cloud, networks, and IoT',
      items: [
        'AWS (EC2 and RDS)',
        'Vercel and GitHub Pages',
        'IPv4, IPv6, and VLSM',
        'Cisco Packet Tracer',
        'Cybersecurity and network defense fundamentals',
        'Microcontrollers, sensors, and telemetry',
      ],
    },
    {
      name: 'Complementary',
      items: [
        'Generative AI and prompt engineering',
        'Agile methodologies',
        'Git, GitHub, and npm',
        'Teamwork',
      ],
    },
    {
      name: 'Languages',
      items: ['Spanish: native', 'English: intermediate (B1), technical reading and writing'],
    },
  ],
  certifications: esCertifications.map((cert) => ({
    ...cert,
    ...(certificationNames[cert.name] ?? {}),
  })),
};
