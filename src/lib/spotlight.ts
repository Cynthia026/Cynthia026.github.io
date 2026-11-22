import type { PointerEvent } from 'react';

/**
 * Guarda la posición del cursor en variables CSS (--mx, --my) para el foco de luz
 * de la clase global `.spotlight`. Sin estado de React: no provoca renderizados.
 */
export function trackSpotlight(event: PointerEvent<HTMLElement>) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
  el.style.setProperty('--my', `${event.clientY - rect.top}px`);
}
