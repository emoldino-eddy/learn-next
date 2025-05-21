import type { PokeApi } from '../api/poke-data';

interface ApiMeta extends Record<string, unknown> {
  pokeApi?: PokeApi;
}

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: ApiMeta;
  }
}
