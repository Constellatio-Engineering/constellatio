import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface MaterialsStore
{
  selectedFileIdForPreview: string;
  selectedFolderId: string | null | undefined;
  setSelectedFileIdForPreview: (selectedFileIdForPreview: string) => void;
  setSelectedFolderId: (selectedFolderId: string | null | undefined) => void;
  setShowFileViewerModal: (showFileViewerModal: boolean) => void;
  showFileViewerModal: boolean;
}

const useMaterialsStore = create(
  immer<MaterialsStore>((set, _) => ({
    selectedFileIdForPreview: "",
    selectedFolderId: null,
    setSelectedFileIdForPreview: (selectedFileIdForPreview) =>
    {
      set((state) =>
      {
        state.selectedFileIdForPreview = selectedFileIdForPreview;
      });
    },
    setSelectedFolderId: (selectedFolderId) =>
    {
      set((state) =>
      {
        state.selectedFolderId = selectedFolderId;
      });
    },
    setShowFileViewerModal: (showFileViewerModal) =>
    {
      set((state) =>
      {
        state.showFileViewerModal = showFileViewerModal;
      });
    },
    showFileViewerModal: false,
  }))
);

export default useMaterialsStore;
