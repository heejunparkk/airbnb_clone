import { Suspense } from 'react';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { GET_ACCOMMODATIONS } from '@/graphql/queries';
import { graphqlClient } from '@/lib/graphql-client';
import { AccommodationsResponse } from '@/types/types';
import CategoryContent from './components/CategoryContent';

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const category = decodeURIComponent(params.category);

  // 서버에서 데이터를 프리페치합니다
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['accommodations', 'category', category],
    queryFn: async () => {
      try {
        const data = await graphqlClient.request<AccommodationsResponse>(GET_ACCOMMODATIONS);
        if (!data || !data.accommodations) {
          throw new Error('데이터를 불러오는데 실패했습니다.');
        }
        return data.accommodations.filter((acc: { category: string }) => acc.category === category);
      } catch (error) {
        console.error('카테고리별 숙소 데이터 조회 중 오류:', error);
        return [];
      }
    },
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CategoryContent category={category} />
      </HydrationBoundary>
    </Suspense>
  );
}
