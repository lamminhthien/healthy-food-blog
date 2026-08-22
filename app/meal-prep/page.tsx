import { PrepPage } from '../components/prep';
import { getMealPlans } from '../../lib/content';

export default function Page() {
  return <PrepPage plans={getMealPlans()} />;
}
