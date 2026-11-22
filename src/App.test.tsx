import { fireEvent, render, screen, within } from '@testing-library/react';
import { App } from './App';
import { projects } from '@/content';

beforeAll(() => {
  window.matchMedia ??= ((query: string) => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia;
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
    const expected = projects.filter((p) => p.stack.includes('Node.js')).length;
    const section = screen.getByRole('region', { name: 'Proyectos destacados' });
    expect(within(section).getAllByRole('article')).toHaveLength(expected);
  });
});
