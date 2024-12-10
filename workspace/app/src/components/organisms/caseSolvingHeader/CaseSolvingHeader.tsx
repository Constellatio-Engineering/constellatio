import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
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
import { getUrlSearchParams } from "@/utils/helpers";
import { queryParams } from "@/utils/query-params";

import { type IGenArticle, type Maybe } from "@constellatio/cms/generated-types";
import { type AddOrRemoveBookmarkSchema } from "@constellatio/schemas/routers/bookmarks/addOrRemoveBookmark.schema";
import { appPaths } from "@constellatio/shared/paths";
import { type Nullable } from "@constellatio/utility-types";
import { Button, Title } from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";
import { type FunctionComponent, useEffect, useState } from "react";

import * as styles from "./CaseSolvingHeader.styles";
import OverviewCard, { type IOverviewCard } from "../overviewCard/OverviewCard";

interface IBreadcrumbItem 
{
  path: string;
  slug: string;
}
export interface ICaseSolvingHeaderProps 
{
  readonly breadcrumbs?: IBreadcrumbItem[];
  readonly caseId?: Maybe<string> | undefined;
  readonly nextArticleId: Nullable<string>;
  readonly overviewCard: IOverviewCard;
  readonly previousArticleId: Nullable<string>;
  readonly title: string;
  readonly variant: "case" | "dictionary";
}

const CaseSolvingHeader: FunctionComponent<ICaseSolvingHeaderProps> = ({
  breadcrumbs,
  caseId,
  nextArticleId,
  overviewCard,
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
  const [referringLearningPath, setReferringLearningPath] = useState<Nullable<string>>();

  useEffect(() =>
  {
    const searchParams = new URLSearchParams(getUrlSearchParams());
    const _referringLearningPathParam = searchParams.get(queryParams.referringLearningPath);

    if(!_referringLearningPathParam)
    {
      return;
    }

    setReferringLearningPath(`${_referringLearningPathParam}#${searchParams.get(queryParams.referringLearningPathUnit)}`);
  }, []);

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

  return (
    <div css={styles.wrapper({ variant })}>
      <ContentWrapper>
        <div id="overlay-lines">
          <OverlayLines/>
        </div>
        <div css={[styles.body, variant === "dictionary" && styles.bodyArticles]}>
          <div css={styles.bodyText}>
            <div className="icons-bar">
              {referringLearningPath && (
                <Button
                  type="button"
                  prefetch={true}
                  component={Link}
                  href={`${appPaths.learningPaths}/${referringLearningPath}`}
                  css={[styles.navButton, styles.backToLearningPathButton]}
                  leftIcon={<IconArrowLeft/>}
                  variant="outline">
                  Zurück zum Lernpfad
                </Button>
              )}
              <IconButtonBar icons={icons}/>
            </div>
            <div className="bread-crumb">
              {breadcrumbs?.map(({ path, slug }, index) => (
                <Link key={index} href={path}>{slug}{index + 1 < breadcrumbs.length ? " / " : ""}</Link>
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
              prefetch={false}
              href={`${appPaths.dictionary}/${previousArticleId}`}
              css={[styles.navButton, !previousArticleId && styles.navButtonDisabled]}
              disabled={!previousArticleId}
              leftIcon={<IconArrowLeft/>}
              variant="outline">
              Voriger Artikel
            </Button>
            <Button
              type="button"
              prefetch={false}
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
      </ContentWrapper>
    </div>
  );
};

export default CaseSolvingHeader;
