import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import useMaterialsStore from "@/stores/materials.store";
import { api } from "@/utils/api";

import { notifications } from "@mantine/notifications";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useDeleteFolder = () =>
{
  const setSelectedFolderId = useMaterialsStore(s => s.setSelectedFolderId);
  const {
    invalidateDocuments,
    invalidateFolders,
    invalidateNotes,
    invalidateUploadedFiles
  } = useContextAndErrorIfNull(InvalidateQueriesContext);

  return api.folders.deleteFolder.useMutation({
    onError: (error) =>
    {
      console.error("error while deleting folder", error);
      notifications.show({
        color: "red",
        message: "Der Ordner konnte nicht gelöscht werden",
      });
    },
    onSuccess: async () =>
    {
      await Promise.all([
        invalidateDocuments(),
        invalidateNotes(),
        invalidateUploadedFiles(),
        invalidateFolders()
      ]);

      setSelectedFolderId(null);
      notifications.show({
        color: "green",
        message: "Der Ordner wurde erfolgreich gelöscht",
        title: "Ordner gelöscht"
      });
    }
  });
};

export default useDeleteFolder;
