/** Ruta a un archivo de /public que respeta el `base` de Vite (GitHub Pages en subcarpeta). */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}
