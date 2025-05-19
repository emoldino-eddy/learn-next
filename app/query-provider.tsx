'use client';

import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query';

function makeQeuryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      }
    }
  })
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if(isServer) return makeQeuryClient();
  else {
    if(!browserQueryClient) browserQueryClient = makeQeuryClient();
    return browserQueryClient;
  }
}

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
