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

        'on-primary': 'var(--on-primary)',
        'on-secondary': 'var(--on-secondary)',
        'on-surface': 'var(--on-surface)',
        'on-surface-hover': 'var(--on-surface-hover)',
        'on-surface-variant': 'var(--on-surface-variant)',
        'on-surface-variant-hover': 'var(--on-surface-variant-hover)',
        error: 'var(--error)',
        'error-variant': 'var(--error-variant)',
        'on-error': 'var(--on-error)',
        'error-surface': 'var(--error-surface)',

        'around-surface': 'var(--around-surface)',
        'across-surface': 'var(--across-surface)',

        'dodger-blue-50': 'var(--dodger-blue-50)',
        'dodger-blue-100': 'var(--dodger-blue-100)',
        'dodger-blue-200': 'var(--dodger-blue-200)',
        'dodger-blue-300': 'var(--dodger-blue-300)',
        'dodger-blue-400': 'var(--dodger-blue-400)',
        'dodger-blue-500': 'var(--dodger-blue-500)',
        'dodger-blue-600': 'var(--dodger-blue-600)',
        'dodger-blue-700': 'var(--dodger-blue-700)',
        'dodger-blue-800': 'var(--dodger-blue-800)',
        'dodger-blue-900': 'var(--dodger-blue-900)',
        'dodger-blue-950': 'var(--dodger-blue-950)',
      },
    },
  },
  plugins: [],
} satisfies Config;
