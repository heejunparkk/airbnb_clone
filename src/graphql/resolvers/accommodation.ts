import { prisma } from '@/lib/prisma';
import type { Accommodation } from '@prisma/client';

type CreateAccommodationArgs = Omit<Accommodation, 'id' | 'createdAt' | 'updatedAt'>;

export const accommodationResolvers = {
  Query: {
    accommodations: async () => {
      try {
        return await prisma.accommodation.findMany();
      } catch (error) {
        console.error('Accommodations query error:', error);
        return [];
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
    // 카테고리별 숙소 조회 리졸버
    accommodationsByCategory: async (_: unknown, { category }: { category: string }) => {
      try {
        const accommodations = await prisma.accommodation.findMany({
          where: {
            category: {
              equals: category,
              mode: 'insensitive', // 대소문자 구분 없이
            },
          },
        });

        // 항상 배열 반환 (비어있더라도)
        return accommodations || [];
      } catch (error) {
        console.error('Category accommodations query error:', error);
        return [];
      }
    },
  },
  Mutation: {
    createAccommodation: async (_: unknown, args: CreateAccommodationArgs) => {
      try {
        const accommodation = await prisma.accommodation.create({
          data: args,
        });
        return accommodation;
      } catch (error) {
        console.error('Create accommodation error:', error);
        throw error;
      }
    },
    updateAccommodation: async (_: unknown, args: { id: string } & Partial<Accommodation>) => {
      const { id, ...data } = args;
      try {
        const accommodation = await prisma.accommodation.update({
          where: { id },
          data,
        });
        return accommodation;
      } catch (error) {
        console.error('Update accommodation error:', error);
        throw error;
      }
    },
    deleteAccommodation: async (_: unknown, { id }: { id: string }) => {
      try {
        const accommodation = await prisma.accommodation.delete({
          where: { id },
        });
        return accommodation;
      } catch (error) {
        console.error('Delete accommodation error:', error);
        throw error;
      }
    },
  },
};
