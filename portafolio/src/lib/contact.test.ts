import { toTelHref } from './contact';

describe('toTelHref', () => {
  it('quita espacios, guiones y paréntesis', () => {
    expect(toTelHref('(+52) 771-343 8834')).toBe('tel:+527713438834');
  });
});
