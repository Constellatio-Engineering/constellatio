import { type Nullable } from "@/utils/types";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type GameStatus = "win" | "lose" | "inprogress";

type UserAnswersPerParagraph = {
  answers: string[];
  path: string;
};

type FillGapsGameState = {
  answerResult: string[];
  gameStatus: GameStatus;
  gameSubmitted: boolean;
  id: string;
  resultMessage: string;
  userAnswers: UserAnswersPerParagraph[];
};

type FillGapsGameStateUpdate = Partial<Pick<FillGapsGameState, "gameStatus" | "gameSubmitted" | "resultMessage" | "answerResult">>;

type FillGapsGameStore = {
  games: FillGapsGameState[];
  getGameState: (id: Nullable<string>) => FillGapsGameState | undefined;
  initializeNewGameState: (id: string) => void;
  updateGameState: (id: string, update: FillGapsGameStateUpdate) => void;
  updateUserAnswer: (params: { gameId: string; index: number; path: string; value: string}) => void;
};

const defaultFillGapsGameState: FillGapsGameState = {
  answerResult: [],
  gameStatus: "inprogress",
  gameSubmitted: false,
  id: "",
  resultMessage: "",
  userAnswers: [],
};

const useFillGapsGameStore = create(
  immer<FillGapsGameStore>((set, get) => ({
    games: [],
    getGameState: (id) =>
    {
      const { games } = get();

      if(id == null)
      {
        console.warn("id is null. cannot get game state");
        return;
      }

      const game = games.find(game => game.id === id);

      if(!game)
      {
        console.log("game not found");
      }

      return game;
    },
    initializeNewGameState: (id) =>
    {
      console.log("initializeNewGameState", id);

      const existingGame = get().games.find(game => game.id === id);

      if(existingGame)
      {
        console.info("game already exists. cannot initialize new game state");
        return;
      }

      set((state) =>
      {
        state.games = state.games.concat({
          ...defaultFillGapsGameState,
          id,
        });
      });

      console.log("new game state initialized successfully");
    },
    updateGameState: (id, update) =>
    {
      console.log("updateGameState", id, update);

      set((state) =>
      {
        const gameIndex = state.games.findIndex(game => game.id === id);

        if(gameIndex === -1)
        {
          const newGame: FillGapsGameState = {
            ...defaultFillGapsGameState,
            id,
            ...update,
          };

          state.games = state.games.concat(newGame);
          return;
        }

        const newGame: FillGapsGameState = {
          ...state.games[gameIndex]!,
          ...update
        };

        state.games[gameIndex] = newGame;
      });
    },
    updateUserAnswer: ({
      gameId,
      index,
      path,
      value
    }) =>
    {
      console.log("updateUserAnswer", gameId, path, index, value);

      const { games } = get();
      const gameIndex = games.findIndex(game => game.id === gameId);

      if(gameIndex === -1)
      {
        console.warn("game not found. cannot update user answer");
        return;
      }

      const game = games[gameIndex]!;
      const answersByPathIndex = game.userAnswers.findIndex(answers => answers.path === path);

      if(answersByPathIndex === -1)
      {
        console.warn(`answers not found for path '${path}'. creating new answers`);

        set((state) =>
        {
          const newAnswers: UserAnswersPerParagraph = {
            answers: [],
            path,
          };

          newAnswers.answers[index] = value;

          state.games[gameIndex]!.userAnswers = state.games[gameIndex]!.userAnswers.concat(newAnswers);
        });

        return;
      }

      set((state) =>
      {
        const answers = game.userAnswers[answersByPathIndex]!.answers!;
        const newAnswers = [...answers];
        newAnswers[index] = value;
        state.games[gameIndex]!.userAnswers[answersByPathIndex]!.answers = newAnswers;
      });
    }
  }))
);

export default useFillGapsGameStore;
