import { getPokeApi } from '@/packages/api/poke-data';
import { pokemonQueryOptions } from '@/packages/query-kit/queries/pokemon';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

export default function PokemonImage({
  pokemon,
}: {
  pokemon: { name: string; url: string };
}) {
  const { data, isLoading } = useQuery({
    ...pokemonQueryOptions.detailList(pokemon),
    meta: {
      pokeApi: getPokeApi(),
    },
    select: (data) => {
      return {
        id: data.id,
        name: data.name,
        image:
          data.sprites.other['official-artwork'].front_default
      };
    },
  });
  return (
    <div className="border rounded-xl p-4 flex flex-col items-center shadow-md">
      {isLoading ? (<div>Loading...</div>): (
        <Image
          src={data?.image}
          alt={data?.name}
          width={100}
          height={100}
          className="w-20 h-20 object-contain mb-2"
        />
      )}
      <p className="capitalize font-medium">{data?.name || pokemon.name}</p>
    </div>
  );
}
