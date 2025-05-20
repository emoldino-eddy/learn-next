'use client';
import Image from 'next/image';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { pokemonQueries } from '@/packages/query-kit/pokemon';

interface PokemonProps {
  results: { name: string; image: string; id: number }[];
  hasMore: boolean;
  nextOffset: number;
}

export default function Pokemon(props: PokemonProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      ...pokemonQueries.list(),
      initialData: () => {
        return {
          pages: [props],
          pageParams: [0],
        };
      },
    });

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="p-4 grid-cols-2 md:grid-cols-4 gap-4">
      {data?.pages.flatMap((page) =>
        page.results.map(
          (pokemon: { name: string; image: string; id: number }) => (
            <div
              key={pokemon.id}
              className="border rounded-xl p-4 flex flex-col items-center shadow-md"
            >
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                width={100}
                height={100}
                className="w-20 h-20 object-contain mb-2"
              />
              <p className="capitalize font-medium">{pokemon.name}</p>
            </div>
          )
        )
      )}
      <div ref={observerRef} className="col-span-full py-4 text-center" />
    </div>
  );
}
