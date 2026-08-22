import { ArticlesPage } from '../components/site';
import { getArticles } from '../../lib/content';

export default function Page() {
  return <ArticlesPage articles={getArticles()} />;
}
