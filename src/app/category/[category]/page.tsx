import { use } from 'react';
import CategoryContent from './components/CategoryContent';

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = use(params);
  const category = decodeURIComponent(resolvedParams.category);

  return <CategoryContent category={category} />;
}
