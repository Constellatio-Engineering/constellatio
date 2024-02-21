import FavoriteCard from "@/components/molecules/favoriteCard/FavoriteCard";
import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import { type Favorites, type FavoritesNullable } from "@/hooks/useAllFavorites";
import { appPaths } from "@/utils/paths";

import { useRouter } from "next/router";
import React, { type FunctionComponent } from "react";

import * as styles from "./FavoritesExcerpt.styles";

type Props = {
  readonly favorites: FavoritesNullable;
  readonly isLoading: boolean;
  readonly shouldSortByCreatedAt: boolean;
};

const FavoritesExcerpt: FunctionComponent<Props> = ({ favorites, isLoading = false, shouldSortByCreatedAt }) =>
{
  const router = useRouter();

  if(isLoading)
  {
    return (
      <>
        <FavoriteCard isLoading/>
        <FavoriteCard isLoading/>
        <FavoriteCard isLoading/>
      </>
    );
  }

  if(favorites.length === 0)
  {
    return (
      <div css={styles.emptyCard}>
        <EmptyStateCard
          title="Noch keine Favoriten vorhanden"
          text="Speichere jetzt Fälle oder Lexikonartikel als Favoriten in deinem persönlichen Bereich."
          variant="For-small-areas"
          button={{
            content: "Alle Fälle ansehen",
            onClick: async () => router.push(appPaths.cases)
          }}
        />
      </div>
    ); 
  }

  // new Date(a?._meta?.createdAt).getTime()

  const favoritesFiltered: Favorites = favorites
    .filter(favorite => favorite.title != null && favorite.resourceId != null && favorite.favoriteType != null)
    .map(favorite => ({
      createdAt: favorite.createdAt!,
      favoriteType: favorite.favoriteType,
      resourceId: favorite.resourceId!,
      title: favorite.title!
    }));

  const favoritesWithParsedDate = favoritesFiltered.map(favorite =>
  {
    return {
      ...favorite,
      createdAt: typeof favorite.createdAt === "string" ? new Date(favorite.createdAt) : favorite.createdAt
    };
  });

  if(shouldSortByCreatedAt)
  {
    favoritesWithParsedDate.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  return (
    <div css={styles.wrapper}>
      {favoritesWithParsedDate
        .slice(0, 6)
        .map(({ favoriteType, resourceId, title }) =>
        {
          let link: string;

          switch (favoriteType)
          {
            case "case":
              link = appPaths.cases;
              break;
            case "article":
              link = appPaths.dictionary;
              break;
            case "question":
              link = appPaths.forum;
              break;
          }

          return (
            <FavoriteCard
              key={resourceId}
              resourceId={resourceId}
              isLoading={false}
              onClick={async () => router.push(`/${link}/${resourceId}`)}
              title={title}
              favoriteType={favoriteType}
            />
          );
        })}
    </div>
  );
};

export default FavoritesExcerpt;
