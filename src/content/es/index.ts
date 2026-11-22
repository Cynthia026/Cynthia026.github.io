import type { SiteContent } from '@/types/content';
import { aboutFacts, coreStack } from './about';
import { certifications } from './certifications';
import { experience } from './experience';
import { lab } from './lab';
import { profile } from './profile';
import { projects } from './projects';
import { skills } from './skills';

export const es: SiteContent = {
  profile,
  titleBlock: [
    { label: 'Autora', value: profile.name },
    { label: 'Especialidad', value: 'Frontend e IoT' },
    { label: 'Formación', value: 'Ing. en Sistemas Computacionales, TecNM Pachuca' },
    { label: 'Ubicación', value: 'Pachuca, Hidalgo' },
    { label: 'Estado', value: 'Disponible para prácticas' },
  ],
  aboutFacts,
  coreStack,
  projects,
  lab,
  experience,
  skills,
  certifications,
};
