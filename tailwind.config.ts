import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
    colors: {
      'text-color': 'var(--text-color)',
      'text-color-muted': 'var(--text-color-muted)',
      'text-color-muted-extra': 'var(--text-color-muted-extra)',
      'border-color': 'var(--border-color)',
      'border-color-subtle': 'var(--border-color-subtle)',
      'app-background-color': 'var(--app-background-color)',
      'card-background-color': 'var(--card-background-color)',
      'card-border-color': 'var(--card-border-color)',
      'button-primary-color': 'var(--primary-button-color)',
      'button-primary-text-color': 'var(--primary-button-text-color)',
      'button-secondary-color': 'var(--secondary-button-color)',
      'logo-text-color': 'var(--logo-text-color)',
      'logo-background-color': 'var(--logo-background-color)',
      'input-text-color': 'var(--input-text-color)',
      'input-background-color': 'var(--input-background-color)',
      'input-border-color': 'var(--input-border-color)',
    },
  },
  plugins: [],
} satisfies Config;
