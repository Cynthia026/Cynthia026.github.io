import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { content } from '@/content';
import { readStorage, writeStorage } from '@/lib/storage';
import { isLocale, type Locale } from './locales';
import { LanguageContext } from './LanguageContext';
import { ui } from './ui';

const STORAGE_KEY = 'lang';
const PARAM = 'lang';

/** Orden de prioridad: ?lang= en la URL, elección guardada, idioma del navegador, español. */
function getInitialLocale(): Locale {
  const fromUrl = new URLSearchParams(window.location.search).get(PARAM);
  if (isLocale(fromUrl)) return fromUrl;
  const stored = readStorage(STORAGE_KEY);
  if (isLocale(stored)) return stored;
  return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    writeStorage(STORAGE_KEY, next);
    // Refleja el idioma en la URL para poder compartir el enlace en inglés.
    const url = new URL(window.location.href);
    if (next === 'es') url.searchParams.delete(PARAM);
    else url.searchParams.set(PARAM, next);
    window.history.replaceState(null, '', url);
  }, []);

  const t = ui[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
  }, [locale, t]);

  const value = useMemo(
    () => ({ locale, setLocale, c: content[locale], t }),
    [locale, setLocale, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
