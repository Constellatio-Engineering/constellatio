import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type TFillGapsGameStore = {
  answerResult: string[];
  gameStatus: "win" | "lose" | "inprogress";
  gameSubmitted: boolean;
  resultMessage: string;
  setAnswerResult: (answersResult: string[]) => void;
  setGameStatus: (status: "win" | "lose" | "inprogress") => void;
  setGameSubmitted: (gameSubmitted: boolean) => void;
  setResultMessage: (message: string) => void;
  setUserAnswers: (userAnswers: string[]) => void;
  updateUserAnswers: (index: number, value: string) => void;
  userAnswers: string[];
};

const useFillGapsGameStore = create(
  immer<TFillGapsGameStore>((set, get) => ({
    answerResult: [],
    gameStatus: "inprogress",
    gameSubmitted: false,
    resultMessage: "",
    setAnswerResult(answersResult)
    {
      set((state) => 
      {
        state.answerResult = answersResult;
      });
    },
    setGameStatus(status) 
    {
      set((state) => 
      {
        state.gameStatus = status;
      });
    },
    setGameSubmitted(gameSubmitted) 
    {
      set((state) => 
      {
        state.gameSubmitted = gameSubmitted;
      });
    },
    setResultMessage(message) 
    {
      set((state) => 
      {
        state.resultMessage = message;
      });
    },
    setUserAnswers(userAnswers)
    {
      set((state) => 
      {
        state.userAnswers = userAnswers;
      });
    },
    updateUserAnswers(index, value)
    {
      set((state) => 
      {
        const newAnswers = [...state.userAnswers];
        newAnswers[index] = value;
        state.userAnswers = newAnswers;
      });

    },
    userAnswers: [],
  }))
);

export default useFillGapsGameStore;
