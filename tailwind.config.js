/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'hover-primary': 'var(--color-hover-primary)',
        secondary: 'var(--color-secondary)',
        'hover-secondary': 'var(--color-hover-secondary)',
        tertiary: 'var(--color-tertiary)',
        'hover-tertiary': 'var(--color-hover-tertiary)',
        danger: 'var(--color-danger)',
        'hover-danger': 'var(--color-hover-danger)',
        success: 'var(--color-success)',
        'hover-success': 'var(--color-hover-success)',
        neutral: 'var(--color-neutral)',
        'neutral-variant': 'var(--color-neutral-variant)',
      },
      textColor: {
        dark: 'var(--color-text-dark)',
        light: 'var(--color-text-light)',
        gray: 'var(--color-text-gray)',
      },
      fontSize: {
        xxlarge: 'var(--font-xxlarge)',
        xlarge: 'var(--font-xlarge)',
        large: 'var(--font-large)',
        medium: 'var(--font-base)',
        small: 'var(--font-small)',
        xsmall: 'var(--font-xsmall)',
        xxsmall: 'var(--font-xxsmall)',
      },
      fontFamily: {
        sans: ['var(--font-pretendard)', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        small: 'var(--border-radius-small)',
        medium: 'var(--border-radius-medium)',
        large: 'var(--border-radius-large)',
        xlarge: 'var(--border-radius-xlarge)',
      },
      spacing: {
        xsmall: 'var(--space-xsmall)',
        small: 'var(--space-small)',
        medium: 'var(--space-medium)',
        large: 'var(--space-large)',
        xlarge: 'var(--space-xlarge)',
        xxlarge: 'var(--space-xxlarge)',
      },
      backgroundColor: {
        basic: 'var(--color-background)',
        light: 'var(--color-background-light)',
        dark: 'var(--color-background-dark)',
      },
      maxWidth: {
        container: 'var(--width-max)',
      },
    },
  },
  plugins: [],
};
