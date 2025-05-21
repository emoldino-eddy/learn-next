'use client';

import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';
import { getPokeApi, type PokeApi } from '@/packages/api/poke-data';
import { createContext, useContext } from 'react';

interface ApiStore {
  pokeApi: PokeApi;
}

export const createApiStore = () => {
  return createStore<ApiStore>(() => ({
    pokeApi: getPokeApi(),
  }));
};

export type ApiStoreApi = ReturnType<typeof createApiStore>;
export const ApiStoreContext = createContext<ApiStoreApi | null>(null);

const useApiStore = <T>(selector: (store: ApiStore) => T): T => {
  const apiStoreContext = useContext(ApiStoreContext);

  if (!apiStoreContext) {
    throw new Error('useCounterStore must be used within a ApiStoreProvider');
  }

  return useStore(apiStoreContext, selector);
};

export function usePokeApi() {
  return useApiStore((store) => store.pokeApi);
}
