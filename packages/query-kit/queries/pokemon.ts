import { infiniteQueryOptions } from '@tanstack/react-query';
import type { PokeApi } from '../../api/poke-data';

export const pokemonQueryOptions = {
  all: () => ['pokemon'] as const,
  lists: () => [...pokemonQueryOptions.all(), 'list'] as const,
  list: () => {
    return infiniteQueryOptions({
      queryKey: [...pokemonQueryOptions.lists(), 'pokeAll'],
      queryFn: ({ pageParam, meta }): ReturnType<PokeApi['getAllPokemon']> => {
        if (!meta?.pokeApi) {
          throw new Error('Missing pokeApi');
        }

        return meta.pokeApi.getAllPokemon({ pageParam: pageParam });
      },
      getNextPageParam: (lastPage) => {
        return lastPage.hasMore ? lastPage.nextOffset : undefined;
      },
      initialPageParam: 0,
    });
  },
};
