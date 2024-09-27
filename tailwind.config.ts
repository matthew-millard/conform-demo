import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-color': 'var(--primary-color)',
        'text-color': 'var(--text-color)',
        'text-color-muted': 'var(--text-color-muted)',
        'text-color-muted-extra': 'var(--text-color-muted-extra)',
        'border-color': 'var(--border-color)',
        'border-color-subtle': 'var(--border-color-subtle)',
        'app-background-color': 'var(--app-background-color)',
        'header-background-color': 'var(--header-background-color)',
        'card-background-color': 'var(--card-background-color)',
        'card-border-color': 'var(--card-border-color)',

        'checkbox-background-color': 'var(--checkbox-background-color)',
        'checkbox-border-color': 'var(--checkbox-border-color)',

        'button-primary-color': 'var(--primary-button-color)',
        'button-primary-text-color': 'var(--primary-button-text-color)',
        'button-primary-color-hover': 'var(--primary-button-color-hover)',
        'button-primary-color-active': 'var(--primary-button-color-active)',
        'button-primary-color-disabled': 'var(--primary-button-color-disabled)',
        'button-primary-text-color-disabled': 'var(--primary-button-text-color-disabled)',
        'button-secondary-color': 'var(--secondary-button-color)',
        'popover-button-icon-color': 'var(--popover-button-icon-color)',
        'popover-button-background-color': 'var(--popover-button-background-color)',
        'popover-button-border-color': 'var(--popover-button-border-color)',
        'popover-button-color-active': 'var(--popover-button-color-active)',
        'popover-panel-background-color': 'var(--popover-panel-background-color)',
        'hyperlink-color': 'var(--hyperlink-color)',
        'hyperlink-color-hover': 'var(--hyperlink-color-hover)',
        'ring-color': 'var(--ring-color)',
        'icon-text-color': 'var(--icon-text-color)',
        'icon-text-color-hover': 'var(--icon-text-color-hover)',
        'icon-text-color-active': 'var(--icon-text-color-active)',
        'icon-color-primary': 'var(--icon-color-primary)',
        'icon-color-primary-hover': 'var(--icon-color-primary-hover)',
        'icon-color-primary-active': 'var(--icon-color-primary-active)',
        'link-text-color': 'var(--link-text-color)',
        'link-text-color-hover': 'var(--link-text-color-hover)',
        'link-text-color-active': 'var(--link-text-color-active)',
        'logo-text-color': 'var(--logo-text-color)',
        'logo-background-color': 'var(--logo-background-color)',
        'input-text-color': 'var(--input-text-color)',
        'input-background-color': 'var(--input-background-color)',
        'input-border-color': 'var(--input-border-color)',
        'input-placeholder-color': 'var(--input-placeholder-color)',
      },
    },
  },
  plugins: [],
} satisfies Config;
