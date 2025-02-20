import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const accommodationResolvers = {
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
    createAccommodation: async (
      _: unknown,
      args: {
        title: string;
        location: string;
        price: number;
        rating: number;
        images: string[];
        category: string;
        description: string;
        bedrooms: number;
        beds: number;
        baths: number;
        maxGuests: number;
        amenities: string[];
      }
    ) => {
      return await prisma.accommodation.create({
        data: args,
      });
    },
  },
};
