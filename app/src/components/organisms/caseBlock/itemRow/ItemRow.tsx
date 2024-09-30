import StatusTableCell from "@/components/atoms/statusTableCell/StatusTableCell";
import TableCell from "@/components/atoms/tableCell/TableCell";
import { ClockIcon } from "@/components/Icons/ClockIcon";
import BookmarkButton from "@/components/organisms/caseBlock/BookmarkButton/BookmarkButton";
import { type ICaseBlockProps } from "@/components/organisms/caseBlock/ItemBlock";
import { timeFormatter } from "@/components/organisms/overviewCard/OverviewCard";
import useBookmarks from "@/hooks/useBookmarks";
import useCasesProgress from "@/hooks/useCasesProgress";
import { appPaths } from "@/utils/paths";
import { type Nullable } from "@/utils/types";

import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import React, { type FunctionComponent, memo } from "react";

import * as styles from "./ItemRow.styles";

type Props = Pick<ICaseBlockProps, "variant" | "tableType"> & {
  readonly durationToCompleteInMinutes: number;
  readonly itemId: string;
  readonly legalAreaName: Nullable<string>;
  readonly title: Nullable<string>;
  readonly topicsCombined: Nullable<string>;
};
 
let ItemRow: FunctionComponent<Props> = ({
  durationToCompleteInMinutes,
  itemId,
  legalAreaName,
  tableType,
  title,
  topicsCombined,
  variant
}) =>
{
  const { casesProgress } = useCasesProgress();
  const { bookmarks: casesBookmarks, isLoading: isGetCasesBookmarksLoading } = useBookmarks("case", {
    enabled: variant === "case"
  });
  const { bookmarks: articlesBookmarks, isLoading: isGetArticlesBookmarksLoading } = useBookmarks("article", {
    enabled: variant === "dictionary"
  });
  const bookmarks = variant === "case" ? casesBookmarks : articlesBookmarks;
  const isLoading = variant === "case" ? isGetCasesBookmarksLoading : isGetArticlesBookmarksLoading;

  const isTablet = useMediaQuery("(max-width: 1100px)");
  const isSmallScreensOnFavorite = isTablet && tableType === "favorites";

  const caseProgress = casesProgress?.find((caseProgress) => caseProgress?.caseId === itemId);
  const isBookmarked = bookmarks.some(bookmark => bookmark?.resourceId === itemId) || false;

  return (
    <tr key={itemId}>
      <td className="primaryCell">
        <Link passHref shallow href={`${variant === "case" ? appPaths.cases : appPaths.dictionary}/${itemId}`}>
          <TableCell variant="titleTableCell" clickable>
            {title}
          </TableCell>
        </Link>
      </td>
      {variant === "case" && (
        <td>
          {/* THIS WILL GET caseId instead of variant */}
          <Link passHref shallow href={`${variant === "case" ? appPaths.cases : appPaths.dictionary}/${itemId}`}>
            <StatusTableCell progressState={caseProgress?.progressState || "not-started"}/>
          </Link>
        </td>
      )}
      {!isSmallScreensOnFavorite && variant === "case" && (
        <td>
          <Link passHref shallow href={`${variant === "case" ? appPaths.cases : appPaths.dictionary}/${itemId}`}>
            <TableCell variant="simpleTableCell" icon={<ClockIcon/>}>
              {timeFormatter(durationToCompleteInMinutes ?? 0)}
            </TableCell>
          </Link>
        </td>
      )}
      {tableType === "search" && <td><TableCell variant="simpleTableCell">{legalAreaName}</TableCell></td>}
      {tableType === "favorites" && <td><TableCell variant="simpleTableCell">{legalAreaName}</TableCell></td>}
      <td css={styles.topicCell} title={topicsCombined ?? undefined}>
        <Link passHref shallow href={`${variant === "case" ? appPaths.cases : appPaths.dictionary}/${itemId}`}>
          <TableCell variant="simpleTableCell">{topicsCombined}</TableCell>
        </Link>
      </td>
      <td css={styles.bookmarkButtonCell}>
        <BookmarkButton
          areAllBookmarksLoading={isLoading}
          isBookmarked={isBookmarked}
          resourceId={itemId}
          variant={variant}
        />
      </td>
    </tr>
  );
};

ItemRow = memo(ItemRow);

export default ItemRow;
