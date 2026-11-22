import { useCallback, useState, type PointerEvent } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

let nextId = 0;

/**
 * Onda que nace en el punto exacto del clic, como una señal que se propaga.
 * El elemento contenedor necesita `position: relative` y `overflow: hidden`.
 */
export function useRipple(className: string) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const onPointerDown = useCallback((event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const ripple = {
      id: nextId++,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      size,
    };
    setRipples((list) => [...list, ripple]);
  }, []);

  const ripplesElement = ripples.map((r) => (
    <span
      key={r.id}
      className={className}
      aria-hidden="true"
      style={{ left: r.x - r.size / 2, top: r.y - r.size / 2, width: r.size, height: r.size }}
      onAnimationEnd={() => setRipples((list) => list.filter((item) => item.id !== r.id))}
    />
  ));

  return { onPointerDown, ripples: ripplesElement };
}
