import { fireEvent, render, screen, within } from '@testing-library/react';
import { App } from './App';
import { content } from '@/content';

beforeAll(() => {
  window.matchMedia ??= ((query: string) => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia;
});

beforeEach(() => {
  // jsdom reporta el navegador en inglés; las pruebas parten del español salvo que digan otra cosa.
  window.localStorage.setItem('lang', 'es');
  window.history.replaceState(null, '', '/');
});

describe('App', () => {
  it('despliega los detalles de un proyecto', () => {
    render(<App />);
    const [toggle] = screen.getAllByRole('button', { name: /ver detalles/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(toggle!);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(toggle).toHaveTextContent(/ocultar detalles/i);
  });

  it('muestra un único h1 con el nombre', () => {
    render(<App />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('filtra proyectos por tecnología', () => {
    render(<App />);
    const group = screen.getByRole('group', { name: /filtrar proyectos/i });
    fireEvent.click(within(group).getByRole('button', { name: 'Node.js' }));
    const expected = content.es.projects.filter((p) => p.stack.includes('Node.js')).length;
    const section = screen.getByRole('region', { name: /proyectos destacados/i });
    expect(within(section).getAllByRole('article')).toHaveLength(expected);
  });

  it('muestra las certificaciones con su enlace', () => {
    render(<App />);
    expect(screen.getByRole('rowheader', { name: /network defense/i })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /ver certificado/i }).length).toBeGreaterThan(0);
  });
});

describe('Enlaces internos', () => {
  it('bajan a la sección sin agregar #seccion a la URL', () => {
    render(<App />);
    Element.prototype.scrollIntoView = vi.fn();
    fireEvent.click(screen.getByRole('link', { name: /contacto/i }));
    expect(window.location.hash).toBe('');
    expect(document.getElementById('contacto')).toHaveFocus();
  });
});

describe('Idioma', () => {
  it('cambia a inglés y lo refleja en la URL y en <html lang>', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'English' }));
    expect(screen.getByRole('region', { name: /featured projects/i })).toBeInTheDocument();
    expect(document.documentElement.lang).toBe('en');
    expect(window.location.search).toBe('?lang=en');
    expect(screen.getByRole('button', { name: 'English' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('abre en inglés con ?lang=en aunque se haya guardado español', () => {
    window.history.replaceState(null, '', '/?lang=en');
    render(<App />);
    expect(screen.getAllByRole('button', { name: /show details/i }).length).toBeGreaterThan(0);
  });
});
