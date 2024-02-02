import type { GetQuestionsCursorType } from "@/schemas/forum/getQuestions.schema";
import { type PostQuestionSchema } from "@/schemas/forum/postQuestion.schema";
import { type Question } from "@/server/api/routers/forum.router";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type ModalClosed = {
  state: "closed";
};

type EditQuestion = {
  originalQuestion: PostQuestionSchema;
  state: "edit";
};

type CreateQuestion = {
  state: "create";
};

type ModalState = ModalClosed | EditQuestion | CreateQuestion;

type ForumPageStoreProps = {
  closeAskQuestionModal: () => void;
  getIsModalOpen: () => boolean;
  modalState: ModalState;
  questionsCursorType: GetQuestionsCursorType;
  setCreateQuestionState: () => void;
  setEditQuestionState: (question: Question) => void;
  setQuestionsCursorType: (cursorType: GetQuestionsCursorType) => void;
};

export const useForumPageStore = create(
  immer<ForumPageStoreProps>((set, get) => ({
    closeAskQuestionModal: () =>
    {
      set((state) =>
      {
        state.modalState = {
          state: "closed",
        };
      });
    },
    getIsModalOpen: () =>
    {
      return get().modalState.state !== "closed";
    },
    isAskQuestionModalOpen: false,
    modalState: {
      state: "closed",
    },
    questionsCursorType: "newest",
    setCreateQuestionState: () => 
    {
      set((state) => 
      {
        state.modalState = {
          state: "create",
        };
      });
    },
    setEditQuestionState: (question) =>
    {
      set((state) =>
      {
        state.modalState = {
          originalQuestion: {
            legalArea: question.legalArea,
            legalField: question.legalField,
            legalTopic: question.legalTopic,
            question: question.questionText,
            title: question.title,
          },
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
  }))
);
