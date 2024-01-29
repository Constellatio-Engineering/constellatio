import type { GetQuestionsCursorType } from "@/schemas/forum/getQuestions.schema";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type ForumPageStoreProps = {
  closeAskQuestionModal: () => void;
  isAskQuestionModalOpen: boolean;
  openAskQuestionModal: () => void;
  questionsCursorType: GetQuestionsCursorType;
  setQuestionsCursorType: (cursorType: GetQuestionsCursorType) => void;
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
    questionsCursorType: "newest",
    setQuestionsCursorType: (cursorType) =>
    {
      set((state) =>
      {
        state.questionsCursorType = cursorType;
      });
    },
  }))
);
