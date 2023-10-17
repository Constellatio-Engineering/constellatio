import { type IGenCardSelectionGame, type IGenCase, type IGenDragNDropGame, type IGenFillInGapsGame } from "@/services/graphql/__generated/sdk";
import { type Nullable } from "@/utils/types";

export type Game = (IGenCardSelectionGame | IGenDragNDropGame | IGenFillInGapsGame) & {
  indexInContentArray: number;
};
export type Games = Game[];

export const getGamesFromCase = (legalCase: Nullable<IGenCase>): Games =>
{
  const connections = legalCase?.fullTextTasks?.connections;

  if(!connections)
  {
    return [];
  }

  const games: Games = connections
    .map((connection, index) =>
    {
      const contentType = connection?.__typename;

      if(!contentType)
      {
        return null;
      }

      if(contentType === "CardSelectionGame" || contentType === "DragNDropGame" || contentType === "FillInGapsGame")
      {
        return {
          ...connection,
          indexInContentArray: index
        };
      }
      else
      {
        return null;
      }
    })
    .filter(Boolean);

  return games;
};
