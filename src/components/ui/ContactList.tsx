import type { ReactNode } from 'react';
import { profile } from '@/content';
import { toTelHref } from '@/lib/contact';
import { CodeIcon, MailIcon, PhoneIcon, ProfileIcon } from './icons';
import styles from './ContactList.module.css';

/** «https://github.com/usuario/» → «github.com/usuario». */
function shortUrl(href: string): string {
  return href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

const LINK_ICONS: Record<string, ReactNode> = {
  GitHub: <CodeIcon />,
  LinkedIn: <ProfileIcon />,
};

/** Datos de contacto en una línea: correo, teléfono y perfiles. */
export function ContactList() {
  return (
    <address className={styles.address}>
      <ul role="list" className={styles.list}>
        <li>
          <a href={`mailto:${profile.email}`} className={styles.item}>
            <MailIcon />
            <span className="visually-hidden">Correo: </span>
            {profile.email}
          </a>
        </li>
        {profile.phone && (
          <li>
            <a href={toTelHref(profile.phone)} className={styles.item}>
              <PhoneIcon />
              <span className="visually-hidden">Teléfono: </span>
              {profile.phone}
            </a>
          </li>
        )}
        {profile.links.map((link) => (
          <li key={link.href}>
            <a href={link.href} target="_blank" rel="noopener noreferrer" className={styles.item}>
              {LINK_ICONS[link.label]}
              <span className="visually-hidden">{link.label}: </span>
              {link.display ?? shortUrl(link.href)}
              <span className="visually-hidden"> (abre en otra pestaña)</span>
            </a>
          </li>
        ))}
      </ul>
    </address>
  );
}
