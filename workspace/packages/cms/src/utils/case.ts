import { type CaseProgressState } from "@constellatio/shared/validation";
import { type Nullable } from "@constellatio/utility-types";

import { type FullLegalCase } from "../content/getCaseById";
import { type IGenCardSelectionGame, type IGenDragNDropGame, type IGenFillInGapsGame } from "../graphql/__generated/sdk";

type Game = (IGenCardSelectionGame | IGenDragNDropGame | IGenFillInGapsGame) & {
  indexInFullTextTasksJson: number;
};
export type Games = Game[];

export const getGamesFromCase = (legalCase: Nullable<FullLegalCase>): Games =>
{
  const fullTextTasks = legalCase?.fullTextTasks;
  const connections = fullTextTasks?.connections;

  if(!connections)
  {
    return [];
  }

  const games: Games = connections
    .map(connection =>
    {
      const contentType = connection?.__typename;

      if(!contentType || !(contentType === "CardSelectionGame" || contentType === "DragNDropGame" || contentType === "FillInGapsGame"))
      {
        return null;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const gameIndex = fullTextTasks?.json?.content?.findIndex((item: any) =>
      {
        return item?.type === "documentLink" && item?.attrs?.documentId === connection?.id;
      });

      return {
        ...connection,
        indexInFullTextTasksJson: gameIndex
      };
    })
    .filter(Boolean);

  return games;
};

export const getCaseProgressStateAsNumber = (progressState: CaseProgressState): number =>
{
  let caseProgressStateAsNumber: number;

  switch (progressState)
  {
    case "not-started":
    case "completing-tests":
    {
      caseProgressStateAsNumber = 0;
      break;
    }
    case "solving-case":
    {
      caseProgressStateAsNumber = 1;
      break;
    }
    case "completed":
    {
      caseProgressStateAsNumber = 2;
      break;
    }
    default:
    {
      console.error("Unknown caseProgressState: ", progressState);
      caseProgressStateAsNumber = 0;
      break;
    }
  }

  return caseProgressStateAsNumber;
};
