import { CivilLawIcon } from "@/components/Icons/CivilLawIcon";
import CaseBlock from "@/components/organisms/caseBlock/CaseBlock";
import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import OverviewHeader from "@/components/organisms/OverviewHeader/OverviewHeader";
import { type IArticlesOverviewProps } from "@/services/content/getArticlesOverviewProps";
import { type allSubCategories, type ICasesOverviewProps } from "@/services/content/getCasesOverviewProps";
import { type IGenArticleOverviewFragment, type IGenFullCaseFragment, type IGenSubCategoryFragment } from "@/services/graphql/__generated/sdk";

import {
  type FunctionComponent,
  useEffect,
  useState,
  Fragment,
} from "react";

import * as styles from "./OverviewPage.styles";

interface IOverviewPageProps 
{
  readonly content: ICasesOverviewProps | IArticlesOverviewProps | undefined;
  readonly variant: "case" | "dictionary";
}

const OverviewPage: FunctionComponent<IOverviewPageProps> = ({ content, variant }) => 
{
  
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    content?.allMainCategories?.[0]?.id ?? ""
  );
  const [filteredSubcategories, setFilteredSubcategories] = useState<
  allSubCategories | undefined
  >(undefined);
  useEffect(() => 
  {
    setFilteredSubcategories(
      content?.allSubCategories?.filter(
        (item) => item?.mainCategory?.[0]?.id === selectedCategoryId
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategoryId]);
  console.log({ filteredSubcategories });

  const allCasesOfSubcategory = (item: IGenSubCategoryFragment): (({
    _typename?: "Case" | undefined;
  } & IGenFullCaseFragment) | null | undefined)[] | undefined => content?.variant === "case" ? content?.allCases?.filter((caseItem) => caseItem?.subCategoryField?.some((e) => e?.id === item?.id)) : undefined;
  const allArticlesOfSubcategory = (item: IGenSubCategoryFragment): IGenArticleOverviewFragment[] | undefined => content?.variant === "dictionary" ? content?.allArticles?.filter((caseItem) => caseItem?.subCategoryField?.some((e) => e?.id === item?.id)) : undefined;

  // console.log({ content });
  
  return (
    <div css={styles.Page}>
      {content?.allMainCategories && (
        <OverviewHeader
          variant={variant}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          categories={content?.variant === variant ? content?.allMainCategories : undefined}
          title={variant === "case" ? "Cases" : "Dictionary"}
        />
      )}
      <div css={styles.ListWrapper({ empty: filteredSubcategories?.length && filteredSubcategories?.length > 0 ? false : true })}>
        {filteredSubcategories &&
          filteredSubcategories.length > 0 &&
          filteredSubcategories.map((item, itemIndex) => item?.subCategory && (
            <Fragment key={itemIndex}>
              <CaseBlock
                variant={variant}
                blockHead={{
                  blockType: "itemsBlock", categoryName: item?.subCategory, completedCases: 0, items: variant === "case" ? allCasesOfSubcategory(item)?.length : allArticlesOfSubcategory(item)?.length, variant  
                }}
                items={variant === "case" ? allCasesOfSubcategory(item) : allArticlesOfSubcategory(item)}
              />
            </Fragment>
          )
          )}
          
      </div>
      <div css={{}}/>
      {filteredSubcategories && filteredSubcategories.length <= 0 && (
        <EmptyStateCard
          button={<><CivilLawIcon/>Explore Civil law cases</>}
          title="We're currently working hard to bring you engaging cases to solve"
          text="Please check back soon for the latest updates"
          variant="For-large-areas"
        />
      )}
    </div>
  );
};

export default OverviewPage;
