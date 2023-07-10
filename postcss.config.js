import tailwind from 'tailwindcss';
import tailwindTypography from '@tailwindcss/typography';
import daisyui from 'daisyui';

export default {
  plugins: [
    tailwind({
      content: ['./.vitepress/theme/**/*.vue'],
      plugins: [tailwindTypography, daisyui],
      daisyui: {
        themes: ['light', 'dark'],
      },
    }),
  ],
};
