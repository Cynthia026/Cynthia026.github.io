import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary';

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
}

type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type NativeButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

/** Un botón que se renderiza como <a> si recibe `href` y como <button> en otro caso. */
export function Button(props: LinkProps | NativeButtonProps) {
  const { variant = 'primary', className, children, ...rest } = props;
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(' ');

  if ('href' in rest && rest.href !== undefined) {
    const isExternal = /^https?:\/\//.test(rest.href);
    return (
      <a
        className={classes}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
