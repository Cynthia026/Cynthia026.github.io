# Portafolio de Cynthia Martínez García — Desarrollo Frontend

Sitio personal tipo currículum para mostrar proyectos destacados. Construido con **React 19, TypeScript, Vite y CSS Modules**, sin librerías de UI.

## Empezar

```bash
npm install
npm run dev        # servidor de desarrollo en http://localhost:5173
```

| Script            | Qué hace                                            |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo con recarga en caliente      |
| `npm run build`   | Verifica tipos y genera la versión final en `dist/` |
| `npm run preview` | Sirve `dist/` localmente                            |
| `npm run lint`    | ESLint (incluye reglas de accesibilidad jsx-a11y)   |
| `npm test`        | Pruebas con Vitest y Testing Library                |
| `npm run format`  | Formatea el código con Prettier                     |

## Personalizar tu contenido

Todo el texto vive en `src/content/`. **No necesitas tocar componentes** para actualizar el portafolio:

- `profile.ts` — nombre, rol, frase principal, correo, enlaces y CV.
- `projects.ts` — proyectos destacados (reto, solución, rol, stack, métricas, enlaces).
- `experience.ts` — trayectoria profesional y académica.
- `skills.ts` — habilidades agrupadas.

Los tipos en `src/types/content.ts` validan que no falte ningún campo.

- **Capturas de proyectos:** guárdalas en `public/projects/` y agrega `image: 'projects/archivo.webp'`. Sin imagen se muestra una portada con el nombre del proyecto.
- **Foto de perfil:** guárdala como `public/foto.webp` y agrega `photo: 'foto.webp'` en `profile.ts`. Sin foto se muestran tus iniciales.
- **CV:** coloca tu archivo como `public/cv.pdf`.
- **Título y descripción SEO:** edítalos en `index.html`.

## Arquitectura

```
src/
├── content/        Datos del sitio (única fuente de verdad del contenido)
├── types/          Modelos TypeScript del contenido
├── styles/         tokens.css (diseño), reset.css, global.css
├── lib/            Utilidades puras sin React
├── hooks/          useTheme, useCopyToClipboard
├── components/
│   ├── layout/     Header, Footer, Section, SkipLink
│   └── ui/         Button, Tag, ToggleButton, ContactList, iconos
├── features/
│   └── projects/   Módulo autocontenido: lista, filtro, tarjetas, lógica y tests
├── sections/       Secciones de la página (Hero, About, Projects, Lab, Experience, Skills, Contact)
├── App.tsx         Composición de la página
└── main.tsx        Punto de entrada
```

**Principios**

- **Separación contenido / presentación:** los componentes leen de `content/`, nunca tienen texto fijo del portafolio.
- **Lógica pura y testeable:** el filtrado de proyectos vive en `filterProjects.ts`, sin React, con pruebas unitarias.
- **Design tokens:** colores, tipografía fluida y espaciado se definen una vez en `tokens.css`; el modo oscuro solo cambia variables.
- **CSS Modules:** estilos con alcance local, sin colisiones de clases.
- **Accesibilidad:** HTML semántico, un solo `h1`, enlace para saltar al contenido, foco visible, `aria-pressed` en botones de estado, regiones `aria-live`, respeto a `prefers-reduced-motion` y `prefers-color-scheme`.
- **Rendimiento:** fuentes autoalojadas (sin peticiones a terceros), imágenes con `loading="lazy"`, sin dependencias de UI.

## Publicar en GitHub Pages

1. El repositorio debe llamarse `<usuario>.github.io` para que el sitio quede en `https://<usuario>.github.io/`. Con cualquier otro nombre queda en `https://<usuario>.github.io/<repositorio>/`; el workflow detecta la ruta solo.
2. En el repositorio: **Settings → Pages → Source: GitHub Actions**.
3. Cada `push` a `main` ejecuta lint, pruebas y build, y publica el sitio.

El workflow está en `.github/workflows/deploy.yml`. También funciona en Vercel o Netlify sin configuración (comando `npm run build`, carpeta `dist`).
