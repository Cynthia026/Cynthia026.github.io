/** Modelos de contenido. Todo el texto del sitio vive en `src/content` y se tipa aquí. */

export interface SocialLink {
  label: string;
  href: string;
  /** Texto visible del enlace; si falta, se deriva de la URL. */
  display?: string;
}

export interface Profile {
  name: string;
  role: string;
  /** Una frase que resume lo que haces y para quién. */
  headline: string;
  summary: string;
  location: string;
  email: string;
  /** Teléfono en formato legible, p. ej. «+52 771 343 8834». */
  phone?: string;
  availability: string;
  cvUrl?: string;
  links: SocialLink[];
}

export type Tech =
  | 'JavaScript'
  | 'TypeScript'
  | 'HTML'
  | 'CSS'
  | 'Three.js'
  | 'WebXR'
  | 'Canvas'
  | 'SVG'
  | 'MediaPipe'
  | 'PWA'
  | 'WebSockets'
  | 'Chart.js'
  | 'Angular'
  | 'Bootstrap'
  | 'Node.js'
  | 'Python'
  | 'FastAPI'
  | 'Java'
  | 'Spring Boot'
  | 'MySQL'
  | 'AWS'
  | 'Vercel'
  | 'IA';

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  /** Identificador único, se usa como `key` y ancla (#slug). */
  slug: string;
  title: string;
  year: number;
  /** Contexto: materia, empresa, cliente o proyecto personal. */
  context: string;
  role: string;
  summary: string;
  problem: string;
  solution: string;
  stack: Tech[];
  metrics?: ProjectMetric[];
  /** Ruta a una captura en /public (p. ej. `/projects/tienda.webp`). Si falta, se dibuja un esquema. */
  image?: string;
  demoUrl?: string;
  repoUrl?: string;
  /** Otros repositorios del mismo proyecto (backend, versiones previas). */
  related?: SocialLink[];
}

/** Práctica o experimento corto que se muestra en la sección Laboratorio. */
export interface LabItem {
  title: string;
  year: number;
  description: string;
  stack: Tech[];
  repoUrl: string;
}

export interface ExperienceItem {
  period: string;
  title: string;
  place: string;
  description: string;
}

export interface SkillGroup {
  name: string;
  items: string[];
}
