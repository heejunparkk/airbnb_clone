import { Suspense } from 'react';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import CategoryContent from './components/CategoryContent';
import { accommodationService } from '@/services/accommodation';

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const resolvedParams = await params;
  const category = decodeURIComponent(resolvedParams.category);

  // 서버에서 데이터를 프리페치합니다 (최적화된 쿼리 사용)
  const queryClient = new QueryClient();

  // 데이터 프리페치 로직을 별도 함수로 분리하여 메인 렌더링을 차단하지 않도록 함
  await queryClient.prefetchQuery({
    queryKey: ['accommodations', 'category', category],
    queryFn: () => accommodationService.getByCategory(category),
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CategoryContent category={category} />
      </HydrationBoundary>
    </Suspense>
  );
}
