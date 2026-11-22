/**
 * Modelos de contenido. Todo el texto del sitio vive en `src/content/<idioma>` y se tipa aquí;
 * ambos idiomas deben cumplir la misma forma (`SiteContent`).
 */

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
  /** Foto en /public (p. ej. `foto.webp`). Si falta, se muestran las iniciales. */
  photo?: string;
  links: SocialLink[];
}

/** Dato breve que se muestra en un bloque de «Sobre mí». */
export interface AboutFact {
  label: string;
  value: string;
  detail?: string;
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

/** Globo numerado sobre la captura, como las referencias de un plano. x e y en % de la imagen. */
export interface Callout {
  label: string;
  x: number;
  y: number;
}

export interface Project {
  /** Identificador único, se usa como `key` y ancla (#slug). */
  slug: string;
  title: string;
  year: number;
  /** Contexto: materia, empresa, cliente o proyecto personal. */
  context: string;
  role: string;
  /** Si fue en equipo, con quién. */
  team?: string;
  summary: string;
  problem: string;
  solution: string;
  stack: Tech[];
  metrics?: ProjectMetric[];
  /** Captura dentro de /public, sin barra inicial (p. ej. `projects/tienda.webp`). Si falta, se dibuja un esquema. */
  image?: string;
  /** Referencias numeradas sobre la captura (solo se muestran en la portada). */
  callouts?: Callout[];
  /** Capas del sistema, de la interfaz a los datos; se dibuja como diagrama. */
  architecture?: { name: string; detail: string }[];
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

export type ExperienceKind = 'education' | 'project' | 'work';

export interface ExperienceItem {
  kind: ExperienceKind;
  period: string;
  title: string;
  place: string;
  description: string;
  tags?: string[];
}

export interface SkillGroup {
  name: string;
  items: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  /** Fecha ISO (AAAA-MM-DD); se formatea según el idioma. */
  date?: string;
  /** Archivo en /public (p. ej. `certificados/x.pdf`) o enlace de verificación. */
  url?: string;
}

/** Celda del cajetín (recuadro de datos del inicio). */
export interface TitleCell {
  label: string;
  value: string;
}

export interface StackComponent {
  name: string;
  kind: string;
  /** Tecnologías de los proyectos que cuentan como uso de este componente. */
  matches: Tech[];
}

/** Todo el contenido del sitio en un idioma. */
export interface SiteContent {
  profile: Profile;
  titleBlock: TitleCell[];
  aboutFacts: AboutFact[];
  coreStack: StackComponent[];
  projects: Project[];
  lab: LabItem[];
  experience: ExperienceItem[];
  skills: SkillGroup[];
  certifications: Certification[];
}
