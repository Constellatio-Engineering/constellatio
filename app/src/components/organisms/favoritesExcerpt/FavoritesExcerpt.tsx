import FavoriteCard from "@/components/molecules/favoriteCard/FavoriteCard";
import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import { type Favorites } from "@/hooks/useAllFavorites";
import useBookmarks from "@/hooks/useBookmarks";
import { appPaths } from "@/utils/paths";
import { type Nullable } from "@/utils/types";

import { useRouter } from "next/router";
import React, { type FunctionComponent } from "react";

import * as styles from "./FavoritesExcerpt.styles";

type Props = {
  readonly favorites: Nullable<Favorites>;
  readonly isLoading?: boolean;
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

  if(!favorites)
  {
    return null;
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

  if(shouldSortByCreatedAt)
  {
    favorites.sort((a, b) => new Date(b?._meta?.createdAt).getTime() - new Date(a?._meta?.createdAt).getTime());
  }

  return favorites
    .slice(0, 6)
    .map((favorite, i) => favorite?.title && (
      <FavoriteCard
        key={i}
        resourceId={favorite.id!}
        isLoading={false}
        onClick={async () => router.push(`/${favorite?.__typename === "Case" ? "cases" : "dictionary"}/${favorite?.id}`)}
        title={favorite.title}
        variant={favorite?.__typename === "Case" ? "case" : "dictionary"}
      />
    ));
};

export default FavoritesExcerpt;
