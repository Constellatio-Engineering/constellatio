
import { allGameProgressStates } from "@constellatio/shared/validation";
import { z } from "zod";

import { idValidation } from "../../common/common.validation";

const gameOptionsSchema =
  z.object({
    correctAnswer: z.boolean(),
    id: z.string(),
    label: z.string(),
  });

const gameResultSchema = z.discriminatedUnion("gameType", [ 
  // DragDropGame
  z.object({
    correctAnswers: z.array(gameOptionsSchema),
    gameStatus: z.enum(["win", "lose", "lose-wrong-order", "inprogress"]),
    gameType: z.literal("DragDropGame"),
    userAnswers: z.array(gameOptionsSchema),
  }),
  // FillGapsGame
  z.object({
    correct: z.boolean(),
    correctAnswers: z.array(z.string()),
    gameType: z.literal("FillGapsGame"),
    userAnswers: z.array(z.string()),
  }),
  // SelectionCardGame
  z.object({
    correct: z.boolean(),
    correctAnswers: z.array(z.string()),
    gameType: z.literal("SelectionCardGame"),
    originalOptions: z.array(gameOptionsSchema),
    userAnswers: z.array(z.string()),
  })
]);

export const setGameProgressStateSchema = z.object({
  gameId: idValidation,
  gameResult: gameResultSchema.optional(),
  progressState: z.enum(allGameProgressStates),
});

export type SetGameProgressStateSchema = z.input<typeof setGameProgressStateSchema>;

export type GameResultSchemaType = z.infer<typeof gameResultSchema>;

