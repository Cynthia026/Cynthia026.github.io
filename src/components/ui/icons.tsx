/** Iconos SVG en línea: sin dependencias y heredan `currentColor`. */
const common = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const SunIcon = () => (
  <svg {...common}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const MoonIcon = () => (
  <svg {...common}>
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
  </svg>
);

export const ExternalIcon = () => (
  <svg {...common} width={14} height={14}>
    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </svg>
);

export const MailIcon = () => (
  <svg {...common} width={16} height={16}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const PhoneIcon = () => (
  <svg {...common} width={16} height={16}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </svg>
);

export const CodeIcon = () => (
  <svg {...common} width={16} height={16}>
    <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
  </svg>
);

export const ProfileIcon = () => (
  <svg {...common} width={16} height={16}>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <circle cx="12" cy="10" r="3" />
    <path d="M7 18a5 5 0 0 1 10 0" />
  </svg>
);

export const DownloadIcon = () => (
  <svg {...common} width={16} height={16}>
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </svg>
);

export const ChevronIcon = () => (
  <svg {...common} width={14} height={14}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
