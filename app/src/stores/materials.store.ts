import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// 
interface MaterialsStore
{
  selectedFileIdForPreview: string;
  setSelectedFileIdForPreview: (selectedFileIdForPreview: string) => void;
  setShowFileViewerModal: (showFileViewerModal: boolean) => void;
  showFileViewerModal: boolean;
}

const useMaterialsStore = create(
  immer<MaterialsStore>((set, get) => ({
    selectedFileIdForPreview: "",
    setSelectedFileIdForPreview: (selectedFileIdForPreview) =>
    {
      set((state) =>
      {
        state.selectedFileIdForPreview = selectedFileIdForPreview;
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
