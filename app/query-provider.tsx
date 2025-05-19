'use client';

import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      }
    }
  })
}

let browserQueryClinet: QueryClient | undefined;

function getBrowerClient() {
  if(isServer) return makeQueryClient()
  else {
    if(!browserQueryClinet) browserQueryClinet = makeQueryClient()
    return browserQueryClinet
  }
}

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getBrowerClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
