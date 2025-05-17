import axios from 'axios';

export async function getAllPokemon({ pageParam = 0 }) {
  const limit = 20;
  const offset = pageParam;
  const res = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );
  const results = res.data.results;
  const detailResults = await Promise.all(
    results.map(async (pokemon: { name: string; url: string }) => {
      const details = await axios.get(pokemon.url);
      return {
        name: pokemon.name,
        image: details.data.sprites.other['official-artwork'].front_default,
      };
    })
  );

  return {
    results: detailResults,
    nextOffset: offset + limit,
    hasMore: res.data.next !== null,
  };
}
