import { CivilLawIcon } from "@/components/Icons/CivilLawIcon";
import CaseBlock from "@/components/organisms/caseBlock/ItemBlock";
import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import OverviewHeader from "@/components/organisms/OverviewHeader/OverviewHeader";
import { type IArticlesOverviewProps } from "@/services/content/getArticlesOverviewProps";
import { type allSubCategories, type ICasesOverviewProps } from "@/services/content/getCasesOverviewProps";
import { type IGenMainCategory, type IGenArticleOverviewFragment, type IGenFullCaseFragment, type IGenSubCategoryFragment } from "@/services/graphql/__generated/sdk";

import { useRouter } from "next/router";
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

  const [selectedCategory, setSelectedCategory] = useState<IGenMainCategory | null>(
    content?.allMainCategories?.[0] ?? null
  );

  const router = useRouter();

  useEffect(() => 
  {
    router.query.category = selectedCategory?.mainCategory?.trim() ?? "";
    void router.push(router);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory?.id]);

  // const [filteredSubcategories, setFilteredSubcategories] = useState<
  // allSubCategories | undefined
  // >(undefined);
  // useEffect(() => 
  // {
  //   setFilteredSubcategories(
  //     content?.allSubCategories?.filter(
  //       (item) => item?.mainCategory?.[0]?.id === selectedCategoryId
  //     )
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedCategoryId]);

  // const allCasesOfSubcategory = (item: IGenSubCategoryFragment): Array<({
  //   _typename?: "Case" | undefined;
  // } & IGenFullCaseFragment) | null | undefined> | undefined => content?.__typename === "case" ?
  //   content?.allCases?.filter((caseItem) => caseItem?.subCategoryField?.some((e) => e?.id === item?.id)) : undefined;

  // const allArticlesOfSubcategory = (item: IGenSubCategoryFragment):
  // IGenArticleOverviewFragment[] | undefined => content?.__typename === "dictionary" ? 
  //   content?.allArticles?.filter((caseItem) => caseItem?.subCategoryField?.some((e) => e?.id === item?.id)) : undefined;
    
  // const isCategoryEmpty = (selectedMainCategory: string): boolean => 
  // {
  //   const allMainCategories = content?.allMainCategories;
  //   const selectedMainCategoryObject = allMainCategories?.filter(x => x?.id === selectedMainCategory)?.[0];
  //   const casesPerCategory = selectedMainCategoryObject?.casesPerCategory;
  //   const isCategoryEmpty = casesPerCategory !== undefined && casesPerCategory !== null && casesPerCategory <= 0 ? true : false;
  //   return isCategoryEmpty;
  // };
  const listOfUsedLegalAreas = [];
  content?.allMainCategoryCases?.forEach((item) => 
  {
    if(item.legalArea)
    {
      if(listOfUsedLegalAreas.filter(x => x.id === item.legalArea.id).length <= 0)
      {
        listOfUsedLegalAreas.push(item.legalArea);
      }
    }
  });
  console.log({ listOfUsedLegalAreas });

  return (
    <div css={styles.Page}>
      {content?.allMainCategories && (
        <OverviewHeader
          variant={variant}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={content?.allMainCategories}
          title={variant === "case" ? "Cases" : "Dictionary"}
        />
      )}
      {/* <div css={styles.ListWrapper}>
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
      {isCategoryEmpty(selectedCategoryId) && (
        <EmptyStateCard
          button={<><CivilLawIcon/>Explore Civil law cases</>}
          title="We're currently working hard to bring you engaging cases to solve"
          text="Please check back soon for the latest updates"
          variant="For-large-areas"
        />
      )} */}
    </div>
  );
};

export default OverviewPage;
