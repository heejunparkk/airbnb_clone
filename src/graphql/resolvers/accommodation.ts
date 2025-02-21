import { prisma } from '@/lib/prisma';
import type { Accommodation } from '@prisma/client';

type CreateAccommodationArgs = Omit<Accommodation, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateAccommodationArgs = {
  id: string;
  images: string[];
};

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
    updateAccommodation: async (_: unknown, { id, images }: UpdateAccommodationArgs) => {
      try {
        const accommodation = await prisma.accommodation.update({
          where: { id },
          data: { images },
        });
        return accommodation;
      } catch (error) {
        console.error('Update accommodation error:', error);
        throw error;
      }
    },
  },
};
