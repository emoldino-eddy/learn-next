import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import type { PokeApi } from '../../api/poke-data';

export const pokemonQueryOptions = {
  all: () => ['pokemon'] as const,
  basicLists: () => [...pokemonQueryOptions.all(), 'basicList'] as const,
  basicList: (limit: number) => {
    return infiniteQueryOptions({
      queryKey: [...pokemonQueryOptions.basicLists(), 'pokeBasicList'],
      queryFn: ({
        pageParam,
        meta,
      }): ReturnType<PokeApi['getPokemonBasic']> => {
        if (!meta?.pokeApi) {
          throw new Error('Missing pokeApi');
        }

        return meta.pokeApi.getPokemonBasic({
          limit,
          pageParam: pageParam,
        });
      },
      getNextPageParam: (lastPage, _, lastPageParam,) => {
        return lastPage.next ? lastPageParam + limit : undefined;
      },
      initialPageParam: 0,
    });
  },
  detailLists: () => [...pokemonQueryOptions.all(), 'detailList'] as const,
  detailList: (pokemonList: { name: string; url: string }) => {
    return queryOptions({
      queryKey: [...pokemonQueryOptions.detailLists(), pokemonList.name],
      queryFn: ({ meta }) => {
        if (!meta?.pokeApi) {
          throw new Error('Missing pokeApi');
        }

        return meta.pokeApi.getPokemonDetails(pokemonList);
      },
    });
  },
};
