import { Button } from "@/components/atoms/Button/Button";
import StatusTableCell from "@/components/atoms/statusTableCell/StatusTableCell";
import TableCell from "@/components/atoms/tableCell/TableCell";
import { ArrowDown } from "@/components/Icons/ArrowDown";
import { ClockIcon } from "@/components/Icons/ClockIcon";
// import { Notepad } from "@/ckomponents/Icons/Notepad";
import CaseBlockHead, { type ICaseBlockHeadProps } from "@/components/molecules/caseBlockHead/CaseBlockHead";
import CaseBlockBookmarkButton from "@/components/organisms/caseBlock/caseBlockBookmarkButton/CaseBlockBookmarkButton";
import useBookmarks from "@/hooks/useBookmarks";
import useCasesProgress from "@/hooks/useCasesProgress";
import { type IGenArticle, type IGenFullCaseFragment } from "@/services/graphql/__generated/sdk";

import Link from "next/link";
import React, { Fragment, type FunctionComponent } from "react";

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

  const [numberOfShowingItems, setNumberOfShowingItems] = React.useState<number>(5);
  return items && items?.length > 0 ? (
    <div css={styles.wrapper}>
      <CaseBlockHead {...blockHead}/>
      <span style={{ width: "100%" }}>
        <Table tableType={tableTypePicker()}>
          {items?.slice(0, numberOfShowingItems)?.map((item) =>
          {
            const caseProgress = casesProgress?.find((caseProgress) => caseProgress?.caseId === item?.id);

            const isBookmarked = bookmarks.some(bookmark => bookmark?.resourceId === item?.id) || false;
            const topicsCombined = item?.topic?.map((item) => item?.topicName).join(", ") || "";
            return item && item.id && (
              <tr key={item?.id}>
                <td className="primaryCell">
                  <Link passHref shallow href={`/${variant === "case" ? "cases" : "dictionary"}/${item?.id}`}>
                    <TableCell variant="titleTableCell" clickable>
                      {item?.title}
                    </TableCell>
                  </Link>
                </td>
                {variant === "case" && (
                  <td>
                    {/* THIS WILL GET caseId instead of variant */}
                    <StatusTableCell progressState={caseProgress?.progressState || "not-started"}/>
                  </td>
                )}
                {item?.__typename === "Case" && (
                  <td>
                    <TableCell variant="simpleTableCell" icon={<ClockIcon/>}>
                      {timeFormatter(item?.durationToCompleteInMinutes ?? 0)}
                    </TableCell>
                  </td>
                )}
                {tableType === "search" && <td><TableCell variant="simpleTableCell">{item?.legalArea?.legalAreaName}</TableCell></td>}
                <td css={styles.topicCell} title={topicsCombined}>
                  <TableCell variant="simpleTableCell">{item?.topic?.[0]?.topicName}</TableCell>
                </td>
                {tableType === "favorites" && <td><TableCell variant="simpleTableCell">{item?.legalArea?.legalAreaName}</TableCell></td>}
                <td>
                  <CaseBlockBookmarkButton
                    areAllBookmarksLoading={isLoading}
                    isBookmarked={isBookmarked}
                    caseId={item?.id}
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
        {items?.length > numberOfShowingItems && (
          <div css={styles.expandTableButtonArea}>
            <>
              <span className="linearGredient"/>
              <Button<"button"> css={styles.expandTableButton} styleType="tertiary" onClick={() => setNumberOfShowingItems(prev => prev + 10)}>
                {items?.length - numberOfShowingItems > 10 ? 10 : items?.length - numberOfShowingItems} weitere anzeigen <ArrowDown/>
              </Button>
            </>
          </div>
        )}
      </span>
    </div>
  ) : null;
};

export default ItemBlock;
