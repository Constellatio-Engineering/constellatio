import { Svg } from "@/basic-components/SVG/Svg";
import ItemBlock from "@/components/organisms/caseBlock/ItemBlock";
import useSearchResults, { type SearchResults } from "@/hooks/useSearchResults";
import { type IGenArticleOverviewFragment, type IGenFullCaseFragment } from "@/services/graphql/__generated/sdk";
import { type ArticleSearchIndexItem, type CaseSearchIndexItem } from "@/utils/search";
import { type CommonKeysInTypes } from "@/utils/types";

import { useRouter } from "next/router";
import React, { Fragment, type FunctionComponent } from "react";

const SearchPageResults: FunctionComponent = () => 
{
  const { searchResults } = useSearchResults();
  const router = useRouter();
  const routerTabQuery = router.query.tab as keyof SearchResults;
  console.log("routerTabQuery", routerTabQuery);
  
  if(routerTabQuery === "userUploads") { return; }
  else 
  {
    const filteredMainCategories = searchResults[routerTabQuery]?.map((item) => item.mainCategory).filter((mainCategory, index, arr) =>
      index === arr.findIndex((el) => (
        el?.id === mainCategory?.id
      ))
    );

    const groupedResultsByCategory = filteredMainCategories?.map((mainCategory) =>
    {
      return {
        items: searchResults[routerTabQuery]?.filter((item) => item.mainCategory?.id === mainCategory?.id) as SearchResults["cases"] | SearchResults["articles"],
        mainCategory: mainCategory as CaseSearchIndexItem["mainCategory"] | ArticleSearchIndexItem["mainCategory"]
      };
    });

    const commonItemsProps = (item: CommonKeysInTypes<CaseSearchIndexItem, ArticleSearchIndexItem>):
    Pick<CommonKeysInTypes<IGenArticleOverviewFragment, IGenFullCaseFragment>, "id" | "legalArea" | "title" | "topic"> => ({
      id: item?.id,
      legalArea: {
        __typename: "LegalArea",
        id: item.legalArea?.id,
        legalAreaName: item.legalArea?.legalAreaName,
      },
      title: item.title,
      topic: item.topic?.map(topicItem => ({
        __typename: "Topic",
        id: topicItem.id,
        topicName: topicItem.topicName,
      })),
    });

    return (
      <div>
        {groupedResultsByCategory?.map((categoryGroup, index) =>
        {
          const caseItems = categoryGroup.items as SearchResults["cases"];
          const articleItems = categoryGroup.items as SearchResults["articles"];
          const { mainCategory } = categoryGroup;
          const mainCategoryIcon = mainCategory?.icon;
          return (
            <Fragment key={index}>
              <ItemBlock
                variant={routerTabQuery === "cases" ? "case" : "dictionary"}
                tableType="search"
                blockHead={{
                  blockType: "searchBlock",
                  categoryName: mainCategory?.mainCategory ?? "",
                  icon: {
                    alt: mainCategoryIcon?.description ?? (mainCategoryIcon?.title || ""),
                    src: <Svg src={mainCategoryIcon?.src}/>
                  },
                  items: categoryGroup.items?.length,
                  variant: routerTabQuery === "cases" ? "case" : "dictionary"
                }}
                items={routerTabQuery === "cases" ? caseItems?.map(item => ({
                  __typename: "Case",
                  durationToCompleteInMinutes: item.durationToCompleteInMinutes,
                  ...commonItemsProps(item)
                })) : articleItems?.map(item => ({
                  __typename: "Article",
                  ...commonItemsProps(item)
                }))}
              />
            </Fragment>
          );
        }
        )}
      </div>
    );
  }

};

export default SearchPageResults;
