import { authResolvers } from './auth';
import { accommodationResolvers } from './accommodation';

export const resolvers = {
  Query: {
    ...authResolvers.Query,
    ...accommodationResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...accommodationResolvers.Mutation,
  },
};
