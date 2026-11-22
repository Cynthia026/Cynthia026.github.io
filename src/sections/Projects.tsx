import { projects } from '@/content';
import { Section } from '@/components/layout/Section';
import { ProjectList } from '@/features/projects';

export function Projects() {
  return (
    <Section
      id="proyectos"
      title="Proyectos destacados"
      intro="Cada proyecto muestra el reto de origen, las decisiones que tomé y el resultado. Filtra por tecnología para ver dónde la he aplicado."
    >
      <ProjectList projects={projects} />
    </Section>
  );
}
