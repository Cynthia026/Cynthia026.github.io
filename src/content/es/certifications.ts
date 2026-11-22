import type { Certification } from '@/types/content';

/** Certificaciones y cursos, de lo más reciente a lo más antiguo. */
export const certifications: Certification[] = [
  {
    name: 'AWS Academy Graduate: Cloud Foundations (insignia)',
    issuer: 'Amazon Web Services Training and Certification',
    date: '2026-09-09',
    verifyUrl: 'https://www.credly.com/badges/9d302756-0158-4d11-b702-7578f1a13e56/public_url',
  },
  {
    name: 'Junior Cybersecurity Analyst Career Path',
    issuer:
      'Cisco Networking Academy. Incluye el curso Fundamentos de Ciberseguridad, impartido por el Instituto Tecnológico de Pachuca',
    date: '2026-01-29',
    url: 'certificados/cisco-fundamentos-ciberseguridad.pdf',
    verifyUrl: 'https://www.credly.com/badges/ec2b6cfe-99d2-42f2-8eca-d09453bbf311/public_url',
  },
  {
    name: 'Introducción a Cisco Packet Tracer',
    issuer: 'Cisco Networking Academy',
    date: '2025-09-07',
    url: 'certificados/cisco-introduccion-packet-tracer.pdf',
  },
  {
    name: 'Network Defense',
    issuer: 'Cisco Networking Academy',
    date: '2024-08-01',
    url: 'certificados/cisco-network-defense.pdf',
    verifyUrl: 'https://www.credly.com/badges/ff10be25-e59e-4f60-8a2b-f0484ed38817/public_url',
  },
  {
    name: 'Python Essentials 1',
    issuer: 'Cisco Networking Academy y OpenEDG Python Institute',
    date: '2024-07-22',
    url: 'certificados/cisco-python-essentials-1.pdf',
    verifyUrl: 'https://www.credly.com/badges/3ea8eff2-f56a-46c4-9ce7-96dfe7f792d2/public_url',
  },
  {
    name: 'Con Educación Financiera: Construye tu Futuro Financiero (MOOC)',
    issuer: 'TecNM y CONDUSEF',
    date: '2024-06-27',
    url: 'certificados/tecnm-educacion-financiera.pdf',
  },
  {
    name: 'Introduction to IoT',
    issuer: 'Cisco Networking Academy',
    date: '2022-02-23',
    url: 'certificados/cisco-introduction-to-iot.pdf',
    verifyUrl: 'https://www.credly.com/badges/7dc5e416-7fc2-4d92-82b6-1ca48c540703/public_url',
  },
];
