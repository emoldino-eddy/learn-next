import { lusitana } from '@/app/ui/fonts';
import Pokemon from '@/app/ui/pockmon/card';

export default async function Page() {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`
  );
  const data = await res.json();
  const pokemonList = data.results;
  
  const detailResults = await Promise.all(
    pokemonList.map(async (pokemon: { name: string; url: string }) => {
      const details = await fetch(pokemon.url);
      const detailsData = await details.json();
      return {
        id: detailsData.id,
        name: pokemon.name,
        image: detailsData.sprites.other['official-artwork'].front_default,
      };
    })
  );

  const initialData = {
    pages: [{
      results: detailResults,
      hasMore: data.next !== null,
      nextOffset: 20
    }],
    pageParams: [0]
  };

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Pockmons</h1>
      </div>
      
      <Pokemon initialData={initialData} />
    </div>
  );
}
