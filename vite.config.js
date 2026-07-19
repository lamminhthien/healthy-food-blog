import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: 'data',
  build: {
    rollupOptions: {
      input: ['index.html', 'recipes.html', 'recipe-detail.html', 'meal-prep.html', 'articles.html', 'article-detail.html', 'about.html']
    }
  }
});
