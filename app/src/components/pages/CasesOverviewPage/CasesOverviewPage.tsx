import { CivilLawIcon } from "@/components/Icons/CivilLawIcon";
import CaseBlock from "@/components/organisms/caseBlock/CaseBlock";
import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import { type ICasesOverviewProps } from "@/services/content/getCasesOverviewProps";
import { type IGenFullCaseFragment, type IGenSubCategoryFragment } from "@/services/graphql/__generated/sdk";
import { api } from "@/utils/api";

import { notifications } from "@mantine/notifications";
import React from "react";
import {
  type FunctionComponent,
  useEffect,
  useState,
  Fragment,
} from "react";

import * as styles from "./CasesOverviewPage.styles";

import OverviewHeader from "@/components/organisms/casesOverviewHeader/CasesOverviewHeader";

const OverviewPage: FunctionComponent<ICasesOverviewProps & {readonly variant: "case" | "dictionary"}> = ({
  allCases,
  allMainCategories,
  allSubCategories,
  variant,

}) => 
{
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(allMainCategories?.[0]?.id ?? "");
  const [filteredSubcategories, setFilteredSubcategories] = useState<typeof allSubCategories | undefined>(undefined);

  useEffect(() => 
  {
    setFilteredSubcategories(allSubCategories?.filter(item => item?.mainCategory?.[0]?.id === selectedCategoryId));
  }, [allSubCategories, selectedCategoryId]);

  const allCasesOfSubcategory = (item: IGenSubCategoryFragment): Array<({
    _typename?: "Case" | undefined;
  } & IGenFullCaseFragment) | null | undefined> | undefined => allCases?.filter((caseItem) => caseItem?.subCategoryField?.some((e) => e?.id === item?.id));

  return (
    <div css={styles.Page}>
      {allMainCategories && (
        <OverviewHeader
          variant={variant}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          categories={allMainCategories}
          title={variant === "case" ? "Cases" : "Dictionaries"}
        />
      )}
      <div css={styles.ListWrapper({ empty: !(filteredSubcategories?.length && filteredSubcategories?.length > 0) })}>
        {filteredSubcategories &&
          filteredSubcategories.length > 0 ?
          filteredSubcategories.map((item, itemIndex) => item?.subCategory && (
            <Fragment key={itemIndex}>
              <CaseBlock
                variant={variant}
                blockHead={{
                  blockType: "itemsBlock",
                  categoryName: item?.subCategory,
                  completedCases: 0,
                  items: allCasesOfSubcategory(item)?.length ?? 0,
                  variant
                }}
                items={allCasesOfSubcategory(item)}
              />
            </Fragment>
          )) : (
            // the state of the data entered in this component is based on if there's filter items
            // this will change later when we create global filter state
            <EmptyStateCard
              button={<><CivilLawIcon/>Explore Civil law cases</>}
              title="Title"
              text="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit"
              variant="For-large-areas"
            />
          )}
          
      </div>
      
    </div>
  );
};

export default OverviewPage;
