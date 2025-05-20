import { infiniteQueryOptions } from '@tanstack/react-query';
import { PokeApi } from '../api/poke-data';

const pokeApi = new PokeApi();

export const pokemonQueries = {
  all: () => ['pokemon'] as const,
  lists: () => [...pokemonQueries.all(), 'list'] as const,
  list: () =>
    infiniteQueryOptions({
      queryKey: [...pokemonQueries.lists()],
      queryFn: ({ pageParam }) => pokeApi.getAllPokemon({ pageParam }),
      getNextPageParam: (lastPage) => {
        return lastPage.hasMore ? lastPage.nextOffset : undefined;
      },
      initialPageParam: 0,
    }),
};
