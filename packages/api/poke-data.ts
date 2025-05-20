import axios, { AxiosInstance } from 'axios';

export class PokeApi {
  private client: AxiosInstance;

  constructor(options?: { client?: AxiosInstance }) {
    this.client =
      options?.client ??
      axios.create({
        baseURL: 'https://pokeapi.co/api/v2',
      });
  }

  async getAllPokemon({ pageParam = 0 }) {
    const limit = 20;
    const offset = pageParam;

    const pokemonList = await this.getPokemonBasic(offset, limit);
    const detailResults = await this.getPokemonDetails(pokemonList);

    return {
      results: detailResults,
      nextOffset: offset + limit,
      hasMore: pokemonList.next !== null,
    };
  }

  async getPokemonBasic(offset: number, limit: number) {
    const response = await this.client.get(
      `/pokemon?offset=${offset}&limit=${limit}`
    );
    return response.data.results;
  }

  async getPokemonDetails(pokemonList: { name: string; url: string }[]) {
    const response = await Promise.all(
      pokemonList.map(async (pokemon: { name: string; url: string }) => {
        const details = await this.client.get(pokemon.url);
        return {
          id: details.data.id,
          name: pokemon.name,
          image: details.data.sprites.other['official-artwork'].front_default,
        };
      })
    );
    return response;
  }
}
let pokeApi: PokeApi | undefined;

export function getPokeApi() {
  if (typeof window === 'undefined') {
    return new PokeApi();
  }
  pokeApi ??= new PokeApi();

  return pokeApi;
}
