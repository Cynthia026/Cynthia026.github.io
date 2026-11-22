import { buildMailto } from './mailto';

describe('buildMailto', () => {
  it('codifica asunto y cuerpo con %20 en lugar de +', () => {
    const href = buildMailto('a@b.com', 'Hola Cynthia', 'Línea 1\nLínea 2');
    expect(href.startsWith('mailto:a@b.com?subject=Hola%20Cynthia&body=')).toBe(true);
    expect(href).not.toContain('+');
    expect(decodeURIComponent(href.split('body=')[1] ?? '')).toBe('Línea 1\nLínea 2');
  });
});
