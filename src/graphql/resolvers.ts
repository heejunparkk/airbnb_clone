import { prisma } from '@/lib/prisma';

export const resolvers = {
  Query: {
    accommodations: async () => {
      return await prisma.accommodation.findMany();
    },
    accommodation: async (_: unknown, { id }: { id: number }) => {
      return await prisma.accommodation.findUnique({
        where: { id },
      });
    },
  },
  Mutation: {
    createAccommodation: async (_: unknown, args: unknown) => {
      return await prisma.accommodation.create({
        data: args,
      });
    },
  },
};
