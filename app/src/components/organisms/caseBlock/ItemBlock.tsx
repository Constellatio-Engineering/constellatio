import StatusTableCell from "@/components/atoms/statusTableCell/StatusTableCell";
import TableCell from "@/components/atoms/tableCell/TableCell";
import { ClockIcon } from "@/components/Icons/ClockIcon";
import { Notepad } from "@/components/Icons/Notepad";
import CaseBlockHead, { type ICaseBlockHeadProps } from "@/components/molecules/caseBlockHead/CaseBlockHead";
import CaseBlockBookmarkButton from "@/components/organisms/caseBlock/caseBlockBookmarkButton/CaseBlockBookmarkButton";
import useBookmarks from "@/hooks/useBookmarks";
import { SearchResults } from "@/hooks/useSearchResults";
import { type IGenArticleOverviewFragment, type IGenFullCaseFragment } from "@/services/graphql/__generated/sdk";

import Link from "next/link";
import React, { type FunctionComponent } from "react";

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
  readonly items: IGenFullCaseFragment[] | IGenArticleOverviewFragment[] ;
  readonly tableType?: "all-cases" | "cases" | "favorites" | "search" | "dictionary";
  readonly variant: "case" | "dictionary" | "caseSearch" | "dictionarySearch";
}

const ItemBlock: FunctionComponent<ICaseBlockProps> = ({
  blockHead,
  items,
  tableType,
  variant
}) => 
{
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
        return tableType === "cases" ? CasesTable : tableType === "favorites" ? FavoriteCasesTable : CasesTable;
      case "dictionary":
        return DictionaryTable;
      default:
        return CasesTable;
    }
  };

  return items.length > 0 ? (
    <div css={styles.wrapper}>
      <CaseBlockHead {...blockHead}/>
      <Table tableType={tableTypePicker()}>
        {items.map((item) =>
        {
          const isBookmarked = bookmarks.some(bookmark => bookmark?.resourceId === item?.id) || false;
          const topicsCombined = item?.topic?.map((item) => item?.topicName).join(", ") || "";

          return (
            <tr key={item.id}>
              <td className="primaryCell">
                <Link passHref href={`/${variant === "case" ? "cases" : "dictionary"}/${item?.id}`}>
                  <TableCell variant="titleTableCell" clickable>
                    {item?.title}
                  </TableCell>
                </Link>
              </td>
              {variant === "case" || variant === "caseSearch" && (
                <td>
                  <StatusTableCell variant="notStarted"/>
                </td>
              )}
              {item?.__typename === "Case" && (
                <td>
                  <TableCell variant="simpleTableCell" icon={<ClockIcon/>}>
                    {timeFormatter(item?.durationToCompleteInMinutes ?? 0)}
                  </TableCell>
                </td>
              )}
              <td title={topicsCombined}>
                <TableCell variant="simpleTableCell">{item?.topic?.[0]?.topicName}</TableCell>
              </td>
              {tableType === "favorites" && <td><TableCell variant="simpleTableCell">{item?.legalArea?.legalAreaName}</TableCell></td>}
              <td>
                <CaseBlockBookmarkButton
                  areAllBookmarksLoading={isLoading}
                  isBookmarked={isBookmarked}
                  caseId={item.id}
                  variant={variant}
                />
              </td>
              {tableType === "favorites" && (
                <td>
                  <TableCell variant="simpleTableCell" icon={<Notepad/>}>Notes</TableCell>
                </td>
              )}
            </tr>
          );
        })}
      </Table>
    </div>
  ) : null;
};

export default ItemBlock;

