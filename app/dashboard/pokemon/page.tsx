import QueryProvider from '@/app/query-provider';
import { lusitana } from '@/app/ui/fonts';
import Pokemon from '@/app/ui/pockmon/card';
import { getAllPokemon } from '@/packages/api/poke-data';

export default async function Page() {
  const initialData = await getAllPokemon({pageParam: 0});

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Pockmons</h1>
      </div>
      <QueryProvider>
        <Pokemon {...initialData} />
      </QueryProvider>
    </div>
  );
}
