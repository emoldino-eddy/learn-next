import { infiniteQueryOptions } from '@tanstack/react-query';
import { usePokeApi } from '@/app/dashboard/pokemon/store/api';

export const pokemonQueries = {
  all: () => ['pokemon'] as const,
  lists: () => [...pokemonQueries.all(), 'list'] as const,
  list: () => {
    const pokeApi = usePokeApi();
    return infiniteQueryOptions({
      queryKey: [...pokemonQueries.lists()],
      queryFn: ({ pageParam }) => pokeApi.getAllPokemon({ pageParam }),
      getNextPageParam: (lastPage) => {
        return lastPage.hasMore ? lastPage.nextOffset : undefined;
      },
      initialPageParam: 0,
    });
  },
};
