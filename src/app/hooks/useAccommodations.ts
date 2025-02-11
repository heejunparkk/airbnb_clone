import { useQuery } from '@tanstack/react-query';
import { accommodationApi } from '../api/accommodation';

// 전체 숙소 조회 훅
export function useAccommodations() {
  return useQuery({
    queryKey: ['accommodations'],
    queryFn: () => accommodationApi.getAll(),
  });
}

// 카테고리별 숙소 조회 훅
export function useAccommodationsByCategory(category: string) {
  return useQuery({
    queryKey: ['accommodations', 'category', category],
    queryFn: () => accommodationApi.getByCategory(category),
    enabled: !!category,
  });
}

// 단일 숙소 상세 조회 훅
export function useAccommodation(id: number) {
  return useQuery({
    queryKey: ['accommodation', id],
    queryFn: () => accommodationApi.getById(id),
    enabled: !!id,
  });
}
