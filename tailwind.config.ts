import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-variant': 'var(--primary-variant)',
        secondary: 'var(--secondary)',

        background: 'var(--background)',
        surface: 'var(--surface)',
        error: 'var(--error)',

        'on-primary': 'var(--on-primary)',
        'on-secondary': 'var(--on-secondary)',
        'on-surface': 'var(--on-surface)',
        'on-surface-hover': 'var(--on-surface-hover)',
        'on-surface-variant': 'var(--on-surface-variant)',
        'on-error': 'var(--on-error)',

        'around-surface': 'var(--around-surface)',
      },
    },
  },
  plugins: [],
} satisfies Config;
