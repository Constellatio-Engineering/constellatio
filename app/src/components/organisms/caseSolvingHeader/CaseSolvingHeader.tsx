import { OverlayLines } from "@/components/Icons/bg-layer";
import { Print } from "@/components/Icons/print";
import IconButtonBar, {
  IIcons,
} from "@/components/organisms/iconButtonBar/IconButtonBar";

import { Container, Title, useMantineTheme } from "@mantine/core";
import Link from "next/link";
import React, { type FunctionComponent } from "react";

import * as styles from "./CaseSolvingHeader.styles";
import OverviewCard, { type IOverviewCard } from "../overviewCard/OverviewCard";

interface IBreadcrumbItem {
  path: string;
  slug: string;
}
export interface ICaseSolvingHeaderProps {
  readonly overviewCard: IOverviewCard;
  readonly pathSlugs?: IBreadcrumbItem[];
  readonly title: string;
  readonly variant: "case" | "dictionary";
}

const CaseSolvingHeader: FunctionComponent<ICaseSolvingHeaderProps> = ({
  overviewCard,
  pathSlugs,
  title,
  variant,
}) => {
  // TODO FIND A BETTER WAY TO CHECK IF ITEM IS BOOKMARKED

  // const { allCases = [] } = useCases();
  // const { allArticles = [] } = useArticles();
  // const { bookmarks } = useBookmarks(undefined);
  // const allCasesBookmarks = bookmarks.filter(bookmark => bookmark?.resourceType === "case") ?? [];
  // const allArticlesBookmarks = bookmarks.filter(bookmark => bookmark?.resourceType === "article") ?? [];
  // const bookmarkedArticles = allArticles.filter((caisyArticle: IGenArticle) => allArticlesBookmarks.some(bookmark => bookmark.resourceId === caisyArticle.id));
  // const bookmarkedCases = allCases.filter(caisyCase => allCasesBookmarks.some(bookmark => bookmark.resourceId === caisyCase.id));
  // const isItemBookmarked = bookmarkedCases.some(bookmark => bookmark.title === title) || bookmarkedArticles?.some(bookmark => bookmark.title === title) || false;
  // const isItemBookmarked = false;
  const icons: IIcons[] = [
    // { src: isItemBookmarked ? <BookmarkFilledIcon/> : <Bookmark/>, title: "Bookmark" },
    // { src: <Pin/>, title: "Pin" },
    { src: <Print/>, title: "Print" },
  ];
  const theme = useMantineTheme();

  return (
    <div css={styles.wrapper({ theme, variant })}>
      <Container css={styles.container}>
        <div id="overlay-lines">
          <OverlayLines />
        </div>
        <div css={styles.body}>
          <div css={styles.bodyText}>
            <div className="icons-bar">
              <IconButtonBar icons={icons} />
            </div>
            <div className="bread-crumb">
              {pathSlugs?.map(({ path, slug }, index) => (
                <Link key={index} href={path}>
                  {slug}
                  {index + 1 < pathSlugs.length ? " / " : ""}
                </Link>
              ))}
            </div>
            <div className="headline">
              <Title order={1}>{title}</Title>
            </div>
          </div>
          <div css={styles.bodyCard}>
            <OverviewCard {...overviewCard} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CaseSolvingHeader;
