'use client';
import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
// import { fetchFilteredInvoices } from '@/app/lib/data';
import { getAllPokemon } from '@/app/lib/poke-data';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

export default function PokesTable({
  query,
  currentPage,
}: {
  query?: string;
  currentPage?: number;
}) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['pokemon'],
      queryFn: getAllPokemon,
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
      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.results.map((pokemon: any) => (
            <div
              key={pokemon.name}
              className="border rounded-xl p-4 flex flex-col items-center shadow-md"
            >
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-20 h-20 object-contain mb-2"
              />
              <p className="capitalize font-medium">{pokemon.name}</p>
            </div>
          ))}
        </div>
      ))}
      <div ref={observerRef} className="col-span-full py-4 text-center">
        {isFetchingNextPage ? 'Loading more...' : 'Scroll to load more'}
      </div>
    </div>
  );
}
