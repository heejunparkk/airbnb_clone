import { graphqlClient } from '@/lib/graphql-client';
import { GET_ACCOMMODATIONS, GET_ACCOMMODATION } from '@/graphql/queries';
import { CREATE_ACCOMMODATION } from '@/graphql/mutations';
import { Accommodation } from '@/types/types';

export const accommodationService = {
  getAll: async (): Promise<Accommodation[]> => {
    const { accommodations } = await graphqlClient.request<{ accommodations: Accommodation[] }>(GET_ACCOMMODATIONS);
    return accommodations;
  },

  getById: async (id: number): Promise<Accommodation> => {
    const { accommodation } = await graphqlClient.request<{ accommodation: Accommodation }>(GET_ACCOMMODATION, { id });
    return accommodation;
  },

  create: async (data: Omit<Accommodation, 'id'>): Promise<Accommodation> => {
    const { createAccommodation } = await graphqlClient.request<{ createAccommodation: Accommodation }>(
      CREATE_ACCOMMODATION,
      data
    );
    return createAccommodation;
  },
};
