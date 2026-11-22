import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { useRipple } from '@/hooks/useRipple';
import { trackSpotlight } from '@/lib/spotlight';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'ghost';

interface CommonProps {
  variant?: Variant;
  size?: 'default' | 'small';
  children: ReactNode;
}

type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type NativeButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

/** Un botón que se renderiza como <a> si recibe `href` y como <button> en otro caso. */
export function Button(props: LinkProps | NativeButtonProps) {
  const { variant = 'primary', size = 'default', className, children, ...rest } = props;
  const { onPointerDown, ripples } = useRipple(styles.ripple ?? '');
  const classes = [
    'spotlight',
    styles.button,
    styles[variant],
    size === 'small' && styles.small,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <span className={styles.label}>{children}</span>
      {ripples}
    </>
  );

  if ('href' in rest && rest.href !== undefined) {
    const isExternal = /^https?:\/\//.test(rest.href);
    return (
      <a
        className={classes}
        onPointerDown={onPointerDown}
        onPointerMove={trackSpotlight}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onPointerDown={onPointerDown}
      onPointerMove={trackSpotlight}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
