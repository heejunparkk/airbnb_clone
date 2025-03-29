import { AccommodationsResponse } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { graphqlClient } from '@/lib/graphql-client';
import { GET_ACCOMMODATIONS } from '@/graphql/queries';

// 전체 숙소 조회 훅
export function useAccommodations() {
  return useQuery({
    queryKey: ['accommodations'],
    queryFn: async () => {
      try {
        const data = await graphqlClient.request<AccommodationsResponse>(GET_ACCOMMODATIONS);
        if (!data || !data.accommodations) {
          throw new Error('데이터를 불러오는데 실패했습니다.');
        }
        return data.accommodations;
      } catch (error) {
        console.error('숙소 데이터 조회 중 오류:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5분간 데이터를 "신선"하다고 간주
  });
}

// 카테고리별 숙소 조회 훅
export function useAccommodationsByCategory(category: string) {
  return useQuery({
    queryKey: ['accommodations', 'category', category],
    queryFn: async () => {
      try {
        const data = await graphqlClient.request<AccommodationsResponse>(GET_ACCOMMODATIONS);
        if (!data || !data.accommodations) {
          throw new Error('데이터를 불러오는데 실패했습니다.');
        }
        return data.accommodations.filter((acc) => acc.category === decodeURIComponent(category));
      } catch (error) {
        console.error('카테고리별 숙소 데이터 조회 중 오류:', error);
        throw error;
      }
    },
    enabled: Boolean(category),
    staleTime: 5 * 60 * 1000,
  });
}
