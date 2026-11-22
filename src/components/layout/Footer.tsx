import { profile } from '@/content';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p>
          © {year} {profile.name}
        </p>
        <p>Hecho con React, TypeScript y CSS Modules.</p>
      </div>
    </footer>
  );
}
