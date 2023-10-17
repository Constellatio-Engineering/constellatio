import { type IGenCardSelectionGame, type IGenCase, type IGenDragNDropGame, type IGenFillInGapsGame } from "@/services/graphql/__generated/sdk";
import { type Nullable } from "@/utils/types";

export type Game = IGenCardSelectionGame | IGenDragNDropGame | IGenFillInGapsGame;
export type Games = Game[];

export const getGamesFromCase = (legalCase: Nullable<IGenCase>): Games =>
{
  const connections = legalCase?.fullTextTasks?.connections?.filter(Boolean);

  if(!connections)
  {
    return [];
  }

  const games = connections.filter(({ __typename: contentType }) =>
  {
    return (
      contentType === "CardSelectionGame" ||
      contentType === "DragNDropGame" ||
      contentType === "FillInGapsGame"
    );
  }) as Games;

  return games;
};
