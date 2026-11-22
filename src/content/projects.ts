import type { Project } from '@/types/content';

const GH = 'https://github.com/Cynthia026';

/**
 * Proyectos destacados, del más relevante al menos relevante.
 * Para agregar uno, copia un objeto y cambia sus campos; la interfaz se actualiza sola.
 */
export const projects: Project[] = [
  {
    slug: 'vehiculo-iot',
    title: 'Vehículo IoT: gemelo digital 3D, realidad virtual y control por voz y gestos',
    year: 2026,
    context: 'Proyecto integrador, prácticas 4.1 a 4.3',
    role: 'Desarrollo completo: interfaz, API y base de datos',
    summary:
      'Aplicación web para manejar y monitorear en tiempo real una excavadora IoT desde la computadora, el celular o unos lentes de realidad virtual.',
    problem:
      'Controlar un vehículo físico a distancia de forma segura: que cada tipo de usuario vea solo lo suyo, que la orden de detener siempre gane y que funcione igual en escritorio, celular y VR.',
    solution:
      'Construí una SPA instalable (PWA) en JavaScript modular con un gemelo digital de la excavadora en Three.js y modo VR con WebXR. Agregué control por voz, por gestos de la mano con MediaPipe (procesados en el navegador) y por giroscopio del celular, y un asistente con IA que convierte frases como «haz un cuadrado» en planes de movimiento validados antes de ejecutarse. El backend es una API en FastAPI sobre AWS EC2, con WebSockets, JWT, control por roles y protección para que un cliente no pueda mover el vehículo de otro.',
    stack: [
      'JavaScript',
      'Three.js',
      'WebXR',
      'MediaPipe',
      'PWA',
      'WebSockets',
      'IA',
      'Python',
      'FastAPI',
      'MySQL',
      'AWS',
    ],
    metrics: [
      { value: '4', label: 'formas de control' },
      { value: '21', label: 'procedimientos almacenados' },
      { value: '3', label: 'roles de usuario' },
    ],
    image: 'projects/vehiculo-iot.webp',
    demoUrl: 'https://cynthia026.github.io/vehiculo-iot-vr/',
    repoUrl: `${GH}/vehiculo-iot-vr-ia`,
    related: [
      { label: 'API (FastAPI)', href: `${GH}/api-vehiculo-iot` },
      { label: 'Versión con administración', href: `${GH}/vehiculo-iot-frontend` },
    ],
  },
  {
    slug: 'neurolearn-kids',
    title: 'NeuroLearn Kids: plataforma educativa para niños',
    year: 2026,
    context: 'Proyecto académico',
    role: 'Diseño y desarrollo frontend',
    summary:
      'Plataforma para practicar matemáticas y español con juegos, con paneles distintos para alumnos, docentes y padres.',
    problem:
      'Cada niño llega con un nivel distinto, y docentes y padres necesitan ver su avance sin revisar ejercicio por ejercicio.',
    solution:
      'Diseñé un flujo que detecta el primer inicio de sesión y aplica una evaluación diagnóstica de 12 preguntas antes de mostrar el panel. Construí cinco juegos educativos, inicio de sesión con Google y Facebook, un sistema de diseño propio con temas y paneles de progreso por rol. El backend usa Node.js con Express, Prisma y JWT, y el sitio está publicado en Vercel.',
    stack: ['JavaScript', 'HTML', 'CSS', 'Node.js', 'Vercel'],
    metrics: [
      { value: '5', label: 'juegos educativos' },
      { value: '3', label: 'paneles por rol' },
    ],
    repoUrl: `${GH}/neurolearn-frontend`,
    related: [{ label: 'Backend (Express y Prisma)', href: `${GH}/neurolearn-backend` }],
  },
  {
    slug: 'siaa',
    title: 'SIAA: sistema de control de asistencias académicas',
    year: 2026,
    context: 'Proyecto académico',
    role: 'Desarrollo full stack',
    summary:
      'Sistema web para registrar y consultar la asistencia de alumnos, con vistas distintas para alumnos, docentes y administradores.',
    problem:
      'Pasar lista en papel es lento y no permite consultar después cuántas faltas lleva un alumno por materia.',
    solution:
      'Hice una interfaz responsiva con una pantalla por tarea (registrar asistencia, reportes, edición de usuarios y materias) y la conecté a una API REST en Spring Boot con Spring Security y JWT, servicios por dominio y manejo de errores centralizado. El frontend se publica automáticamente en Vercel con cada cambio en GitHub.',
    stack: ['JavaScript', 'HTML', 'CSS', 'Java', 'Spring Boot', 'Vercel'],
    metrics: [
      { value: '3', label: 'roles de usuario' },
      { value: '8', label: 'controladores REST' },
    ],
    image: 'projects/siaa.webp',
    demoUrl: 'https://siaa-fronted.vercel.app',
    repoUrl: `${GH}/SIAA-frontend`,
    related: [{ label: 'Backend (Spring Boot)', href: `${GH}/SIAA-backend` }],
  },
  {
    slug: 'smartcampus',
    title: 'SmartCampus: panel de servicios del campus',
    year: 2026,
    context: 'Proyecto académico',
    role: 'Desarrollo completo',
    summary:
      'Panel que muestra la ocupación de la biblioteca, reportes de baños y mapas de enchufes y cobertura WiFi del campus.',
    problem:
      'Los estudiantes pierden tiempo buscando lugar en la biblioteca, un enchufe libre o una zona con buena señal.',
    solution:
      'Diseñé un semáforo de ocupación con desglose por piso y gráfica del día, mapas SVG interactivos para enchufes y WiFi, y un sistema de reportes con votos y estados (pendiente, en proceso, resuelto). Los datos vienen de una API propia en Node.js y se actualizan periódicamente.',
    stack: ['JavaScript', 'SVG', 'Chart.js', 'Node.js'],
    metrics: [{ value: '4', label: 'módulos de servicio' }],
    repoUrl: `${GH}/SmartCampus`,
  },
  {
    slug: 'catalogo-musica',
    title: 'Catálogo de música',
    year: 2026,
    context: 'Práctica de consumo de APIs',
    role: 'Desarrollo frontend',
    summary:
      'Buscador de artistas, personas, álbumes y canciones que combina dos APIs en una sola interfaz.',
    problem: 'Consultar dos APIs distintas sin que la persona note que son servicios separados.',
    solution:
      'Separé el código en módulos de datos, renderizado y orquestación. Agregué filtros por género y año, cambio entre artistas y música, y mensajes claros cuando una petición falla. Está publicado en Vercel, que redirige las peticiones a las APIs en AWS.',
    stack: ['JavaScript', 'CSS', 'Vercel', 'AWS'],
    repoUrl: `${GH}/Esc-Red-Api-Front-Vercel-AWS`,
  },
  {
    slug: 'gold-fish',
    title: 'Gold Fish: videojuego web 2D',
    year: 2025,
    context: 'Materia: Graficación',
    role: 'Desarrollo en equipo',
    team: 'Maricarmen Suárez Olivares',
    summary:
      'Juego en el navegador donde un pez recoge monedas y esquiva tiburones mientras sube la dificultad.',
    problem: 'Construir un juego completo con la API de Canvas, sin motores ni librerías externas.',
    solution:
      'Programamos el bucle principal del juego, la detección de colisiones 2D, niveles de dificultad progresivos, los estados de juego (jugando y derrota) y el marcador, con música y efectos de sonido.',
    stack: ['JavaScript', 'Canvas', 'CSS'],
    metrics: [{ value: '0', label: 'librerías externas' }],
    image: 'projects/gold-fish.webp',
    demoUrl: 'https://cynthia026.github.io/videojuego2d/',
    repoUrl: `${GH}/videojuego2d`,
  },
];
