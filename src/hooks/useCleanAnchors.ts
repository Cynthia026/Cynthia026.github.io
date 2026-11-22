import { useEffect } from 'react';

/**
 * Los enlaces internos (href="#seccion") bajan a la sección sin agregar «#seccion» a la URL.
 * El foco pasa a la sección de destino para que el teclado y los lectores de pantalla la sigan.
 * Abrir una URL con #seccion sigue funcionando de forma normal.
 */
export function useCleanAnchors() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      const id = link?.getAttribute('href')?.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}
