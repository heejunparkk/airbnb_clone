import { graphqlClient } from '@/lib/graphql-client';
import { GET_ACCOMMODATIONS, GET_ACCOMMODATION, GET_ACCOMMODATIONS_BY_CATEGORY } from '@/graphql/queries';
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

  getByCategory: async (category: string): Promise<Accommodation[]> => {
    try {
      const { accommodationsByCategory } = await graphqlClient.request<{ accommodationsByCategory: Accommodation[] }>(
        GET_ACCOMMODATIONS_BY_CATEGORY,
        { category }
      );
      return accommodationsByCategory || [];
    } catch (error) {
      console.error(`카테고리 '${category}' 데이터 조회 오류:`, error);
      return [];
    }
  },

  create: async (data: Omit<Accommodation, 'id'>): Promise<Accommodation> => {
    const { createAccommodation } = await graphqlClient.request<{ createAccommodation: Accommodation }>(
      CREATE_ACCOMMODATION,
      data
    );
    return createAccommodation;
  },
};
