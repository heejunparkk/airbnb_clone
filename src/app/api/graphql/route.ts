import { createYoga } from 'graphql-yoga';
import { typeDefs } from '@/graphql/schema';
import { resolvers } from '@/graphql/resolvers';
import { makeExecutableSchema } from '@graphql-tools/schema';

const yogaApp = createYoga({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response, Request },
  landingPage: false,
  cors: false,
  batching: true,
  plugins: [
    {
      onRequest({ request }) {
        console.log('Incoming request:', request);
      },
    },
  ],
});

export { yogaApp as GET, yogaApp as POST };
