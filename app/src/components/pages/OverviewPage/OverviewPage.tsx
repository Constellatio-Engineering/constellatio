import { CivilLawIcon } from "@/components/Icons/CivilLawIcon";
import CaseBlock from "@/components/organisms/caseBlock/ItemBlock";
import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import OverviewHeader from "@/components/organisms/OverviewHeader/OverviewHeader";
import { type IArticlesOverviewProps } from "@/services/content/getArticlesOverviewProps";
import { type allSubCategories, type ICasesOverviewProps } from "@/services/content/getCasesOverviewProps";
import {
  type IGenMainCategory, type IGenArticleOverviewFragment, type IGenFullCaseFragment, type IGenSubCategoryFragment, type IGenLegalArea, type IGenCase 
} from "@/services/graphql/__generated/sdk";

import { useRouter } from "next/router";
import {
  type FunctionComponent,
  useEffect, Fragment,
  useState,
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
  
  // const router = useRouter();

  // useEffect(() => 
  // {
  //   router.push({ href: "/", query: { category: selectedCategory?.mainCategory ?? "" } });
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedCategory?.id]);

  // const [filteredSubcategories, setFilteredSubcategories] = useState<
  // allSubCategories | undefined
  // >(undefined);

  const [filteredLegalAreas, setFilteredLegalAreas] = useState(content?.allLegalAreaRes);

  useEffect(() => 
  {
    console.log({ selectedCategory });
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory?.id]);

  const allCasesOfLegalArea = (item: IGenLegalArea): Array<({
    _typename?: "Case" | undefined;
  } & IGenCase) | null | undefined> | undefined => 
  {
    if(content?.__typename === "case")
    {
      return content?.allCases.filter(x => (x.legalArea?.id === item?.id && x.mainCategoryField?.[0]?.id === selectedCategory?.id));
    }
    return undefined;
  };
  console.log({ content });

  // const allArticlesOfSubcategory = (item: IGenSubCategoryFragment):
  // IGenArticleOverviewFragment[] | undefined => content?.__typename === "dictionary" ? 
  //   content?.allArticles?.filter((caseItem) => caseItem?.subCategoryField?.some((e) => e?.id === item?.id)) : undefined;
    
  // const isCategoryEmpty = (selectedCategory: IGenMainCategory): boolean => 
  // {
  //   const allMainCategories = content?.allMainCategories;
  //   const casesPerCategory = selectedMainCategory?.casesPerCategory;
  //   const isCategoryEmpty = casesPerCategory !== undefined && casesPerCategory !== null && casesPerCategory <= 0 ? true : false;
  //   return isCategoryEmpty;
  // };

  const isCategoryEmpty = (): boolean => 
  {
    const filterr = content?.allCases.filter((x: IGenCase) => (x?.mainCategoryField?.[0]?.id === selectedCategory?.id))?.length <= 0;
    return filterr;
    
  };

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
      <div css={styles.ListWrapper}>

        {filteredLegalAreas?.map((item: IGenLegalArea, itemIndex: number) => item?.legalAreaName && (
          <Fragment key={itemIndex}>
            <CaseBlock
              variant={variant}
              blockHead={{
                blockType: "itemsBlock", categoryName: item?.legalAreaName, completedCases: 0, items: variant === "case" ? allCasesOfLegalArea(item)?.length : allCasesOfLegalArea(item)?.length, variant
              }}
              items={variant === "case" ? allCasesOfLegalArea(item) : allCasesOfLegalArea(item)}
            />
          </Fragment>
        )
        )}

      </div>
      {isCategoryEmpty() && (
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
