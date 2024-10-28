import { env } from "@/env.mjs";
import useTenantToken from "@/hooks/useTenantToken";

import { MeiliSearch } from "meilisearch";
import { createContext, type FunctionComponent, type ReactNode, useMemo } from "react";

type MeilisearchContext = {
  meilisearchInstance: MeiliSearch | null;
};

const initialContext: MeilisearchContext = {
  meilisearchInstance: null,
};

export const MeilisearchContext = createContext<MeilisearchContext>(initialContext);

type MeilisearchProviderProps = {
  readonly children: ReactNode;
};

const MeilisearchProvider: FunctionComponent<MeilisearchProviderProps> = ({ children }) =>
{
  const { searchToken } = useTenantToken();

  const meilisearchInstance = useMemo(() => !searchToken ? null : new MeiliSearch({
    apiKey: searchToken,
    host: env.NEXT_PUBLIC_MEILISEARCH_PUBLIC_URL
  }), [searchToken]);

  const memoizedContext = useMemo(() => ({ meilisearchInstance }), [meilisearchInstance]);

  return (
    <MeilisearchContext.Provider value={memoizedContext}>
      {children}
    </MeilisearchContext.Provider>
  );
};

export default MeilisearchProvider;
