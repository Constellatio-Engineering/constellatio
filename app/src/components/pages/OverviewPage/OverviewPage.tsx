import { CivilLawIcon } from "@/components/Icons/CivilLawIcon";
import CaseBlock from "@/components/organisms/caseBlock/ItemBlock";
import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import OverviewHeader, {
  slugFormatter,
} from "@/components/organisms/OverviewHeader/OverviewHeader";
import { type IArticlesOverviewProps } from "@/services/content/getArticlesOverviewProps";
import { type ICasesOverviewProps } from "@/services/content/getCasesOverviewProps";
import {
  type IGenLegalArea,
  type IGenCase,
  type IGenArticle,
  type IGenCaseOverviewFragment,
} from "@/services/graphql/__generated/sdk";

// import { Loader } from "@mantine/core";
import { useRouter } from "next/router";
import { useQueryState } from "next-usequerystate";
import { type FunctionComponent, Fragment, useEffect } from "react";
import React from "react";

import * as styles from "./OverviewPage.styles";

type CasesOverviewPageProps = {
  content: ICasesOverviewProps;
  variant: "case";
};

type ArticlesOverviewPageProps = {
  content: IArticlesOverviewProps;
  variant: "dictionary";
};

type OverviewPageProps = CasesOverviewPageProps | ArticlesOverviewPageProps;

const OverviewPage: FunctionComponent<OverviewPageProps> = ({ content, variant }) => 
{
  const [selectedCategorySlug, setSelectedCategorySlug] =
    useQueryState("category");
  // const [selectedCategory, setSelectedCategory] = useState<Maybe<string> | undefined>(content.allMainCategories?.[0]?.mainCategory);
  const router = useRouter();

  useEffect(() => 
  {
    // console.log(router.query.category);
    if(typeof window !== "undefined") 
    {
      void (async () => 
      {
        try 
        {
          if(!selectedCategorySlug || router.query.category === undefined) 
          {
            // console.log("!selectedCategorySlug || router.query.category === undefined");
            await setSelectedCategorySlug(
              slugFormatter(content.allMainCategories?.[0]?.mainCategory ?? "")
            );
            await router.replace({ query: { category: slugFormatter(content.allMainCategories?.[0]?.mainCategory ?? "") } }, undefined, { shallow: true });
          }
        }
        catch (error) 
        {
          console.error(error);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.category, setSelectedCategorySlug]);

  const filteredLegalAreas = (content.allLegalAreaRes.allLegalArea?.edges
    ?.map((legalArea) => legalArea?.node)
    .filter((legalArea) => Boolean(legalArea)) || []) as IGenLegalArea[];

  const getAllCasesOfLegalArea = (
    item: IGenLegalArea
  ): IGenCaseOverviewFragment[] => 
  {
    if(content?.__typename !== "case") 
    {
      return [];
    }
    return content?.allCases.filter(
      (x) =>
        x.legalArea?.id === item?.id &&
        slugFormatter(x.mainCategoryField?.[0]?.mainCategory ?? "") ===
          selectedCategorySlug
    );
  };

  const getAllArticlesOfLegalArea = (item: IGenLegalArea): IGenArticle[] => 
  {
    if(content?.__typename !== "dictionary") 
    {
      return [];
    }
    return content?.allArticles.filter(
      (x) =>
        x.legalArea?.id === item?.id &&
        slugFormatter(x.mainCategoryField?.[0]?.mainCategory ?? "") ===
          selectedCategorySlug
    );
  };

  const getIsCategoryEmpty = (): boolean => 
  {
    const isEmpty: boolean =
      content?.__typename === "case"
        ? content?.allCases?.filter(
          (x: IGenCase) =>
            slugFormatter(x?.mainCategoryField?.[0]?.mainCategory ?? "") ===
              selectedCategorySlug
        )?.length <= 0
        : content?.allArticles?.filter(
          (x: IGenArticle) =>
            slugFormatter(x?.mainCategoryField?.[0]?.mainCategory ?? "") ===
              selectedCategorySlug
        )?.length <= 0;

    return isEmpty;
  };

  return (
    <div css={styles.Page}>
      {content?.allMainCategories && router.query.category && (
        <OverviewHeader
          variant={variant}
          selectedCategorySlug={selectedCategorySlug}
          setSelectedCategorySlug={setSelectedCategorySlug}
          categories={content?.allMainCategories}
          title={variant === "case" ? "Cases" : "Dictionary"}
        />
      )}
      <div css={styles.ListWrapper}>
        {router.query.category && filteredLegalAreas.map((item, itemIndex) => 
        {
          const items =
            variant === "case"
              ? getAllCasesOfLegalArea(item)
              : getAllArticlesOfLegalArea(item);

          return (
            item.legalAreaName && (
              <Fragment key={itemIndex}>
                <CaseBlock
                  variant={variant}
                  blockHead={{
                    blockType: "itemsBlock",
                    categoryName: item.legalAreaName,
                    completedCases: 0,
                    items: items.length,
                    variant,
                  }}
                  tableType="cases"
                  items={items}
                />
              </Fragment>
            )
          );
        })}
      </div>
      {router.query.category && getIsCategoryEmpty() && (
        <EmptyStateCard
          // button={(
          //   <>
          //     <CivilLawIcon/>
          //     Explore Civil law cases
          //   </>
          // )}
          title={`We're currently working hard to bring you ${
            variant === "case"
              ? "engaging cases to solve"
              : "interesting articles"
          }`}
          text="Please check back soon for the latest updates"
          variant="For-large-areas"
        />
      )}
      {/* {!router.query.category && <Loader m="50px"/>} */}
    </div>
  );
};

export default OverviewPage;
