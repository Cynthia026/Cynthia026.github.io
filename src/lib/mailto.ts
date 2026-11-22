/** Construye un enlace mailto: con asunto y cuerpo codificados. */
export function buildMailto(to: string, subject: string, body: string): string {
  const params = new URLSearchParams({ subject, body });
  // URLSearchParams codifica espacios como «+», que algunos clientes de correo muestran literal.
  return `mailto:${to}?${params.toString().replace(/\+/g, '%20')}`;
}
