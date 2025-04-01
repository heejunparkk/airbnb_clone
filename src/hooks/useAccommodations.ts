import { useQuery } from '@tanstack/react-query';
import { accommodationService } from '@/services/accommodation';

// 전체 숙소 조회 훅
export function useAccommodations() {
  return useQuery({
    queryKey: ['accommodations'],
    queryFn: accommodationService.getAll,
    staleTime: 5 * 60 * 1000, // 5분간 데이터를 "신선"하다고 간주
  });
}

// 개별 숙소 조회 훅
export function useAccommodation(id: number) {
  return useQuery({
    queryKey: ['accommodation', id],
    queryFn: () => accommodationService.getById(id),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  });
}

// 카테고리별 숙소 조회 훅
export function useAccommodationsByCategory(category: string) {
  return useQuery({
    queryKey: ['accommodations', 'category', category],
    queryFn: () => accommodationService.getByCategory(category),
    enabled: Boolean(category),
    staleTime: 5 * 60 * 1000,
  });
}
