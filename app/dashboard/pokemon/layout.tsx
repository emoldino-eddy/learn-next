'use client';

import { ApiStoreApi, ApiStoreContext, createApiStore } from './store/api';

let apiStore: ApiStoreApi | undefined;

function getApiStore() {
  if (typeof window === 'undefined') {
    return createApiStore();
  }
  apiStore ??= createApiStore();
  return apiStore;
}

export default function Layout({ children }: React.PropsWithChildren) {
  const store = getApiStore();
  return (
    <ApiStoreContext.Provider value={store}>
      {children}
    </ApiStoreContext.Provider>
  );
}
