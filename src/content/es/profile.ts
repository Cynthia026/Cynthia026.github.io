import type { Profile } from '@/types/content';

export const profile: Profile = {
  name: 'Cynthia Martínez García',
  role: 'Desarrolladora Frontend e IoT',
  headline:
    'Hago interfaces web que controlan cosas reales: 3D, realidad virtual, voz y gestos conectados a sistemas en la nube.',
  summary:
    'Estudio Ingeniería en Sistemas Computacionales en el Tecnológico Nacional de México, campus Pachuca. Trabajo sobre todo con JavaScript moderno y las APIs del navegador (Three.js, WebXR, voz, cámara y sensores del celular), consumo APIs REST y WebSockets, y publico en Vercel, GitHub Pages y AWS. Aquí está la evidencia de mis proyectos más completos: qué problema resolvían, qué decidí y qué resultó.',
  location: 'Pachuca, Hidalgo, México',
  email: 'cm2323263@gmail.com',
  phone: '+52 771 343 8834',
  availability: 'Disponible para prácticas profesionales y proyectos de frontend',
  // Archivo en public/cv.pdf. Reemplázalo cuando actualices tu CV.
  cvUrl: `${import.meta.env.BASE_URL}cv.pdf`,
  photo: 'foto.webp',
  links: [
    { label: 'GitHub', href: 'https://github.com/Cynthia026' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/cynthia-mart%C3%ADnez-garc%C3%ADa-gm26141',
      display: 'in/cynthia-martínez-garcía',
    },
  ],
};
