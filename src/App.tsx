import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { SkipLink } from '@/components/layout/SkipLink';
import { GridOverlay } from '@/components/ui/GridOverlay';
import { useInspectMode } from '@/hooks/useInspectMode';
import { useTheme } from '@/hooks/useTheme';
import { Contact } from '@/sections/Contact';
import { Experience } from '@/sections/Experience';
import { Hero } from '@/sections/Hero';
import { Lab } from '@/sections/Lab';
import { Projects } from '@/sections/Projects';
import { Skills } from '@/sections/Skills';

export function App() {
  const { theme, toggleTheme } = useTheme();
  const { isInspecting, toggleInspect } = useInspectMode();

  return (
    <>
      <SkipLink />
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        isInspecting={isInspecting}
        onToggleInspect={toggleInspect}
      />
      <main id="contenido">
        <Hero />
        <Projects />
        <Lab />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <GridOverlay visible={isInspecting} />
    </>
  );
}
