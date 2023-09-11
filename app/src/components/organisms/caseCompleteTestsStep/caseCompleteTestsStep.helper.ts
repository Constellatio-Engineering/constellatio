import { type IGenCase_FullTextTasks } from "@/services/graphql/__generated/sdk";

import { type Maybe } from "@trpc/server";

export const getGamesIndexes = ({ fullTextTasks }: {fullTextTasks: Maybe<IGenCase_FullTextTasks> | undefined}): number[] => 
{
  const gameComponents = fullTextTasks?.connections?.filter((component) => component?.__typename === "CardSelectionGame" || component?.__typename === "DragNDropGame" || component?.__typename === "FillInGapsGame").map(game => ({ __typename: game?.__typename, id: game?.id })) ?? [];
  
  const indexes = [];
  for(const game of gameComponents) 
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gameIndex = fullTextTasks?.json?.content?.findIndex((item: any) => item?.type === "documentLink" && item?.attrs?.documentId === game?.id);
    if(gameIndex !== -1) { indexes.push(gameIndex); }
  }
  return indexes;
};
