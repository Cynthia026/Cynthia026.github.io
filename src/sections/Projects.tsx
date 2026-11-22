import { Section } from '@/components/layout/Section';
import { ProjectList } from '@/features/projects';
import { useLanguage } from '@/i18n/useLanguage';

export function Projects() {
  const { c, t } = useLanguage();
  return (
    <Section id="proyectos" number={2} title={t.projects.title} intro={t.projects.intro}>
      <ProjectList projects={c.projects} />
    </Section>
  );
}
