import CaseBlock from "@/components/organisms/caseBlock/CaseBlock";
import OverviewHeader from "@/components/organisms/casesOverviewHeader/CasesOverviewHeader";
import { type ICasesOverviewProps } from "@/services/content/getCasesOverviewProps";
import { type IGenFullCaseFragment, type IGenSubCategoryFragment } from "@/services/graphql/__generated/sdk";

import {
  type FunctionComponent,
  useEffect,
  useState,
  Fragment,
} from "react";

import * as styles from "./CasesOverviewPage.styles";

const CasesOverviewPage: FunctionComponent<ICasesOverviewProps> = ({ allCases, allMainCategories, allSubCategories }) => 
{
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    allMainCategories?.[0]?.id ?? ""
  );
  const [filteredSubcategories, setFilteredSubcategories] = useState<
    typeof allSubCategories | undefined
  >(undefined);
  useEffect(() => 
  {
    setFilteredSubcategories(
      allSubCategories?.filter(
        (item) => item?.mainCategory?.[0]?.id === selectedCategoryId
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategoryId]);
  const allCasesOfSubcategory = (item: IGenSubCategoryFragment): (({
    _typename?: "Case" | undefined;
  } & IGenFullCaseFragment) | null | undefined)[] | undefined => allCases?.filter((caseItem) => caseItem?.subCategoryField?.some((e) => e?.id === item?.id));

  return (
    <div css={styles.Page}>
      {allMainCategories && (
        <OverviewHeader
          variant="case"
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          categories={allMainCategories}
          title="Cases"
        />
      )}
      <div css={styles.ListWrapper}>
        {filteredSubcategories &&
          filteredSubcategories.length > 0 &&
          filteredSubcategories.map((item, itemIndex) => item?.subCategory && (
            <Fragment key={itemIndex}>
              <CaseBlock
                blockHead={{
                  blockType: "itemsBlock", categoryName: item?.subCategory, completedCases: 0, items: allCasesOfSubcategory(item)?.length ?? 0, variant: "case"  
                }}
                cases={allCasesOfSubcategory(item)}
              />
            </Fragment>
          )
          )}
      </div>
    </div>
  );
};

export default CasesOverviewPage;
