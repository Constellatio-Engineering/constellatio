import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

import { type AppRouter } from "@constellatio/api";
import { type Note } from "@constellatio/db/schema";
import { type inferReactQueryProcedureOptions } from "@trpc/react-query";

type UseNotes = (
  options?: inferReactQueryProcedureOptions<AppRouter>["notes"]["getNotes"]
) => UseQueryResult<{
  notesForFilesInAllFolders: Note[];
}>;

const useNotes: UseNotes = (options) =>
{
  const { data: notes = [], error, isLoading } = api.notes.getNotes.useQuery({ folderId: undefined }, {
    ...options,
    refetchOnMount: "always",
    staleTime: Infinity
  });

  return {
    error,
    isLoading,
    notesForFilesInAllFolders: notes ?? [],
  };
};

export default useNotes;
