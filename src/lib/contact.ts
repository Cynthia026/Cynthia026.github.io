/** Convierte un teléfono legible («+52 771 343 8834») en un enlace tel: válido. */
export function toTelHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}
