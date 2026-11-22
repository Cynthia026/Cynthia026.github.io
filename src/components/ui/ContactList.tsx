import { profile } from '@/content';
import { toTelHref } from '@/lib/contact';
import styles from './ContactList.module.css';

/** «https://github.com/usuario/» → «github.com/usuario». */
function shortUrl(href: string): string {
  return href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

/** Datos de contacto en una línea: correo, teléfono y perfiles. */
export function ContactList() {
  return (
    <address className={styles.address}>
      <ul role="list" className={styles.list}>
        <li>
          <span className={styles.label}>Correo</span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </li>
        {profile.phone && (
          <li>
            <span className={styles.label}>Teléfono</span>
            <a href={toTelHref(profile.phone)}>{profile.phone}</a>
          </li>
        )}
        {profile.links.map((link) => (
          <li key={link.href}>
            <span className={styles.label}>{link.label}</span>
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.display ?? shortUrl(link.href)}
              <span className="visually-hidden"> (abre en otra pestaña)</span>
            </a>
          </li>
        ))}
      </ul>
    </address>
  );
}
