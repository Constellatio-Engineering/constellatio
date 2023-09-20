import { type TValue } from "@/components/Wrappers/DndGame/DndGame";
import { type Nullable } from "@/utils/types";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type TDragAndDropGameOptionType = TValue["options"][number];

type GameStatus = "win" | "lose" | "inprogress";

type DragDropGameState = {
  activeId: string | null;
  droppedItems: TDragAndDropGameOptionType[];
  gameId: string;
  gameStatus: GameStatus;
  gameSubmitted: boolean;
  optionsItems: TDragAndDropGameOptionType[];
  resultMessage: string;
};

type DragDropGameStateUpdate = Partial<Pick<DragDropGameState, "gameStatus" | "gameSubmitted" | "resultMessage" | "droppedItems">>;

type IDragDropGameStore = {
  addDroppedItem: (droppedItem: TDragAndDropGameOptionType) => void;
  addOptionItem: (optionItem: TDragAndDropGameOptionType) => void;
  deleteDroppedItem: (id: TDragAndDropGameOptionType["id"]) => void;
  deleteOptionItem: (id: TDragAndDropGameOptionType["id"]) => void;
  games: DragDropGameState[];
  getGameState: (gameId: Nullable<string>) => DragDropGameState | undefined;
  initializeNewGameState: (gameId: string) => void;
  setActiveId: (id: string | null) => void;
  setDroppedItems: (droppedItems: TDragAndDropGameOptionType[]) => void;
  setGameStatus: (status: "win" | "lose" | "inprogress") => void;
  setGameSubmitted: (gameSubmitted: boolean) => void;
  setOptionsItems: (optionsItems: TDragAndDropGameOptionType[]) => void;
  setResultMessage: (message: string) => void;
  updateGameState: (gameId: string, update: DragDropGameStateUpdate) => void;
};

const defaultDragDropGameState: DragDropGameState = {
  activeId: null,
  droppedItems: [],
  gameId: "",
  gameStatus: "inprogress",
  gameSubmitted: false,
  optionsItems: [],
  resultMessage: "",
};

const useDragDropGameStore = create(
  immer<IDragDropGameStore>((set, get) => ({
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
    games: [],
    getGameState: (gameId) =>
    {
      const { games } = get();

      if(gameId == null)
      {
        console.warn("game Id is null. cannot get game state");
        return;
      }

      const game = games.find(game => game.gameId === gameId);

      return game;
    },
    initializeNewGameState: (gameId) =>
    {

      const existingGame = get().games.find(game => game.gameId === gameId);

      if(existingGame)
      {
        return;
      }

      set((state) =>
      {
        state.games = state.games.concat({
          ...defaultDragDropGameState,
          gameId,
        });
      });
    },
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
    updateGameState: (gameId, update) =>
    {
      set((state) =>
      {
        const gameIndex = state.games.findIndex(game => game.gameId === gameId);

        if(gameIndex === -1)
        {
          const newGame: DragDropGameState = {
            ...defaultDragDropGameState,
            gameId,
            ...update,
          };

          state.games = state.games.concat(newGame);
          return;
        }

        const newGame: DragDropGameState = {
          ...state.games[gameIndex]!,
          ...update
        };
        state.games[gameIndex] = newGame;
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
