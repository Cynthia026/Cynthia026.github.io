import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { SkipLink } from '@/components/layout/SkipLink';
import { useTheme } from '@/hooks/useTheme';
import { Contact } from '@/sections/Contact';
import { Experience } from '@/sections/Experience';
import { Hero } from '@/sections/Hero';
import { Lab } from '@/sections/Lab';
import { Projects } from '@/sections/Projects';
import { Skills } from '@/sections/Skills';

export function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <SkipLink />
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main id="contenido">
        <Hero />
        <Projects />
        <Lab />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
