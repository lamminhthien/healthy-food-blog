import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  publicDir: 'data',
  build: {
    rollupOptions: {
      input: [
        'index.html',
        'recipes.html',
        'recipe-detail.html',
        'meal-prep.html',
        'articles.html',
        'article-detail.html',
        'about.html',
      ],
    },
  },
});
