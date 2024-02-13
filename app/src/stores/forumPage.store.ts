import { type GetAnswersSortingOptions } from "@/schemas/forum/getAnswers.schema";
import type { GetQuestionsCursorType } from "@/schemas/forum/getQuestions.schema";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type ModalClosed = {
  state: "closed";
};

type EditQuestion = {
  questionId: string;
  // originalQuestion: PostQuestionSchema;
  state: "edit";
};

type CreateQuestion = {
  state: "create";
};

type ModalState = ModalClosed | EditQuestion | CreateQuestion;

type RepliesState = "closed" | "view" | "add";

type AnswersWithRepliesState = {
  [answerId: string]: RepliesState;
};

type ForumPageStoreProps = {
  answersSorting: GetAnswersSortingOptions;
  closeAskQuestionModal: () => void;
  getAreRepliesExpanded: (answerId: string) => boolean;
  getIsModalOpen: () => boolean;
  getRepliesState: (answerId: string) => RepliesState;
  modalState: ModalState;
  questionsCursorType: GetQuestionsCursorType;
  repliesStates: AnswersWithRepliesState;
  setAnswersSorting: (newSorting: GetAnswersSortingOptions) => void;
  setCreateQuestionState: () => void;
  setEditQuestionState: (questionId: string) => void;
  setQuestionsCursorType: (cursorType: GetQuestionsCursorType) => void;
  setRepliesState: (answerId: string, state: RepliesState) => void;
  toggleAnswerReplies: (answerId: string) => void;
};

export const useForumPageStore = create(
  immer<ForumPageStoreProps>((set, get) => ({
    answerIdsWithActiveReplyInput: [],
    answersSorting: "newest",
    answersWithExpandedReplies: [],
    closeAskQuestionModal: () =>
    {
      set((state) =>
      {
        state.modalState = {
          state: "closed",
        };
      });
    },
    getAreRepliesExpanded: (answerId) =>
    {
      const repliesState = get().repliesStates[answerId] ?? "closed";
      return repliesState !== "closed";
    },
    getIsModalOpen: () =>
    {
      return get().modalState.state !== "closed";
    },
    getRepliesState: (answerId) =>
    {
      const repliesState = get().repliesStates[answerId];
      return repliesState ?? "closed";
    },
    isAskQuestionModalOpen: false,
    modalState: {
      state: "closed",
    },
    questionsCursorType: "newest",
    repliesStates: {},
    setAnswersSorting: (newSorting) =>
    {
      set((state) =>
      {
        state.answersSorting = newSorting;
      });
    },
    setCreateQuestionState: () => 
    {
      set((state) => 
      {
        state.modalState = {
          state: "create",
        };
      });
    },
    setEditQuestionState: (questionId) =>
    {
      set((state) =>
      {
        state.modalState = {
          questionId,
          state: "edit",
        };
      });
    },
    setQuestionsCursorType: (cursorType) =>
    {
      set((state) =>
      {
        state.questionsCursorType = cursorType;
      });
    },
    setRepliesState: (answerId, newState) =>
    {
      set((state) => 
      {
        state.repliesStates[answerId] = newState;
      });
    },
    toggleAnswerReplies: (answerId) =>
    {
      const repliesState = get().repliesStates[answerId] ?? "closed";

      if(repliesState === "closed")
      {
        get().setRepliesState(answerId, "view");
      }
      else
      {
        get().setRepliesState(answerId, "closed");
      }
    },
  }))
);
