import { useCallback, useEffect, useState } from 'react';
import { readStorage, writeStorage } from '@/lib/storage';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const query = '(prefers-color-scheme: dark)';

function getInitialTheme(): Theme {
  const stored = readStorage(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia(query).matches ? 'dark' : 'light';
}

/** Tema claro/oscuro con persistencia y respeto a la preferencia del sistema. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      writeStorage(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
