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

type ForumPageStoreProps = {
  answerIdsWithActiveReplyInput: string[];
  answersWithExpandedReplies: string[];
  closeAnswerReplies: (answerId: string) => void;
  closeAnswerReplyInput: (answerId: string) => void;
  closeAskQuestionModal: () => void;
  expandAnswerReplies: (answerId: string) => void;
  getAreRepliesExpanded: (answerId: string) => boolean;
  getIsAnswerReplyInputOpen: (answerId: string) => boolean;
  getIsModalOpen: () => boolean;
  modalState: ModalState;
  openAnswerReplyInput: (answerId: string) => void;
  questionsCursorType: GetQuestionsCursorType;
  setCreateQuestionState: () => void;
  setEditQuestionState: (questionId: string) => void;
  setQuestionsCursorType: (cursorType: GetQuestionsCursorType) => void;
  toggleAnswerReplies: (answerId: string) => void;
  toggleAnswerReplyInput: (answerId: string) => void;
};

export const useForumPageStore = create(
  immer<ForumPageStoreProps>((set, get) => ({
    answerIdsWithActiveReplyInput: [],
    answersWithExpandedReplies: [],
    closeAnswerReplies: (answerId) =>
    {
      set((state) =>
      {
        state.answersWithExpandedReplies = state.answersWithExpandedReplies.filter((id) => id !== answerId);
      });

      get().closeAnswerReplyInput(answerId);
    },
    closeAnswerReplyInput: (answerId) =>
    {
      set((state) =>
      {
        state.answerIdsWithActiveReplyInput = state.answerIdsWithActiveReplyInput.filter((id) => id !== answerId);
      });
    },
    closeAskQuestionModal: () =>
    {
      set((state) =>
      {
        state.modalState = {
          state: "closed",
        };
      });
    },
    expandAnswerReplies: (answerId) =>
    {
      set((state) =>
      {
        state.answersWithExpandedReplies = [...new Set([...state.answersWithExpandedReplies, answerId])];
      });
    },
    getAreRepliesExpanded: (answerId) =>
    {
      return get().answersWithExpandedReplies.includes(answerId);
    },
    getIsAnswerReplyInputOpen: (answerId) =>
    {
      return get().answerIdsWithActiveReplyInput.includes(answerId);
    },
    getIsModalOpen: () =>
    {
      return get().modalState.state !== "closed";
    },
    isAskQuestionModalOpen: false,
    modalState: {
      state: "closed",
    },
    openAnswerReplyInput: (answerId) =>
    {
      set((state) =>
      {
        state.answerIdsWithActiveReplyInput = [...new Set([...state.answerIdsWithActiveReplyInput, answerId])];
      });
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
    setEditQuestionState: (questionId) =>
    {
      set((state) =>
      {
        state.modalState = {
          questionId,
          /* originalQuestion: {
            legalArea: question.legalArea,
            legalField: question.legalField,
            legalTopic: question.legalTopic,
            question: question.questionText,
            title: question.title,
          },*/
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
    toggleAnswerReplies: (answerId) =>
    {
      if(get().answersWithExpandedReplies.includes(answerId))
      {
        get().closeAnswerReplies(answerId);
      }
      else
      {
        get().expandAnswerReplies(answerId);
      }
    },
    toggleAnswerReplyInput: (answerId) =>
    {
      if(get().answerIdsWithActiveReplyInput.includes(answerId))
      {
        get().closeAnswerReplyInput(answerId);
      }
      else
      {
        get().openAnswerReplyInput(answerId);
      }
    },
  }))
);
