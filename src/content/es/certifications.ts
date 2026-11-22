import type { Certification } from '@/types/content';

/** Certificaciones y cursos, de lo más reciente a lo más antiguo. */
export const certifications: Certification[] = [
  {
    name: 'Network Defense',
    issuer: 'Cisco Networking Academy',
    date: '2024-08-01',
    url: 'certificados/cisco-network-defense.pdf',
  },
  {
    name: 'Python Essentials 1',
    issuer: 'Cisco Networking Academy y OpenEDG Python Institute',
    date: '2024-07-22',
    url: 'certificados/cisco-python-essentials-1.pdf',
  },
  {
    name: 'Con Educación Financiera: Construye tu Futuro Financiero (MOOC)',
    issuer: 'TecNM y CONDUSEF',
    date: '2024-06-27',
    url: 'certificados/tecnm-educacion-financiera.pdf',
  },
  {
    name: 'Cloud Foundations (insignia)',
    issuer: 'AWS Educate',
  },
];
