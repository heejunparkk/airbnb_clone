'use client';

import { ApolloProvider } from '@apollo/client';
import { client } from '@/lib/apollo';
import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      {children}
      <Toaster position="top-center" />
    </ApolloProvider>
  );
}
