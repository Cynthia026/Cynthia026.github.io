import { profile } from '@/content';
import { Section } from '@/components/layout/Section';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { toTelHref } from '@/lib/contact';
import styles from './Contact.module.css';

export function Contact() {
  const { copied, copy } = useCopyToClipboard();

  return (
    <Section
      id="contacto"
      component="Contact"
      title="Contacto"
      intro="Si buscas a alguien para tu equipo de frontend o tienes un proyecto en mente, escríbeme."
    >
      <div className={styles.wrap}>
        <a className={styles.email} href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        {profile.phone && (
          <a className={styles.phone} href={toTelHref(profile.phone)}>
            {profile.phone}
          </a>
        )}
        <div className={styles.row}>
          <button type="button" className={styles.copy} onClick={() => copy(profile.email)}>
            {copied ? 'Correo copiado' : 'Copiar correo'}
          </button>
          <span role="status" className="visually-hidden">
            {copied ? 'Correo copiado al portapapeles' : ''}
          </span>
          <ul role="list" className={styles.links}>
            {profile.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
