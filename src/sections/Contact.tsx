import type { ReactNode } from 'react';
import { Section } from '@/components/layout/Section';
import { CodeIcon, DownloadIcon, MailIcon, PhoneIcon, ProfileIcon } from '@/components/ui/icons';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { useLanguage } from '@/i18n/useLanguage';
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
  newTabLabel?: string;
}

function Method({ icon, label, value, href, external, download, newTabLabel }: MethodProps) {
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
      {external && <span className="visually-hidden"> {newTabLabel}</span>}
    </a>
  );
}

const LINK_ICONS: Record<string, ReactNode> = {
  GitHub: <CodeIcon />,
  LinkedIn: <ProfileIcon />,
};

export function Contact() {
  const { c, t } = useLanguage();
  const profile = c.profile;
  const { copied, copy } = useCopyToClipboard();

  return (
    <Section id="contacto" number={6} title={t.contact.title} intro={t.contact.intro}>
      <div className={styles.grid}>
        <div className={styles.methods}>
          <div className={styles.emailRow}>
            <Method
              icon={<MailIcon />}
              label={t.contactLabels.email}
              value={profile.email}
              href={`mailto:${profile.email}`}
            />
            <button type="button" className={styles.copy} onClick={() => copy(profile.email)}>
              {copied ? t.contact.copied : t.contact.copy}
            </button>
            <span role="status" className="visually-hidden">
              {copied ? t.contact.copiedStatus : ''}
            </span>
          </div>
          {profile.phone && (
            <Method
              icon={<PhoneIcon />}
              label={t.contactLabels.phone}
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
              newTabLabel={t.a11y.newTab}
            />
          ))}
          {profile.cvUrl && (
            <Method
              icon={<DownloadIcon />}
              label={t.contact.cv}
              value={t.contact.cvValue}
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
