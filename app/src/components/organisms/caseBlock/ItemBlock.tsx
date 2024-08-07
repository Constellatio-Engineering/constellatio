import { Button } from "@/components/atoms/Button/Button";
import StatusTableCell from "@/components/atoms/statusTableCell/StatusTableCell";
import TableCell from "@/components/atoms/tableCell/TableCell";
import { ArrowDown } from "@/components/Icons/ArrowDown";
import { ClockIcon } from "@/components/Icons/ClockIcon";
import CaseBlockHead, { type ICaseBlockHeadProps } from "@/components/molecules/caseBlockHead/CaseBlockHead";
import BookmarkButton from "@/components/organisms/caseBlock/BookmarkButton/BookmarkButton";
// import useAllCasesWithProgress from "@/hooks/useAllCasesWithProgress";
import useBookmarks from "@/hooks/useBookmarks";
import useCasesProgress from "@/hooks/useCasesProgress";
import { type IGenArticle, type IGenFullCaseFragment } from "@/services/graphql/__generated/sdk";
import { appPaths } from "@/utils/paths";

import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import React, { type FunctionComponent, useState } from "react";

import * as styles from "./ItemBlock.styles";
import { timeFormatter } from "../overviewCard/OverviewCard";
import Table, { type DictionaryTableProps, type CasesTableProps } from "../table/Table";

const CasesTable: CasesTableProps = {
  type: "cases",
  variant: "cases"
};

const DictionaryTable: DictionaryTableProps = {
  type: "dictionary",
  variant: "dictionary"
};

const FavoriteCasesTable: CasesTableProps = {
  type: "cases",
  variant: "favorites"
};
const FavoriteDictionaryTable: DictionaryTableProps = {
  type: "dictionary",
  variant: "favorites"
};

const SearchTableCase: CasesTableProps = {
  type: "cases",
  variant: "search"
};

const SearchTableDictionary: DictionaryTableProps = {
  type: "dictionary",
  variant: "search"
};

export interface ICaseBlockProps 
{
  readonly blockHead: ICaseBlockHeadProps;
  readonly items: IGenFullCaseFragment[] | IGenArticle[];
  readonly tableType?: "all-cases" | "cases" | "favorites" | "search" | "dictionary";
  readonly variant: "case" | "dictionary";
}

const ItemBlock: FunctionComponent<ICaseBlockProps> = ({
  blockHead,
  items,
  tableType,
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

  const tableTypePicker = (): DictionaryTableProps | CasesTableProps => 
  {
    switch (variant) 
    {
      case "case":
        return tableType === "cases" ? CasesTable : tableType === "favorites" ? FavoriteCasesTable : tableType === "search" ? SearchTableCase : CasesTable;
      case "dictionary":
        return tableType === "dictionary" ? DictionaryTable : tableType === "favorites" ? FavoriteDictionaryTable : tableType === "search" ? SearchTableDictionary : DictionaryTable;
      default:
        return CasesTable;
    }
  };
  const isTablet = useMediaQuery("(max-width: 1100px)");
  const isSmallScreensOnFavorite = isTablet && tableType === "favorites";
  const [shouldShowAll, setShouldShowAll] = useState(false);

  let renderedItems: typeof items;

  if(shouldShowAll)
  {
    renderedItems = items;
  }
  else
  {
    renderedItems = items?.slice(0, 5);
  }

  const amountOfHiddenItems = (items?.length - renderedItems.length) ?? 0;

  return items && items?.length > 0 ? (
    <div css={styles.wrapper}>
      <CaseBlockHead {...blockHead}/>
      <span style={{ width: "100%" }}>
        <Table tableType={tableTypePicker()} isTablet={isTablet}>
          {(shouldShowAll ? items : items?.slice(0, 5))?.map((item) =>
          {
            const caseProgress = casesProgress?.find((caseProgress) => caseProgress?.caseId === item?.id);
            const isBookmarked = bookmarks.some(bookmark => bookmark?.resourceId === item?.id) || false;
            const topicsCombined = item?.topic?.map((item) => item?.topicName).join(", ") || "";
            return item && item.id && (
              <tr key={item?.id}>
                <td className="primaryCell">
                  <Link passHref shallow href={`${variant === "case" ? appPaths.cases : appPaths.dictionary}/${item?.id}`}>
                    <TableCell variant="titleTableCell" clickable>
                      {item?.title}
                    </TableCell>
                  </Link>
                </td>
                {variant === "case" && (
                  <td>
                    {/* THIS WILL GET caseId instead of variant */}
                    <Link passHref shallow href={`${variant === "case" ? appPaths.cases : appPaths.dictionary}/${item?.id}`}>
                      <StatusTableCell progressState={caseProgress?.progressState || "not-started"}/>
                    </Link>
                  </td>
                )}
                {!isSmallScreensOnFavorite && item?.__typename === "Case" && (
                  <td>
                    <Link passHref shallow href={`${variant === "case" ? appPaths.cases : appPaths.dictionary}/${item?.id}`}>
                      <TableCell variant="simpleTableCell" icon={<ClockIcon/>}>
                        {timeFormatter(item?.durationToCompleteInMinutes ?? 0)}
                      </TableCell>
                    </Link>
                  </td>
                )}
                {tableType === "search" && <td><TableCell variant="simpleTableCell">{item?.legalArea?.legalAreaName}</TableCell></td>}
                {tableType === "favorites" && <td><TableCell variant="simpleTableCell">{item?.legalArea?.legalAreaName}</TableCell></td>}
                <td css={styles.topicCell} title={topicsCombined}>
                  <Link passHref shallow href={`${variant === "case" ? appPaths.cases : appPaths.dictionary}/${item?.id}`}>
                    <TableCell variant="simpleTableCell">{item?.topic?.[0]?.topicName}</TableCell>
                  </Link>
                </td>
                <td css={styles.bookmarkButtonCell}>
                  <BookmarkButton
                    areAllBookmarksLoading={isLoading}
                    isBookmarked={isBookmarked}
                    resourceId={item?.id}
                    variant={variant}
                  />
                </td>
                {/* {tableType === "favorites" && (
                  <td>
                    <TableCell variant="simpleTableCell" icon={<Notepad/>}>Notes</TableCell>
                  </td>
                )} */}
              </tr>
            );
          })}
        </Table>
        {amountOfHiddenItems > 0 && (
          <div css={styles.expandTableButtonArea}>
            <>
              <span className="linearGredient"/>
              <Button<"button"> css={styles.expandTableButton} styleType="tertiary" onClick={() => setShouldShowAll(true)}>
                {amountOfHiddenItems} Weitere{amountOfHiddenItems === 1 ? "n" : ""} anzeigen <ArrowDown/>
              </Button>
            </>
          </div>
        )}
      </span>
    </div>
  ) : null;
};

export default ItemBlock;
