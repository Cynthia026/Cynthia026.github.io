import type { Locale } from '@/i18n/locales';
import type { SiteContent } from '@/types/content';
import { en } from './en';
import { es } from './es';

/** Contenido del sitio por idioma. */
export const content: Record<Locale, SiteContent> = { es, en };
