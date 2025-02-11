import { use } from 'react';
import { Suspense } from 'react';
import CategoryContent from './components/CategoryContent';

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = use(params);
  const category = decodeURIComponent(resolvedParams.category);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryContent category={category} />
    </Suspense>
  );
}
