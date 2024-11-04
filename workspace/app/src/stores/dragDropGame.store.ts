/* eslint-disable max-lines */
import { type TValue } from "@/components/Wrappers/DndGame/DndGame";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type TDragAndDropGameOptionType = TValue["options"][number] & {
  originalIndex: number;
};

export type GameStatus = "win" | "lose" | "lose-wrong-order" | "inprogress";

type DragDropGameState = {
  caseId: string;
  droppedItems: TDragAndDropGameOptionType[];
  gameId: string;
  gameStatus: GameStatus;
  gameSubmitted: boolean;
  optionsItems: TDragAndDropGameOptionType[];
  originalOptionsItems: TDragAndDropGameOptionType[];
  resultMessage: string | null;
};

type DragDropGameStateUpdate = Partial<Pick<DragDropGameState, "gameStatus" | "gameSubmitted" | "resultMessage" | "droppedItems" | "optionsItems">>;

type IDragDropGameStore = {
  games: DragDropGameState[];
  getGameState: (params: {
    caseId: string;
    gameData: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    gameId: string;
  }) => DragDropGameState;
  moveItem: (params: {
    gameId: string;
    itemSourceIndex: number;
    newPositionIndex: number | null;
    to: "droppedItems" | "optionsItems";
  }) => void;
  reorderDroppedItems: (params: {
    gameId: string;
    itemSourceIndex: number;
    newPositionIndex: number;
  }) => void;
  resetGamesForCase: (caseId: string) => void;
  updateGameState: (params: {
    gameId: string;
    update: DragDropGameStateUpdate;
  }) => void;
};

type GetDefaultDragDropGameState = (params: {
  caseId: string;
  gameId: string;
  optionsItems: TDragAndDropGameOptionType[];
}) => DragDropGameState;

const getDefaultDragDropGameState: GetDefaultDragDropGameState = ({ caseId, gameId, optionsItems }) => ({
  caseId,
  droppedItems: [],
  gameId,
  gameStatus: "inprogress",
  gameSubmitted: false,
  optionsItems,
  originalOptionsItems: optionsItems,
  resultMessage: "",
});

const useDragDropGameStore = create(
  immer<IDragDropGameStore>((set, get) => ({
    games: [],
    getGameState: ({ caseId, gameData, gameId }) =>
    {
      const { games } = get();
      const game = games.find(game => game.gameId === gameId);

      if(game)
      {
        return game;
      }

      const newGame = getDefaultDragDropGameState({
        caseId,
        gameId,
        optionsItems: gameData.options 
      });

      set((state) =>
      {
        state.games = state.games.concat(newGame);
      });

      // const createdGame = get().games.find(game => game.gameId === gameId)!;

      return newGame;
    },
    moveItem: ({
      gameId,
      itemSourceIndex,
      newPositionIndex,
      to
    }) =>
    {
      set((state) =>
      {
        const gameIndex = state.games.findIndex(game => game.gameId === gameId);

        if(gameIndex === -1)
        {
          console.error("game not found");
          return;
        }

        const game = state.games[gameIndex]!;

        let { droppedItems, optionsItems } = game;

        if(to === "droppedItems")
        {
          const movedItem = optionsItems[itemSourceIndex];

          if(!movedItem)
          {
            console.error("Moved item not found");
            return;
          }

          const _newPositionIndex = newPositionIndex == null ? droppedItems.length : newPositionIndex;

          droppedItems.splice(_newPositionIndex, 0, movedItem);
          optionsItems = optionsItems.filter(item => item.id !== movedItem.id);
        }
        else
        {
          const movedItem = droppedItems[itemSourceIndex];

          if(!movedItem)
          {
            console.error("Moved item not found");
            return;
          }

          const _newPositionIndex = newPositionIndex == null ? droppedItems.length : newPositionIndex;

          optionsItems.splice(_newPositionIndex, 0, movedItem);
          droppedItems = droppedItems.filter(item => item.id !== movedItem.id);
        }

        const newGame: DragDropGameState = {
          ...game,
          droppedItems,
          optionsItems,
        };

        state.games[gameIndex] = newGame;
      });
    },
    reorderDroppedItems: ({ gameId, itemSourceIndex, newPositionIndex }) =>
    {
      set((state) =>
      {
        const gameIndex = state.games.findIndex(game => game.gameId === gameId);

        if(gameIndex === -1)
        {
          console.error("game not found");
          return;
        }

        const game = state.games[gameIndex]!;
        const droppedItem = game.droppedItems[itemSourceIndex];

        if(!droppedItem)
        {
          console.error("Reordered item not found");
          return;
        }

        game.droppedItems.splice(itemSourceIndex, 1);
        game.droppedItems.splice(newPositionIndex, 0, droppedItem);

        state.games[gameIndex] = game;
      });
    },
    resetGamesForCase: (caseId) =>
    {
      set((state) =>
      {
        state.games = state.games.map((game) =>
        {
          if(game.caseId === caseId)
          {
            return getDefaultDragDropGameState({
              caseId,
              gameId: game.gameId,
              optionsItems: game.originalOptionsItems
            });
          }

          return game;
        });
      });
    },
    updateGameState: ({ gameId, update }) =>
    {
      set((state) =>
      {
        const gameIndex = state.games.findIndex(game => game.gameId === gameId);

        if(gameIndex === -1)
        {
          throw new Error("Game not found");
        }

        const newGame: DragDropGameState = {
          ...state.games[gameIndex]!,
          ...update
        };
        state.games[gameIndex] = newGame;
      });
    },
  }))
);

export default useDragDropGameStore;
