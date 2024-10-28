import { type UploadedFile } from "@/db/schema";
import { getFileNameWithoutExtension } from "@/utils/utils";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type RenameFileModalClosed = {
  modalState: "closed";
};

type RenameFileModalOpened = {
  fileId: string;
  modalState: "open";
  newFilename: string;
  originalFilename: string;
};

type RenameFileModalState = RenameFileModalClosed | RenameFileModalOpened;

interface RenameFileModalStore
{
  closeRenameFileModal: () => void;
  getHasUnsavedChanges: () => boolean;
  openRenameFileModal: (file: UploadedFile) => void;
  renameFileModal: RenameFileModalState;
  updateFilename: (newFilename: string) => void;
}

const useRenameFileModalStore = create(
  immer<RenameFileModalStore>((set, get) => ({
    closeRenameFileModal: () =>
    {
      set((state) =>
      {
        state.renameFileModal = { modalState: "closed" };
      });
    },
    getHasUnsavedChanges: () =>
    {
      const { renameFileModal } = get();

      if(renameFileModal.modalState !== "open")
      {
        return false;
      }

      return ((renameFileModal.newFilename !== renameFileModal.originalFilename) && (renameFileModal.newFilename !== ""));
    },
    openRenameFileModal: (file) =>
    {
      const filenameWithoutExtension = getFileNameWithoutExtension(file.originalFilename);

      set((state) =>
      {
        state.renameFileModal = {
          fileId: file.id,
          modalState: "open",
          newFilename: filenameWithoutExtension,
          originalFilename: filenameWithoutExtension,
        };
      });
    },
    renameFileModal: {
      modalState: "closed",
    },
    updateFilename: (newFilename) =>
    {
      set((state) =>
      {
        if(state.renameFileModal.modalState === "open")
        {
          state.renameFileModal.newFilename = newFilename;
        }
      });
    },
  }))
);

export default useRenameFileModalStore;
