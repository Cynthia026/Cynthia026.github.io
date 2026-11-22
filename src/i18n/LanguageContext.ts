import { createContext } from 'react';
import type { SiteContent } from '@/types/content';
import type { Locale } from './locales';
import type { UiStrings } from './ui';

export interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Contenido del sitio en el idioma actual. */
  c: SiteContent;
  /** Textos de la interfaz en el idioma actual. */
  t: UiStrings;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);
