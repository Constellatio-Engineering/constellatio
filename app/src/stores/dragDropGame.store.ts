import { type TValue } from "@/components/Wrappers/DndGame/DndGame";
import { type Nullable } from "@/utils/types";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type TDragAndDropGameOptionType = TValue["options"][number];

type GameStatus = "win" | "lose" | "inprogress";

type DragDropGameState = {
  activeId: string | null;
  caseId: string;
  droppedItems: TDragAndDropGameOptionType[];
  gameId: string;
  gameStatus: GameStatus;
  gameSubmitted: boolean;
  optionsItems: TDragAndDropGameOptionType[];
  resultMessage: string;
};

type DragDropGameStateUpdate = Partial<Pick<DragDropGameState, "gameStatus" | "gameSubmitted" | "resultMessage" | "droppedItems" | "optionsItems" | "activeId">>;

type IDragDropGameStore = {
  games: DragDropGameState[];
  getGameState: (gameId: Nullable<string>) => DragDropGameState | undefined;
  initializeNewGameState: (params: {
    caseId: string;
    gameId: string;
  }) => void;
  resetGamesForCase: (caseId: string) => void;
  updateGameState: (params: {
    caseId: string;
    gameId: string;
    update: DragDropGameStateUpdate;
  }) => void;
};

type GetDefaultDragDropGameState = (params: {
  caseId: string;
  gameId: string;
}) => DragDropGameState;

const getDefaultDragDropGameState: GetDefaultDragDropGameState = ({ caseId, gameId }) => ({
  activeId: null,
  caseId,
  droppedItems: [],
  gameId,
  gameStatus: "inprogress",
  gameSubmitted: false,
  optionsItems: [],
  resultMessage: "",
});

const useDragDropGameStore = create(
  immer<IDragDropGameStore>((set, get) => ({
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

    initializeNewGameState: ({ caseId, gameId }) =>
    {
      const existingGame = get().games.find(game => game.gameId === gameId);

      if(existingGame)
      {
        return;
      }

      set((state) =>
      {
        state.games = state.games.concat({
          ...getDefaultDragDropGameState({ caseId, gameId }),
          gameId,
        });
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
            return getDefaultDragDropGameState({ caseId, gameId: game.gameId });
          }

          return game;
        });
      });
    },

    updateGameState: ({ caseId, gameId, update }) =>
    {
      set((state) =>
      {
        const gameIndex = state.games.findIndex(game => game.gameId === gameId);

        if(gameIndex === -1)
        {
          const newGame: DragDropGameState = {
            ...getDefaultDragDropGameState({ caseId, gameId }),
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
  }))
);

export default useDragDropGameStore;
