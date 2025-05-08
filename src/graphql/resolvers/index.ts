import { accommodationResolvers } from './accommodation';

export const resolvers = {
  Query: {
    ...accommodationResolvers.Query,
  },
  Mutation: {
    ...accommodationResolvers.Mutation,
  },
};
