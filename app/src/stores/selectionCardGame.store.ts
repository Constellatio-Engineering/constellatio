import { type TValue } from "@/components/Wrappers/SelectionGame/SelectionGame";
import { type Nullable } from "@/utils/types";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type TCardGameOption = TValue["options"][number];
export type TCardGameOptionWithCheck = TCardGameOption & { checked: boolean };

type GameStatus = "win" | "lose" | "inprogress";

type SelectionCardGameState = {
  gameId: string;
  gameStatus: GameStatus;
  gameSubmitted: boolean;
  optionsItems: TCardGameOptionWithCheck[];
  resetCounter: number;
  resultMessage: string;
};

type SelectionCardGameStateUpdate = Partial<Pick<SelectionCardGameState, "gameStatus" | "gameSubmitted" | "resultMessage" | "optionsItems" | "resetCounter">>;

type TSelectionCardGameStore = {
  games: SelectionCardGameState[];
  getGameState: (gameId: Nullable<string>) => SelectionCardGameState | undefined;
  initializeNewGameState: (gameId: string) => void;
  updateGameState: (gameId: string, update: SelectionCardGameStateUpdate) => void;
};

const defaultSelectionCardGameState: SelectionCardGameState = {
  gameId: "",
  gameStatus: "inprogress",
  gameSubmitted: false,
  optionsItems: [],
  resetCounter: 0,
  resultMessage: "",
};

const useSelectionCardGameStore = create(immer<TSelectionCardGameStore> ((set, get) => ({
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
        ...defaultSelectionCardGameState,
        gameId,
      });
    });
  },

  updateGameState: (gameId, update) =>
  {
    set((state) =>
    {
      const gameIndex = state.games.findIndex(game => game.gameId === gameId);

      if(gameIndex === -1)
      {
        const newGame: SelectionCardGameState = {
          ...defaultSelectionCardGameState,
          gameId,
          ...update,
        };

        state.games = state.games.concat(newGame);
        return;
      }

      const newGame: SelectionCardGameState = {
        ...state.games[gameIndex]!,
        ...update
      };
      state.games[gameIndex] = newGame;
    });
  },
})));

export default useSelectionCardGameStore;
