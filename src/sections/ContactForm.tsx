import { useState, type FormEvent } from 'react';
import { useLanguage } from '@/i18n/useLanguage';
import { buildMailto } from '@/lib/mailto';
import { Icon } from '@/components/ui/Icon';
import styles from './Contact.module.css';

const LIMITS = { name: [1, 80], message: [10, 2000] } as const;

/**
 * Formulario sin servidor: prepara el correo y lo abre en la aplicación de correo de quien escribe.
 * Así funciona en GitHub Pages sin exponer credenciales ni depender de servicios externos.
 */
export function ContactForm() {
  const { c, t } = useLanguage();
  const profile = c.profile;
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    if (trimmedName.length < LIMITS.name[0]) {
      setError(t.contact.errorName);
      return;
    }
    if (trimmedMessage.length < LIMITS.message[0]) {
      setError(t.contact.errorMessage);
      return;
    }
    setError(null);
    window.location.href = buildMailto(
      profile.email,
      t.contact.subject(trimmedName),
      `${trimmedMessage}\n\n${trimmedName}`,
    );
  };

  return (
    <form className={`card ${styles.form}`} onSubmit={onSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="contact-name">{t.contact.name}</label>
        <input
          id="contact-name"
          name="name"
          autoComplete="name"
          maxLength={LIMITS.name[1]}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="contact-message">{t.contact.message}</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          maxLength={LIMITS.message[1]}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-describedby="contact-count"
        />
        <span id="contact-count" className={styles.count}>
          {message.length} / {LIMITS.message[1]}
        </span>
      </div>
      <p role="alert" className={styles.error}>
        {error}
      </p>
      <button type="submit" className={styles.submit}>
        <Icon name="send" size={16} />
        {t.contact.submit}
      </button>
      <p className={styles.note}>{t.contact.note(profile.email)}</p>
    </form>
  );
}
