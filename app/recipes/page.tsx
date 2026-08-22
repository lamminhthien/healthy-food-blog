import { RecipesPage } from '../components/site';
import { getRecipes } from '../../lib/content';

export default function Page() {
  return <RecipesPage recipes={getRecipes()} />;
}
