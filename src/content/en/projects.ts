import type { Project } from '@/types/content';
import { projects as base } from '../es/projects';

/**
 * Las URLs, imágenes, tecnologías y posiciones vienen de la versión en español;
 * aquí solo se traduce el texto. Cada arreglo sigue el mismo orden que el original.
 */
interface ProjectText {
  title: string;
  context: string;
  role: string;
  summary: string;
  problem: string;
  solution: string;
  metrics?: string[];
  callouts?: string[];
  architecture?: { name: string; detail: string }[];
  related?: string[];
}

const text: Record<string, ProjectText> = {
  'vehiculo-iot': {
    title: 'IoT Vehicle: 3D digital twin, virtual reality, and voice and gesture control',
    context: 'Capstone project, labs 4.1 to 4.3',
    role: 'End-to-end development: interface, API, and database',
    summary:
      'Web app to drive and monitor an IoT excavator in real time from a computer, a phone, or a VR headset.',
    problem:
      'Control a physical vehicle remotely and safely: each type of user sees only what is theirs, the stop command always wins, and it works the same on desktop, mobile, and VR.',
    solution:
      'I built an installable SPA (PWA) in modular JavaScript with a 3D digital twin of the excavator in Three.js and a VR mode with WebXR. I added voice control, hand-gesture control with MediaPipe (processed in the browser), and phone-gyroscope control, plus an AI assistant that turns phrases like “draw a square” into movement plans that are validated before running. The backend is a FastAPI service on AWS EC2 with WebSockets, JWT, role-based access, and protection so a customer cannot move someone else’s vehicle.',
    metrics: ['ways to control it', 'stored procedures', 'user roles'],
    callouts: [
      '3D digital twin with Three.js and VR mode with WebXR',
      'Voice, hand-gesture, and gyroscope control',
      'Real-time speed and status over WebSockets',
      'Priority stop: “Stop” always wins',
    ],
    architecture: [
      { name: 'Browser', detail: 'PWA in JavaScript, Three.js, WebXR, MediaPipe' },
      { name: 'Communication', detail: 'REST with JWT and per-vehicle WebSockets' },
      { name: 'API', detail: 'FastAPI on AWS EC2, roles and ownership checks' },
      { name: 'Data', detail: 'MySQL on Amazon RDS with 21 stored procedures' },
    ],
    related: ['API (FastAPI)', 'Version with admin module'],
  },
  'neurolearn-kids': {
    title: 'NeuroLearn Kids: learning platform for children',
    context: 'Academic project',
    role: 'Frontend design and development',
    summary:
      'Platform to practice math and Spanish through games, with separate dashboards for students, teachers, and parents.',
    problem:
      'Every child starts at a different level, and teachers and parents need to see progress without reviewing each exercise.',
    solution:
      'I designed a flow that detects the first sign-in and runs a 12-question diagnostic test before showing the dashboard. I built five educational games, sign-in with Google and Facebook, a custom design system with themes, and progress dashboards per role. The backend uses Node.js with Express, Prisma, and JWT, and the site is deployed on Vercel.',
    metrics: ['educational games', 'role-based dashboards'],
    related: ['Backend (Express and Prisma)'],
  },
  siaa: {
    title: 'SIAA: academic attendance system',
    context: 'Academic project',
    role: 'Full-stack development',
    summary:
      'Web system to record and review student attendance, with separate views for students, teachers, and administrators.',
    problem:
      'Taking attendance on paper is slow and makes it hard to see later how many absences a student has per course.',
    solution:
      'I built a responsive interface with one screen per task (taking attendance, reports, editing users and courses) and connected it to a Spring Boot REST API with Spring Security and JWT, domain services, and centralized error handling. The frontend deploys to Vercel automatically on every push to GitHub.',
    metrics: ['user roles', 'REST controllers'],
    related: ['Backend (Spring Boot)'],
  },
  smartcampus: {
    title: 'SmartCampus: campus services dashboard',
    context: 'Academic project',
    role: 'End-to-end development',
    summary:
      'Dashboard showing library occupancy, restroom reports, and maps of power outlets and Wi-Fi coverage on campus.',
    problem:
      'Students waste time looking for a seat in the library, a free outlet, or a spot with good signal.',
    solution:
      'I designed an occupancy traffic light with a per-floor breakdown and a daily chart, interactive SVG maps for outlets and Wi-Fi, and a reporting system with votes and statuses (pending, in progress, resolved). Data comes from a custom Node.js API and refreshes periodically.',
    metrics: ['service modules'],
  },
  'catalogo-musica': {
    title: 'Music catalog',
    context: 'API integration exercise',
    role: 'Frontend development',
    summary:
      'Search for artists, people, albums, and songs that combines two APIs in one interface.',
    problem: 'Query two different APIs without the user noticing they are separate services.',
    solution:
      'I split the code into data, rendering, and orchestration modules. I added genre and year filters, switching between artists and music, and clear messages when a request fails. It is deployed on Vercel, which proxies requests to the APIs on AWS.',
  },
  'gold-fish': {
    title: 'Gold Fish: 2D web game',
    context: 'Course: Computer Graphics',
    role: 'Team development',
    summary:
      'Browser game where a fish collects coins and dodges sharks as the difficulty increases.',
    problem: 'Build a complete game with the Canvas API, without engines or external libraries.',
    solution:
      'We programmed the main game loop, 2D collision detection, progressive difficulty levels, game states (playing and game over), and the scoreboard, with music and sound effects.',
    metrics: ['external libraries'],
  },
};

function localize(project: Project): Project {
  const t = text[project.slug];
  if (!t) throw new Error(`Falta la traducción del proyecto «${project.slug}»`);
  return {
    ...project,
    title: t.title,
    context: t.context,
    role: t.role,
    summary: t.summary,
    problem: t.problem,
    solution: t.solution,
    metrics: project.metrics?.map((m, i) => ({ ...m, label: t.metrics?.[i] ?? m.label })),
    callouts: project.callouts?.map((c, i) => ({ ...c, label: t.callouts?.[i] ?? c.label })),
    architecture: t.architecture ?? project.architecture,
    related: project.related?.map((r, i) => ({ ...r, label: t.related?.[i] ?? r.label })),
  };
}

export const projects: Project[] = base.map(localize);

/** Para las pruebas: comprueba que cada arreglo traducido tenga el mismo largo que el original. */
export const projectTextForTests = text;
