/* eslint-disable max-lines */
import { type Nullable } from "@/utils/types";

import { distance } from "fastest-levenshtein";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type GameStatus = "win" | "lose" | "inprogress";

type UserAnswersPerParagraph = {
  answers: string[];
  path: string;
};

type CorrectAnswersPerParagraph = {
  correctAnswers: string[];
  path: string;
};

type AnswersResultPerParagraph = {
  answersResult: string[];
  path: string;
};

type FillGapsGameState = {
  answerResult: AnswersResultPerParagraph[];
  correctAnswers: CorrectAnswersPerParagraph[];
  gameStatus: GameStatus;
  gameSubmitted: boolean;
  id: string;
  resultMessage: string;
  userAnswers: UserAnswersPerParagraph[];
};

type FillGapsGameStateUpdate = Partial<Pick<FillGapsGameState, "gameStatus" | "gameSubmitted" | "resultMessage" | "answerResult" | "userAnswers" >>;

type FillGapsGameStore = {
  checkAnswers: (params: { gameId: string }) => boolean;
  games: FillGapsGameState[];
  getGameState: (id: Nullable<string>) => FillGapsGameState | undefined;
  initializeNewGameState: (id: string) => void;
  updateCorrectAnswer: (params: { gameId: string; innerContent: string[]; path: string}) => void;
  updateGameState: (id: string, update: FillGapsGameStateUpdate) => void;
  updateUserAnswer: (params: { gameId: string; index: number; path: string; value: string}) => void;
};

const defaultFillGapsGameState: FillGapsGameState = {
  answerResult: [],
  correctAnswers: [],
  gameStatus: "inprogress",
  gameSubmitted: false,
  id: "",
  resultMessage: "",
  userAnswers: [],
};

const useFillGapsGameStore = create(
  immer<FillGapsGameStore>((set, get) => ({
    checkAnswers: ({ gameId }) => 
    {
      const { games } = get();
      const gameIndex = games.findIndex(game => game.id === gameId);

      if(gameIndex === -1)
      {
        console.warn("game not found. cannot update answers result");
        return false;
      }

      const game = games[gameIndex]!;
      let allCorrect = true;
      
      const answersResult = game.userAnswers.map((userAnswer) =>
      {
        const correctAnswers = game.correctAnswers.find(correctAnswer => correctAnswer.path === userAnswer.path);

        if(!correctAnswers)
        {
          console.warn(`correct answers not found for path '${userAnswer.path}'. cannot update answers result`);
          return null;
        }

        const answersResult: AnswersResultPerParagraph = {
          answersResult: new Array(userAnswer.answers.length).fill(null),
          path: userAnswer.path,
        };

        userAnswer.answers.forEach((answer, index) =>
        {
          let isAnswerCorrect = false;
          const possibleCorrectAnswer = correctAnswers?.correctAnswers?.[index]?.split(";");
          for(const possibleAnswer of possibleCorrectAnswer!)
          {
            const userAnswer = answer.trim().toLowerCase();
            const correctAnswer = possibleAnswer.trim().toLowerCase();
            
            if(!isNaN(Number(userAnswer)) || correctAnswer!.length <= 4)
            {
              // If correct answer is number or a short word, require an exact match
              if(userAnswer === correctAnswer)
              {
                isAnswerCorrect = true;
                break;
              }
              
            }
            else 
            {
              // check for distance
              const dist = distance(userAnswer, correctAnswer!);
              if(dist <= 2)
              {
                isAnswerCorrect = true;
                break;
              }
            }
          }
          if(isAnswerCorrect)
          {
            answersResult.answersResult[index] = "correct";
          }
          else 
          {
            answersResult.answersResult[index] = "incorrect";
            allCorrect = false;
          }
          
        });
        return answersResult;
      }).filter(Boolean) as AnswersResultPerParagraph[];

      set((state) =>
      {
        state.games[gameIndex]!.answerResult = answersResult;
      });

      return allCorrect;
    },
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

      return game;
    },

    initializeNewGameState: (id) =>
    {

      const existingGame = get().games.find(game => game.id === id);

      if(existingGame)
      {
        return;
      }

      set((state) =>
      {
        state.games = state.games.concat({
          ...defaultFillGapsGameState,
          id,
        });
      });
    },

    updateCorrectAnswer: ({ gameId, innerContent, path }) => 
    {

      const { games } = get();
      const gameIndex = games.findIndex(game => game.id === gameId);

      if(gameIndex === -1)
      {
        return;
      }

      const game = games[gameIndex]!;
      const correctAnswersByPathIndex = game.correctAnswers.findIndex(answers => answers.path === path);

      if(correctAnswersByPathIndex === -1)
      {

        set((state) =>
        {
          const newCorrectAnswers: CorrectAnswersPerParagraph = {
            correctAnswers: innerContent,
            path,
          };

          newCorrectAnswers.correctAnswers = innerContent;

          state.games[gameIndex]!.correctAnswers = state.games[gameIndex]!.correctAnswers.concat(newCorrectAnswers);
        });

        return;
      }

      set((state) =>
      {
        state.games[gameIndex]!.correctAnswers[correctAnswersByPathIndex]!.correctAnswers = innerContent;
      });
    },

    updateGameState: (id, update) =>
    {
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
      const { games } = get();
      const gameIndex = games.findIndex(game => game.id === gameId);

      if(gameIndex === -1)
      {
        return;
      }

      const game = games[gameIndex]!;
      const answersByPathIndex = game.userAnswers.findIndex(answers => answers.path === path);

      if(answersByPathIndex === -1)
      {
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
