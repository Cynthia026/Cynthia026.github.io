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
    { icon: 'user', label: 'Autora', value: profile.name },
    { icon: 'cpu', label: 'Especialidad', value: 'Frontend e IoT' },
    {
      icon: 'graduation',
      label: 'Formación',
      value: 'Ing. en Sistemas Computacionales, TecNM Pachuca',
    },
    { icon: 'mapPin', label: 'Ubicación', value: 'Pachuca, Hidalgo' },
    { icon: 'circleCheck', label: 'Estado', value: 'Disponible para prácticas' },
  ],
  aboutFacts,
  coreStack,
  projects,
  lab,
  experience,
  skills,
  certifications,
};
