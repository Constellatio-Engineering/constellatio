import { Button } from "@/components/atoms/Button/Button";
import DashboardLastEditedBlockHeader from "@/components/molecules/dashboardLastEditedBlockHeader/DashboardLastEditedBlockHeader";
import FavoritesExcerpt from "@/components/organisms/favoritesExcerpt/FavoritesExcerpt";
import useAllFavorites from "@/hooks/useAllFavorites";

import { Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./DashboardLastEditedBlock.styles";

const DashboardLastEditedBlock: FunctionComponent = () =>
{
  const { favoritesList } = useAllFavorites();
  const favoriteCases = favoritesList.filter((favorite) => favorite.__typename === "Case");
  const favoriteArticles = favoritesList.filter((favorite) => favorite.__typename === "Article");

  return (
    <div css={styles.wrapper}>
      <DashboardLastEditedBlockHeader/>
      <div style={{ flex: "1" }}>
        <div style={{
          alignItems: "center", display: "flex", gap: 12, justifyContent: "space-between" 
        }}>
          <Title order={3}>Fälle</Title>
          <Button<"button">
            styleType="secondarySimple"
            type="button"
            size="large">
            Alle Fälle
          </Button>
        </div>
        <div css={styles.list}>
          {favoriteCases.length === 0 ? (
            <p>Du hast bisher noch keine Fälle bearbeitet.</p>
          ) : (
            <FavoritesExcerpt favorites={favoriteCases}/>
          )}
        </div>
        <div style={{
          alignItems: "center", display: "flex", gap: 12, justifyContent: "space-between", marginTop: 40
        }}>
          <Title order={3}>Lexikon</Title>
          <Button<"button">
            styleType="secondarySimple"
            type="button"
            size="large">
            Alle Artikel
          </Button>
        </div>
        <div css={styles.list}>
          {favoriteArticles.length === 0 ? (
            <p>Du hast bisher noch keine Artikel angesehen.</p>
          ) : (
            <FavoritesExcerpt favorites={favoriteArticles}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardLastEditedBlock;
