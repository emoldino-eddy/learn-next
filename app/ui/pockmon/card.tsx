'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { pokemonQueryOptions } from '@/packages/query-kit/queries/pokemon';
import { getPokeApi } from '@/packages/api/poke-data';
import PokemonImage from './image';

interface PokemonProps {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

export default function Pokemon(props: PokemonProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      ...pokemonQueryOptions.basicList(),
      initialData: {
        pages: [props],
        pageParams: [0],
      },
      meta: {
        pokeApi: getPokeApi(),
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
      {data?.pages.map((page) =>
        page.results.map((pokemon: any) => (
          <PokemonImage pokemon={pokemon} key={pokemon.name} />
        ))
      )}
      <div ref={observerRef} className="col-span-full py-4 text-center" />
    </div>
  );
}
