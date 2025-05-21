import { infiniteQueryOptions } from '@tanstack/react-query';
import { usePokeApi } from '@/app/dashboard/pokemon/store/api';

export const UsePokemonQueries = () => {
  const pokeApi = usePokeApi();
  const all = () => ['pokemon'] as const;
  const lists = () => [...all(), 'list'] as const;
  return {
    all,
    lists,
    list: () => {
      return infiniteQueryOptions({
        queryKey: [...lists()],
        queryFn: ({ pageParam }) => pokeApi.getAllPokemon({ pageParam }),
        getNextPageParam: (lastPage) => {
          return lastPage.hasMore ? lastPage.nextOffset : undefined;
        },
        initialPageParam: 0,
      });
    },
  };
};
