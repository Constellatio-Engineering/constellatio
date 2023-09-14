import { type TValue } from "@/components/Wrappers/DndGame/DndGame";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type TDragAndDropGameOptionType = TValue["options"][number];

type IDragDropGameStore = {
  activeId: string | null;
  addDroppedItem: (droppedItem: TDragAndDropGameOptionType) => void;
  addOptionItem: (optionItem: TDragAndDropGameOptionType) => void;
  deleteDroppedItem: (id: TDragAndDropGameOptionType["id"]) => void;
  deleteOptionItem: (id: TDragAndDropGameOptionType["id"]) => void;
  droppedItems: TDragAndDropGameOptionType[];
  gameStatus: "win" | "lose" | "inprogress";
  gameSubmitted: boolean;
  optionsItems: TDragAndDropGameOptionType[];
  resultMessage: string;
  setActiveId: (id: string | null) => void;
  setDroppedItems: (droppedItems: TDragAndDropGameOptionType[]) => void;
  setGameStatus: (status: "win" | "lose" | "inprogress") => void;
  setGameSubmitted: (gameSubmitted: boolean) => void;
  setOptionsItems: (optionsItems: TDragAndDropGameOptionType[]) => void;
  setResultMessage: (message: string) => void;
};

const useDragDropGameStore = create(
  immer<IDragDropGameStore>((set) => ({
    activeId: null,
    addDroppedItem(droppedItem) 
    {
      set((state) => 
      {
        state.droppedItems = [...state.droppedItems, droppedItem];
      });
    },
    addOptionItem(optionItem) 
    {
      set((state) => 
      {
        state.optionsItems = [...state.optionsItems, optionItem];
      });
    },
    deleteDroppedItem(id) 
    {
      set((state) => 
      {
        state.droppedItems = state.droppedItems.filter((droppedItem) => droppedItem.id !== id);
      });
    },
    deleteOptionItem(id) 
    {
      set((state) => 
      {
        state.optionsItems = state.optionsItems.filter((option) => option.id !== id);
      });
    },
    droppedItems: [],
    gameStatus: "inprogress",
    gameSubmitted: false,
    optionsItems: [],
    resultMessage: "",
    setActiveId(id) 
    {
      set((state) => 
      {
        state.activeId = id;
      });
    },
    setDroppedItems(droppedItems) 
    {
      set((state) => 
      {
        state.droppedItems = droppedItems;
      });
    },
    setGameStatus: (status) => 
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
    setOptionsItems: (optionsItems) => 
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
    },
  }))
);

export default useDragDropGameStore;
