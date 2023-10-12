import { type Note } from "@/db/schema";
import { type AppRouter } from "@/server/api/root";
import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

import { type inferReactQueryProcedureOptions } from "@trpc/react-query";

type UseNotes = (
  folderId: string | null,
  options?: inferReactQueryProcedureOptions<AppRouter>["notes"]["getNotes"]
) => UseQueryResult<{ notes: Note[] }>;

const useNotes: UseNotes = (folderId, options) =>
{
  const { data: notes = [], error, isLoading } = api.notes.getNotes.useQuery({ folderId }, {
    ...options,
    refetchOnMount: "always",
    staleTime: Infinity
  });
  
  return {
    error,
    isLoading,
    notes: notes ?? []
  };
};

export default useNotes;
