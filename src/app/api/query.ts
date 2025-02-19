import { createQueryKeys } from '@lukemorales/query-key-factory';
import type { Accommodation } from '@/types/types';
import { prisma } from '@/lib/prisma';

export const accommodationQueries = createQueryKeys('accommodations', {
  all: () => ({
    queryKey: ['accommodations'],
    queryFn: async (): Promise<Accommodation[]> => {
      return prisma.accommodation.findMany();
    },
  }),
  byCategory: (category: string) => ({
    queryKey: ['accommodations', 'category', category],
    queryFn: async (): Promise<Accommodation[]> => {
      const filteredAccommodations = await prisma.accommodation.findMany({
        where: { category },
      });
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
