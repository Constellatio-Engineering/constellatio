import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type ForumPageStoreProps = {
  closeAskQuestionModal: () => void;
  isAskQuestionModalOpen: boolean;
  openAskQuestionModal: () => void;
};

export const useForumPageStore = create(
  immer<ForumPageStoreProps>((set, _get) => ({
    closeAskQuestionModal: () =>
    {
      set((state) =>
      {
        state.isAskQuestionModalOpen = false;
      });
    },
    isAskQuestionModalOpen: false,
    openAskQuestionModal: () =>
    {
      set((state) =>
      {
        state.isAskQuestionModalOpen = true;
      });
    },
  }))
);
