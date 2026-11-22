import { useState, type FormEvent } from 'react';
import { profile } from '@/content';
import { buildMailto } from '@/lib/mailto';
import styles from './Contact.module.css';

const LIMITS = { name: [1, 80], message: [10, 2000] } as const;

/**
 * Formulario sin servidor: prepara el correo y lo abre en la aplicación de correo de quien escribe.
 * Así funciona en GitHub Pages sin exponer credenciales ni depender de servicios externos.
 */
export function ContactForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    if (trimmedName.length < LIMITS.name[0]) {
      setError('Escribe tu nombre para saber a quién responder.');
      return;
    }
    if (trimmedMessage.length < LIMITS.message[0]) {
      setError('El mensaje debe tener al menos 10 caracteres.');
      return;
    }
    setError(null);
    window.location.href = buildMailto(
      profile.email,
      `Contacto desde tu portafolio: ${trimmedName}`,
      `${trimmedMessage}\n\n${trimmedName}`,
    );
  };

  return (
    <form className={`card ${styles.form}`} onSubmit={onSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="contact-name">Nombre</label>
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
        <label htmlFor="contact-message">Mensaje</label>
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
        Abrir en mi correo
      </button>
      <p className={styles.note}>
        Se abrirá tu aplicación de correo con el mensaje listo para enviar a {profile.email}.
      </p>
    </form>
  );
}
