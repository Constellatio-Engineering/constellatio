import { OverlayLines } from "@/components/Icons/bg-layer";
import { Bookmark } from "@/components/Icons/Bookmark";
import { BookmarkFilledIcon } from "@/components/Icons/BookmarkFilledIcon";
import { Print } from "@/components/Icons/print";
import IconButtonBar from "@/components/organisms/iconButtonBar/IconButtonBar";
import useAddBookmark from "@/hooks/useAddBookmark";
import useArticles from "@/hooks/useArticles";
import useBookmarks from "@/hooks/useBookmarks";
import useCases from "@/hooks/useCases";
import useRemoveBookmark from "@/hooks/useRemoveBookmark";
import { type AddOrRemoveBookmarkSchema } from "@/schemas/bookmarks/addOrRemoveBookmark.schema";
import { type Maybe, type IGenArticle } from "@/services/graphql/__generated/sdk";
import { appPaths } from "@/utils/paths";
import { type Nullable } from "@/utils/types";

import { Button, Container, Title, useMantineTheme } from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";
import React, { type FunctionComponent } from "react";

import * as styles from "./CaseSolvingHeader.styles";
import OverviewCard, { type IOverviewCard } from "../overviewCard/OverviewCard";

interface IBreadcrumbItem 
{
  path: string;
  slug: string;
}
export interface ICaseSolvingHeaderProps 
{
  readonly caseId?: Maybe<string> | undefined;
  readonly nextArticleId: Nullable<string>;
  readonly overviewCard: IOverviewCard;
  readonly pathSlugs?: IBreadcrumbItem[];
  readonly previousArticleId: Nullable<string>;
  readonly title: string;
  readonly variant: "case" | "dictionary";
}

const CaseSolvingHeader: FunctionComponent<ICaseSolvingHeaderProps> = ({
  caseId,
  nextArticleId,
  overviewCard,
  pathSlugs,
  previousArticleId,
  title,
  variant
}) => 
{
  const { allCases = [] } = useCases();
  const { allArticles = [] } = useArticles();
  const { bookmarks } = useBookmarks(undefined);
  const allCasesBookmarks = bookmarks.filter(bookmark => bookmark?.resourceType === "case") ?? [];
  const allArticlesBookmarks = bookmarks.filter(bookmark => bookmark?.resourceType === "article") ?? [];
  const bookmarkedArticles = allArticles.filter((caisyArticle: IGenArticle) => allArticlesBookmarks.some(bookmark => bookmark.resourceId === caisyArticle.id));
  const bookmarkedCases = allCases.filter(caisyCase => allCasesBookmarks.some(bookmark => bookmark.resourceId === caisyCase.id));
  const isItemBookmarked = bookmarkedCases.some(bookmark => bookmark.title === title) || bookmarkedArticles?.some(bookmark => bookmark.title === title) || false;
  const { mutate: addBookmark } = useAddBookmark();
  const { mutate: removeBookmark } = useRemoveBookmark({ shouldUseOptimisticUpdate: true });

  const onBookmarkIconClick = (): void =>
  {
    if(!caseId)
    {
      return;
    }

    const bookmarkData: AddOrRemoveBookmarkSchema = {
      resourceId: caseId,
      resourceType: variant === "case" ? "case" : "article"
    };

    if(!isItemBookmarked)
    {
      addBookmark(bookmarkData);
      return;
    }
    else
    {
      removeBookmark(bookmarkData);
    }
  };

  const icons = [
    { click: () => onBookmarkIconClick(), src: isItemBookmarked ? <BookmarkFilledIcon/> : <Bookmark/>, title: "Bookmark" },
    // { src: <Pin/>, title: "Pin" },
    {
      click: () => 
      {
        window.print();
      },
      src: <Print/>,
      title: "Print",
    },
  ];
  const theme = useMantineTheme();

  return (
    <div css={styles.wrapper({ theme, variant })}>
      <Container p={0} css={styles.container}>
        <div id="overlay-lines">
          <OverlayLines/>
        </div>
        <div css={[styles.body, variant === "dictionary" && styles.bodyArticles]}>
          <div css={styles.bodyText}>
            <div className="icons-bar">
              <IconButtonBar icons={icons}/>
            </div>
            <div className="bread-crumb">
              {pathSlugs?.map(({ path, slug }, index) => (
                <Link key={index} href={path}>{slug}{index + 1 < pathSlugs.length ? " / " : ""}</Link>
              ))}
            </div>
            <Title title={title} order={1}>{title}</Title>
          </div>
          <div css={styles.bodyCard}>
            <OverviewCard {...overviewCard}/>
          </div>
        </div>
        {variant === "dictionary" && (
          <div css={styles.navButtonsWrapper}>
            <Button
              type="button"
              component={Link}
              href={`${appPaths.dictionary}/${previousArticleId}`}
              css={[styles.navButton, !previousArticleId && styles.navButtonDisabled]}
              disabled={!previousArticleId}
              leftIcon={<IconArrowLeft/>}
              variant="outline">
              Voriger Artikel
            </Button>
            <Button
              type="button"
              component={Link}
              href={`${appPaths.dictionary}/${nextArticleId}`}
              css={[styles.navButton, !nextArticleId && styles.navButtonDisabled]}
              disabled={!nextArticleId}
              rightIcon={<IconArrowRight/>}
              variant="outline">
              Nächster Artikel
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default CaseSolvingHeader;
