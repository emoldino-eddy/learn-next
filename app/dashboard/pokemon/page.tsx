import { lusitana } from '@/app/ui/fonts';
import Pokemon from '@/app/ui/pockmon/card';

export default function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Pockmons</h1>
      </div>
      <Pokemon />
    </div>
  );
}
