import { accommodations } from '../data/data'; // 임시 데이터 import
import { createQueryKeys } from '@lukemorales/query-key-factory';
import type { Accommodation } from '@/types/types';

export const accommodationQueries = createQueryKeys('accommodations', {
  all: () => ({
    queryKey: ['accommodations'],
    queryFn: async (): Promise<Accommodation[]> => {
      // 실제 API 대신 임시 데이터 사용
      return accommodations;
    },
  }),
  byCategory: (category: string) => ({
    queryKey: ['accommodations', 'category', category],
    queryFn: async (): Promise<Accommodation[]> => {
      // 실제 API 대신 임시 데이터 필터링
      const filteredAccommodations = accommodations.filter((acc) => acc.category === category);
      if (filteredAccommodations.length === 0) {
        throw new Error(`No accommodations found for category: ${category}`);
      }
      return filteredAccommodations;
    },
  }),
});

export const queries = {
  accommodations: accommodationQueries,
} as const;
