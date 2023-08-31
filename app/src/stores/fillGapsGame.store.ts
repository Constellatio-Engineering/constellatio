import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type TFillGapsGameStore = {
  gameStatus: "win" | "lose" | "inprogress";
  resultMessage: string;

  setGameStatus: (status: "win" | "lose" | "inprogress") => void;
  setResultMessage: (message: string) => void;
};

const useFillGapsGameStore = create(
  immer<TFillGapsGameStore>((set) => ({
    gameStatus: "inprogress",
    resultMessage: "",

    setGameStatus(status) 
    {
      set((state) => 
      {
        state.gameStatus = status;
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
