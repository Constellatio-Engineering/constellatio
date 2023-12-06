import FavoriteCard from "@/components/molecules/favoriteCard/FavoriteCard";
import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import useAllFavorites from "@/hooks/useAllFavorites";
import { paths } from "@/utils/paths";

import { useRouter } from "next/router";
import React, { type FunctionComponent } from "react";

import * as styles from "./FavoritesExcerpt.styles";

const FavoritesExcerpt: FunctionComponent = () =>
{
  const router = useRouter();
  const { favoritesList } = useAllFavorites();

  if(!favoritesList)
  {
    return null;
  }

  if(favoritesList.length === 0)
  {
    return (
      <div css={styles.emptyCard}>
        <EmptyStateCard
          title="Noch keine Favoriten vorhanden"
          text="Speichere jetzt Fälle oder Lexikonartikel als Favoriten in deinem persönlichen Bereich."
          variant="For-small-areas"
          button={{
            content: "Alle Fälle ansehen",
            onClick: async () => router.push(paths.cases)
          }}
        />
      </div>
    ); 
  }

  return favoritesList.slice(0, 6).map((favorite, i) => favorite?.title && (
    <FavoriteCard
      key={i}
      onClick={async () => router.push(`/${favorite?.__typename === "Case" ? "cases" : "dictionary"}/${favorite?.id}`)}
      title={favorite.title}
      variant={favorite?.__typename === "Case" ? "case" : "dictionary"}
    />
  ));
};

export default FavoritesExcerpt;
