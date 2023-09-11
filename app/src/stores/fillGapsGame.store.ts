import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type TFillGapsGameStore = {
  gameStatus: "win" | "lose" | "inprogress";
  gameSubmitted: boolean;

  resultMessage: string;
  setGameStatus: (status: "win" | "lose" | "inprogress") => void;
  setGameSubmitted: (gameSubmitted: boolean) => void;
  setResultMessage: (message: string) => void;
};

const useFillGapsGameStore = create(
  immer<TFillGapsGameStore>((set) => ({
    gameStatus: "inprogress",
    gameSubmitted: false,
    resultMessage: "",
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
  }))
);

export default useFillGapsGameStore;
