import { Button } from "@/components/atoms/Button/Button";
import DashboardLastEditedBlockHeader from "@/components/molecules/dashboardLastEditedBlockHeader/DashboardLastEditedBlockHeader";
import FavoritesExcerpt from "@/components/organisms/favoritesExcerpt/FavoritesExcerpt";
import { useLastViewedArticles } from "@/hooks/useLastViewedArticles";
import { useLastViewedCases } from "@/hooks/useLastViewedCases";
import { paths } from "@/utils/paths";

import { Title } from "@mantine/core";
import Link from "next/link";
import React, { type FunctionComponent } from "react";

import * as styles from "./DashboardLastEditedBlock.styles";

const DashboardLastEditedBlock: FunctionComponent = () =>
{
  const { isLoading: isLastViewedCasesLoading, lastViewedCases } = useLastViewedCases();
  const { isLoading: isLastViewedArticlesLoading, lastViewedArticles } = useLastViewedArticles();

  return (
    <div css={styles.wrapper}>
      <DashboardLastEditedBlockHeader/>
      <div style={{ flex: "1" }}>
        <div style={{
          alignItems: "center", display: "flex", gap: 12, justifyContent: "space-between" 
        }}>
          <Title order={3}>Fälle</Title>
          <Link href={`${paths.cases}`}>
            <Button<"button">
              styleType="secondarySimple"
              type="button"
              size="large">
              Alle Fälle
            </Button>
          </Link>
        </div>
        <div css={styles.list}>
          {(!isLastViewedCasesLoading && lastViewedCases.length === 0) ? (
            <p>Du hast bisher noch keine Fälle bearbeitet.</p>
          ) : (
            <FavoritesExcerpt
              favorites={lastViewedCases}
              shouldSortByCreatedAt={false}
              isLoading={isLastViewedCasesLoading}
            />
          )}
        </div>
        <div style={{
          alignItems: "center", display: "flex", gap: 12, justifyContent: "space-between", marginTop: 40
        }}>
          <Title order={3}>Lexikon</Title>
          <Link href={`${paths.dictionary}`}>
            <Button<"button">
              styleType="secondarySimple"
              type="button"
              size="large">
              Alle Artikel
            </Button>
          </Link>
        </div>
        <div css={styles.list}>
          {(!isLastViewedArticlesLoading && lastViewedArticles.length === 0) ? (
            <p>Du hast bisher noch keine Artikel angesehen.</p>
          ) : (
            <FavoritesExcerpt favorites={lastViewedArticles} shouldSortByCreatedAt={false} isLoading={isLastViewedArticlesLoading}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardLastEditedBlock;