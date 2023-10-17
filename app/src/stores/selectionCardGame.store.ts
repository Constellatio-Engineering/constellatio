import { type TValue } from "@/components/Wrappers/SelectionGame/SelectionGame";
import { type Nullable } from "@/utils/types";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type TCardGameOption = TValue["options"][number];
export type TCardGameOptionWithCheck = TCardGameOption & { checked: boolean };

type GameStatus = "win" | "lose" | "inprogress";

type SelectionCardGameState = {
  caseId: string;
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
  initializeNewGameState: (params: {
    caseId: string;
    gameId: string;
  }) => void;
  resetGamesForCase: (caseId: string) => void;
  updateGameState: (params: {
    caseId: string;
    gameId: string;
    update: SelectionCardGameStateUpdate;
  }) => void;
};

type GetDefaultSelectionCardGameState = (params: {
  caseId: string;
  gameId: string;
}) => SelectionCardGameState;

const getDefaultSelectionCardGameState: GetDefaultSelectionCardGameState = ({ caseId, gameId }) => ({
  caseId,
  gameId,
  gameStatus: "inprogress",
  gameSubmitted: false,
  optionsItems: [],
  resetCounter: 0,
  resultMessage: "",
});

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
        ...getDefaultSelectionCardGameState({ caseId, gameId }),
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
          return getDefaultSelectionCardGameState({ caseId, gameId: game.gameId });
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
        const newGame: SelectionCardGameState = {
          ...getDefaultSelectionCardGameState({ caseId, gameId }),
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
