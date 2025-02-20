import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const resolvers = {
  Query: {
    accommodations: async () => {
      return await prisma.accommodation.findMany();
    },
    accommodation: async (_: unknown, { id }: { id: string }) => {
      return await prisma.accommodation.findUnique({
        where: { id },
      });
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
