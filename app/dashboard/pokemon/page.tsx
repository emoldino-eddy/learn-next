import { lusitana } from '@/app/ui/fonts';
import Pokemon from '@/app/ui/pockmon/card';
import { getPokeApi } from '@/packages/api/poke-data';

export default async function Page() {
  const initialData = await getPokeApi().getPokemonBasic({ pageParam: 0 });

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Pockmons</h1>
      </div>
      <Pokemon {...initialData} />
    </div>
  );
}
