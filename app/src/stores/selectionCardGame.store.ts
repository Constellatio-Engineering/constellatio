import { type TValue } from "@/components/Wrappers/SelectionGame/SelectionGame";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type TCardGameOption = TValue["options"][number];
// export type TCardGameOptionWithCheck = TCardGameOption & { checked: boolean };

type GameStatus = "win" | "lose" | "inprogress";

type SelectionCardGameState = {
  caseId: string;
  checkedAnswersIds: string[];
  gameId: string;
  gameStatus: GameStatus;
  gameSubmitted: boolean;
  resetCounter: number;
  resultMessage: string;
};

type SelectionCardGameStateUpdate = Partial<Pick<SelectionCardGameState, "gameStatus" | "gameSubmitted" | "resultMessage" | "checkedAnswersIds" | "resetCounter">>;

type TSelectionCardGameStore = {
  games: SelectionCardGameState[];
  getGameState: (params: {
    caseId: string;
    gameId: string;
  }) => SelectionCardGameState;
  resetGamesForCase: (caseId: string) => void;
  toggleAnswer: (params: {
    answerId: string;
    gameId: string;
  }) => void;
  updateGameState: (params: {
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
  checkedAnswersIds: [],
  gameId,
  gameStatus: "inprogress",
  gameSubmitted: false,
  resetCounter: 0,
  resultMessage: "",
});

const useSelectionCardGameStore = create(immer<TSelectionCardGameStore> ((set, get) => ({
  games: [],

  getGameState: ({ caseId, gameId }) =>
  {
    const { games } = get();
    const game = games.find(game => game.gameId === gameId);

    if(game)
    {
      return game;
    }

    const newGame = getDefaultSelectionCardGameState({ caseId, gameId });

    newGame.checkedAnswersIds = [];

    set((state) =>
    {
      state.games = state.games.concat(newGame);
    });

    return newGame;
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

  toggleAnswer: ({ answerId, gameId }) =>
  {
    set((state) =>
    {
      const gameIndex = state.games.findIndex(game => game.gameId === gameId);

      if(gameIndex === -1)
      {
        throw new Error("Game not found");
      }

      const game = state.games[gameIndex]!;
      const answerIndex = game.checkedAnswersIds.indexOf(answerId);

      if(answerIndex === -1)
      {
        game.checkedAnswersIds.push(answerId);
      }
      else
      {
        game.checkedAnswersIds.splice(answerIndex, 1);
      }
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

      const newGame: SelectionCardGameState = {
        ...state.games[gameIndex]!,
        ...update
      };
      state.games[gameIndex] = newGame;
    });
  },
})));

export default useSelectionCardGameStore;
