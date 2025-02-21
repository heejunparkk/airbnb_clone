import { createQueryKeys } from '@lukemorales/query-key-factory';
import type { Accommodation } from '@/types/types';
import { prisma } from '@/lib/prisma';

// API 함수들
export const accommodationApi = {
  getAll: async (): Promise<Accommodation[]> => {
    return prisma.accommodation.findMany();
  },

  getByCategory: async (category: string): Promise<Accommodation[]> => {
    return prisma.accommodation.findMany({
      where: { category },
    });
  },

  getById: async (id: string): Promise<Accommodation | null> => {
    return prisma.accommodation.findUnique({
      where: { id },
    });
  },
};

// Query Keys
export const accommodationQueries = createQueryKeys('accommodations', {
  all: () => ({
    queryKey: ['accommodations'],
    queryFn: () => accommodationApi.getAll(),
  }),
  byCategory: (category: string) => ({
    queryKey: ['accommodations', 'category', category],
    queryFn: () => accommodationApi.getByCategory(category),
  }),
});

export const queries = {
  accommodations: accommodationQueries,
} as const;
