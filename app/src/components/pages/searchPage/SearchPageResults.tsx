import { Svg } from "@/basic-components/SVG/Svg";
import ItemBlock from "@/components/organisms/caseBlock/ItemBlock";
import UploadedMaterialTable from "@/components/organisms/uploadedMaterialTable/UploadedMaterialTable";
import SearchPapersBlock from "@/components/searchPapersBlock/SearchPapersBlock";
import { type UploadedFile } from "@/db/schema";
import useSearchResults, { type SearchResults } from "@/hooks/useSearchResults";
import { type IGenArticleOverviewFragment, type IGenFullCaseFragment } from "@/services/graphql/__generated/sdk";
import { type ArticleSearchIndexItem, type CaseSearchIndexItem } from "@/utils/search";
import { type CommonKeysInTypes } from "@/utils/types";

import { useRouter } from "next/router";
import React, { Fragment, type FunctionComponent } from "react";

import * as styles from "./SearchPage.styles";

const SearchPageResults: FunctionComponent = () => 
{

  // WE NEED THE ObjectOfUploadedMaterialsSearch OBJECT TO BE THE SAME AS THE AcceptedObject OBJECT to remove the as UploadedFile[]
  // const ObjectOfUploadedMaterialsSearch = {
  //   id: "84b87741-7760-4b81-9a07-2811373b58fb",
  //   originalFilename: "screencapture-hassanmostafaa-github-io-BlueCircle-2023-09-03-19_56_59screencapture-hassanmostafaa-github-io-TravelShare-2023-09-03-19_56_33screencapture-hassanmostafaa-github-io-TravelShare-2023-09-03-19_56.png",
  //   userId: "ba075a97-6cdb-455d-a145-67f3f1965f79"
  // };
  // const AcceptedObject = {
  //   createdAt: "2023-10-06T16:53:11.000Z",
  //   fileExtension: "png",
  //   folderId: null,
  //   id: "3a426f7a-bfa1-4264-aaec-b9b2414762c9",
  //   originalFilename: "screencapture-hassan-mostafa-vercel-app-2023-09-03-19_58_11 - Copy (2).png",
  //   serverFilename: "1696611189270-screencapture-hassan-mostafa-vercel-app-2023-09-03-19_58_11---Copy-(2).png",
  //   sizeInBytes: 747491,
  //   userId: "ba075a97-6cdb-455d-a145-67f3f1965f79"
  // };

  const { searchResults } = useSearchResults();
  const router = useRouter();
  const routerTabQuery = router.query.tab as keyof SearchResults;
  
  if(routerTabQuery === "userUploads") 
  { 
    return (
      searchResults[routerTabQuery]?.length > 0 && (
        <div css={styles.searchPageResults}>
          <SearchPapersBlock 
            table={(
              <UploadedMaterialTable 
                uploadedFiles={searchResults[routerTabQuery] as UploadedFile[]}
                variant="searchPapers"
              />
            )}
            numberOfTableItems={searchResults[routerTabQuery]?.length}
          />
        </div>
      )
    );
  }
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
      searchResults[routerTabQuery]?.length > 0 && (
        <div css={styles.searchPageResults}>
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
      )
    );
  }

};

export default SearchPageResults;
