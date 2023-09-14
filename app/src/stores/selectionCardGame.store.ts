import { type TValue } from "@/components/Wrappers/SelectionGame/SelectionGame";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type TCardGameOptionWithCheck = TCardGameOption & { checked: boolean };
export type TCardGameOption = TValue["options"][number];

type TSelectionCardGameStore = {
  gameStatus: "win" | "lose" | "inprogress";
  gameSubmitted: boolean;
  onOptionCheck: (id: TCardGameOption["id"], checked: TCardGameOptionWithCheck["checked"]) => void;
  optionsItems: TCardGameOptionWithCheck[];
  resultMessage: string;
  setGameStatus: (status: "win" | "lose" | "inprogress") => void;
  setGameSubmitted: (gameSubmitted: boolean) => void;
  setOptionsItems: (optionsItems: TCardGameOptionWithCheck[]) => void;
  setResultMessage: (message: string) => void;
};

const useSelectionCardGameStore = create(immer<TSelectionCardGameStore> ((set) => ({
  gameStatus: "inprogress",
  gameSubmitted: false,
  onOptionCheck(id, checked) 
  {
    set((state) => 
    {
      state.optionsItems = state.optionsItems.map((item) => 
      {
        if(item.id === id) 
        {
          item.checked = checked;
        }
        return item;
      });
    });
  },
  optionsItems: [],
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
  setOptionsItems(optionsItems) 
  {
    set((state) => 
    {
      state.optionsItems = optionsItems;
    });
  },
  setResultMessage(message) 
  {
    set((state) => 
    {
      state.resultMessage = message;
    });
  }
})));

export default useSelectionCardGameStore;
