import { type Nullable } from "@/utils/types";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type ModalImage = {
  alt: string;
  height: Nullable<number>;
  url: string;
  width: Nullable<number>;
};

type ModalClosed = {
  isOpened: false;
  lastImage: ModalImage | undefined;
};

export type ModalOpened = {
  image: ModalImage;
  isOpened: true;
};

type ModalState = ModalClosed | ModalOpened;

type ModalStore = {
  closeModal: () => void;
  modalState: ModalState;
  openModal: (image: ModalImage) => void;
};

export const useLightboxModalStore = create(
  immer<ModalStore>((set, _get) => ({
    closeModal: () =>
    {
      set((state) =>
      {
        state.modalState = {
          isOpened: false,
          lastImage: state.modalState.isOpened ? state.modalState.image : undefined
        };
      });
    },
    modalState: {
      isOpened: false,
      lastImage: undefined
    },
    openModal: (image: ModalImage) =>
    {
      set((state) =>
      {
        state.modalState = {
          image,
          isOpened: true 
        };
      });
    }
  }))
);
