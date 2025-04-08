import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const resolvers = {
  Query: {
    accommodations: async () => {
      try {
        const result = await prisma.accommodation.findMany();
        if (!result) return [];
        return result;
      } catch (error) {
        console.error('Accommodations query error:', error);
        throw new Error('Failed to fetch accommodations');
      }
    },
    accommodation: async (_: unknown, { id }: { id: string }) => {
      try {
        if (!id) throw new Error('ID is required');
        const result = await prisma.accommodation.findUnique({
          where: { id },
        });
        if (!result) throw new Error('Accommodation not found');
        return result;
      } catch (error) {
        console.error('Accommodation query error:', error);
        throw new Error('Failed to fetch accommodation');
      }
    },
    // 카테고리별 숙소 조회 리졸버 추가
    accommodationsByCategory: async (_: unknown, { category }: { category: string }) => {
      try {
        if (!category) return [];
        const result = await prisma.accommodation.findMany({
          where: {
            category: {
              equals: category,
              mode: 'insensitive', // 대소문자 구분 없이
            },
          },
        });

        return result || [];
      } catch (error) {
        console.error('Category accommodations query error:', error);
        // 오류 발생 시 빈 배열 반환
        return [];
      }
    },
  },

  Mutation: {
    createAccommodation: async (_: unknown, { input }: { input: Prisma.AccommodationCreateInput }) => {
      return await prisma.accommodation.create({
        data: input,
      });
    },
  },
};
