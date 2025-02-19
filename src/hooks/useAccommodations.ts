import { AccommodationsResponse } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { graphqlClient } from '@/lib/graphql-client';
import { GET_ACCOMMODATIONS } from '@/graphql/queries';
// import { queries } from '@/app/api/query';

// 전체 숙소 조회 훅
export function useAccommodations() {
  return useQuery({
    queryKey: ['accommodations'],
    queryFn: async () => {
      const data = await graphqlClient.request<AccommodationsResponse>(GET_ACCOMMODATIONS);
      return data.accommodations;
    },
  });
}

// 카테고리별 숙소 조회 훅
// export function useAccommodationsByCategory(category: string) {
//   return useQuery({
//     ...queries.accommodations.byCategory(category),
//     enabled: Boolean(category),
//   });
// }
