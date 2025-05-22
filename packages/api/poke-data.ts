import axios, { AxiosInstance } from 'axios';
import { pokemonBasicSchema, pokemonDetailResultSchema } from './schema';

export class PokeApi {
  private client: AxiosInstance;

  constructor(options?: { client?: AxiosInstance }) {
    this.client =
      options?.client ??
      axios.create({
        baseURL: 'https://pokeapi.co/api/v2',
      });
  }

  async getPokemonBasic({ limit = 20, pageParam = 0 }) {
    const response = await this.client.get(
      `/pokemon?offset=${pageParam}&limit=${limit}`
    );
    return pokemonBasicSchema.parse(response.data);
  }

  async getPokemonDetails(pokemonList: { url: string }) {
    const response = await this.client.get(pokemonList.url);
    return pokemonDetailResultSchema.parse(response.data);
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
