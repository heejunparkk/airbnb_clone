import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: '/api/graphql',
  credentials: 'same-origin', // 쿠키 포함
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
