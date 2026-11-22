import type { ReactNode } from 'react';
import { profile } from '@/content';
import { Section } from '@/components/layout/Section';
import { CodeIcon, DownloadIcon, MailIcon, PhoneIcon, ProfileIcon } from '@/components/ui/icons';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { toTelHref } from '@/lib/contact';
import { ContactForm } from './ContactForm';
import styles from './Contact.module.css';

interface MethodProps {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  download?: boolean;
}

function Method({ icon, label, value, href, external, download }: MethodProps) {
  return (
    <a
      className={styles.method}
      href={href}
      download={download || undefined}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className={styles.methodIcon} aria-hidden="true">
        {icon}
      </span>
      <span className={styles.methodText}>
        <span className={styles.methodLabel}>{label}</span>
        <span className={styles.methodValue}>{value}</span>
      </span>
      {external && <span className="visually-hidden"> (abre en otra pestaña)</span>}
    </a>
  );
}

const LINK_ICONS: Record<string, ReactNode> = {
  GitHub: <CodeIcon />,
  LinkedIn: <ProfileIcon />,
};

export function Contact() {
  const { copied, copy } = useCopyToClipboard();

  return (
    <Section
      id="contacto"
      title="Contacto"
      intro="Si buscas a alguien para tu equipo de frontend o tienes un proyecto en mente, escríbeme."
    >
      <div className={styles.grid}>
        <div className={styles.methods}>
          <div className={styles.emailRow}>
            <Method
              icon={<MailIcon />}
              label="Correo"
              value={profile.email}
              href={`mailto:${profile.email}`}
            />
            <button type="button" className={styles.copy} onClick={() => copy(profile.email)}>
              {copied ? 'Copiado' : 'Copiar'}
            </button>
            <span role="status" className="visually-hidden">
              {copied ? 'Correo copiado al portapapeles' : ''}
            </span>
          </div>
          {profile.phone && (
            <Method
              icon={<PhoneIcon />}
              label="Teléfono"
              value={profile.phone}
              href={toTelHref(profile.phone)}
            />
          )}
          {profile.links.map((link) => (
            <Method
              key={link.href}
              icon={LINK_ICONS[link.label]}
              label={link.label}
              value={link.display ?? link.href.replace(/^https?:\/\/(www\.)?/, '')}
              href={link.href}
              external
            />
          ))}
          {profile.cvUrl && (
            <Method
              icon={<DownloadIcon />}
              label="Currículum"
              value="Descargar en PDF"
              href={profile.cvUrl}
              download
            />
          )}
        </div>

        <ContactForm />
      </div>
    </Section>
  );
}
