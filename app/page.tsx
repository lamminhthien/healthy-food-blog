import { HomePage } from './components/site';
import { getArticles, getRecipes } from '../lib/content';

export default function Page() {
  return <HomePage recipes={getRecipes()} articles={getArticles()} />;
}
