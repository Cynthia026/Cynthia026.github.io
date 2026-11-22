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

El sitio está en **español e inglés**. Todo el texto vive en `src/content/` y `src/i18n/`; no necesitas tocar componentes:

| Archivo               | Qué contiene                                                                                                                                        |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/content/es/*.ts` | Contenido en español: perfil, proyectos, laboratorio, trayectoria, habilidades y certificaciones. Las URLs, imágenes y tecnologías se definen aquí. |
| `src/content/en/*.ts` | Traducción al inglés. Toma URLs, imágenes y tecnologías del español y solo cambia el texto.                                                         |
| `src/i18n/ui.ts`      | Textos de la interfaz (botones, títulos de sección, etiquetas) en ambos idiomas.                                                                    |

Las pruebas (`npm test`) fallan si agregas un proyecto, práctica, etapa o certificación en español y olvidas traducirlo.

- **Idioma inicial:** `?lang=en` en la URL, luego la última elección guardada, luego el idioma del navegador. Comparte `https://<usuario>.github.io/?lang=en` con reclutadores que no hablan español.
- **Capturas de proyectos:** en `public/projects/`, con `image: 'projects/archivo.webp'`. Sin imagen se muestra una portada con el nombre.
- **Certificados:** PDFs en `public/certificados/`, listados en `src/content/es/certifications.ts`.
- **Foto de perfil:** `public/foto.webp` y `photo: 'foto.webp'` en `src/content/es/profile.ts`.
- **CV:** `public/cv.pdf`.

## Arquitectura

```
src/
├── content/        Contenido por idioma (es/, en/) con pruebas de paridad
├── i18n/           Idiomas: textos de interfaz, proveedor y hook useLanguage
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
