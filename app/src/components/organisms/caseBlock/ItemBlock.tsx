import { Button } from "@/components/atoms/Button/Button";
import { ArrowDown } from "@/components/Icons/ArrowDown";
import CaseBlockHead, { type ICaseBlockHeadProps } from "@/components/molecules/caseBlockHead/CaseBlockHead";
import ItemRow from "@/components/organisms/caseBlock/itemRow/ItemRow";
// import useAllCasesWithProgress from "@/hooks/useAllCasesWithProgress";
import { type IGenArticle, type IGenCase } from "@/services/graphql/__generated/sdk";

import { useMediaQuery } from "@mantine/hooks";
import React, { type FunctionComponent, useState } from "react";

import * as styles from "./ItemBlock.styles";
import Table, { type CasesTableProps, type DictionaryTableProps } from "../table/Table";

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
  readonly items: Array<IGenCase | IGenArticle>;
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
  const isTablet = useMediaQuery("(max-width: 1100px)");

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
          {(shouldShowAll ? items : items?.slice(0, 5))?.map((item) => (
            <ItemRow
              key={item.id!}
              tableType={tableType}
              variant={variant}
              durationToCompleteInMinutes={0}
              itemId={item.id!}
              legalAreaName={item.legalArea?.legalAreaName}
              title={item.title}
              topicsCombined={item.topic?.filter(Boolean).map((topic) => topic.topicName).join(", ")}
            />
          ))}
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
