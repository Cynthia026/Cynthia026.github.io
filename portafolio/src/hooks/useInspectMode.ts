import { useEffect, useState } from 'react';

/**
 * Activa el "modo inspección": revela la retícula y el árbol de componentes.
 * Atajo de teclado: tecla «i» (fuera de campos de texto).
 */
export function useInspectMode() {
  const [isInspecting, setIsInspecting] = useState(false);

  useEffect(() => {
    document.documentElement.toggleAttribute('data-inspect', isInspecting);
  }, [isInspecting]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        target instanceof Element &&
        target.closest('input, textarea, select, [contenteditable]')
      ) {
        return;
      }
      if (event.key.toLowerCase() === 'i' && !event.metaKey && !event.ctrlKey && !event.altKey) {
        setIsInspecting((v) => !v);
      }
      if (event.key === 'Escape') setIsInspecting(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return { isInspecting, toggleInspect: () => setIsInspecting((v) => !v) };
}
