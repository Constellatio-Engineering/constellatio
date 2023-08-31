import { type TValue } from "@/components/Wrappers/SelectionGame/SelectionGame";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type TCardGameOptionWithCheck = TCardGameOption & { checked: boolean };
export type TCardGameOption = TValue["options"][number];

type TSelectionCardGameStore = {
  gameStatus: "win" | "lose" | "inprogress";
  onOptionCheck: (id: TCardGameOption["id"], checked: TCardGameOptionWithCheck["checked"]) => void;
  optionsItems: TCardGameOptionWithCheck[];
  resultMessage: string;
  setGameStatus: (status: "win" | "lose" | "inprogress") => void;
  setOptionsItems: (optionsItems: TCardGameOptionWithCheck[]) => void;
  setResultMessage: (message: string) => void;
};

const useSelectionCardGameStore = create(immer<TSelectionCardGameStore> ((set) => ({
  gameStatus: "inprogress",
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
