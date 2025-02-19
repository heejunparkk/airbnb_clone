import { AccommodationsResponse } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { graphqlClient } from '@/lib/graphql-client';
import { GET_ACCOMMODATIONS } from '@/graphql/queries';

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
export function useAccommodationsByCategory(category: string) {
  return useQuery({
    queryKey: ['accommodations', 'category', category],
    queryFn: async () => {
      const data = await graphqlClient.request<AccommodationsResponse>(GET_ACCOMMODATIONS);
      return data.accommodations.filter((acc) => acc.category === decodeURIComponent(category));
    },
    enabled: Boolean(category),
  });
}
