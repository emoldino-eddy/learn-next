'use client';
import Image from 'next/image';

import { getAllPokemon } from '@/packages/api/poke-data';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

export default function Pokemon({ initialData }: any) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['pokemon'],
      queryFn: getAllPokemon,
      initialData: initialData,
      getNextPageParam: (lastPage) => {
        return lastPage.hasMore ? lastPage.nextOffset : undefined;
      },
      initialPageParam: 0,
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
        page.results.map((pokemon: { name: string; image: string; id: number }) => (
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
        ))
      )}
      <div ref={observerRef} className="col-span-full py-4 text-center"/>
        
    </div>
  );
}
