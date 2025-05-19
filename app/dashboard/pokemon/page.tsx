import { lusitana } from '@/app/ui/fonts';
import Pokemon from '@/app/ui/pockmon/card';
import { getAllPokemon } from '@/packages/api/poke-data';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
      queryKey: ['pokemon'],
      queryFn: () => getAllPokemon({pageParam: 0}),
      getNextPageParam: (lastPage: {hasMore: boolean, nextOffset: number}) => {
        return lastPage.hasMore ? lastPage.nextOffset : undefined;
      },
      initialPageParam: 0,
  })
    
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Pockmons</h1>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Pokemon />
      </HydrationBoundary>
    </div>
  );
}
