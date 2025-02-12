import { useQuery, type UseQueryResult } from '@tanstack/react-query';
// import { accommodationApi } from '../api/accommodation';
import { queries } from '../api/query';
import type { Accommodation } from '../types/accommodation';

// 전체 숙소 조회 훅
export function useAccommodations(): UseQueryResult<Accommodation[], Error> {
  return useQuery(queries.accommodations.all());
}

// 카테고리별 숙소 조회 훅
export function useAccommodationsByCategory(category: string): UseQueryResult<Accommodation[], Error> {
  return useQuery({
    ...queries.accommodations.byCategory(category),
    enabled: Boolean(category),
  });
}

// 단일 숙소 상세 조회 훅
// export function useAccommodation(id: number) {
//   return useQuery({
//     queryKey: ['accommodation', id],
//     queryFn: () => accommodationApi.getById(id),
//     enabled: !!id,
//   });
// }
