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
  },
  Mutation: {
    createAccommodation: async (_: unknown, { input }: { input: Prisma.AccommodationCreateInput }) => {
      return await prisma.accommodation.create({
        data: input,
      });
    },
  },
};
