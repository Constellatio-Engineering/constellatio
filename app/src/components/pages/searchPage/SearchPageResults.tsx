import { Svg } from "@/basic-components/SVG/Svg";
import ItemBlock from "@/components/organisms/caseBlock/ItemBlock";
import DocsTable from "@/components/organisms/docsTable/DocsTable";
import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import SearchPapersBlock from "@/components/organisms/searchPapersBlock/SearchPapersBlock";
import UploadedMaterialTable from "@/components/organisms/uploadedMaterialTable/UploadedMaterialTable";
import useSearchResults, { type SearchResultsKey, type SearchResults } from "@/hooks/useSearchResults";
import { type IGenArticleOverviewFragment, type IGenFullCaseFragment } from "@/services/graphql/__generated/sdk";
import { type ArticleSearchIndexItem, type CaseSearchIndexItem } from "@/utils/search";
import { type CommonKeysInTypes } from "@/utils/types";

import { useRouter } from "next/router";
import { Fragment, type FunctionComponent } from "react";

import { convertTabQueryAsItemTab } from "./seachPageHelpers";
import * as styles from "./SearchPage.styles";

type Props = {
  readonly tabQuery: SearchResultsKey;
};

const SearchPageResults: FunctionComponent<Props> = ({ tabQuery }) =>
{
  const { searchResults } = useSearchResults();
  const router = useRouter();

  const NoResultsFound = (
    <EmptyStateCard
      title={`Keine Ergebnisse ${router.query.find && `für “${router.query.find}”`} ${convertTabQueryAsItemTab(tabQuery) && `in ${convertTabQueryAsItemTab(tabQuery)}`}`}
      text="Schaue in anderen Kategorien oder starte eine neue Suche"
      variant="For-large-areas"
    />
  );

  switch (tabQuery)
  {
    case "articles":
    case "cases":
    {
      const filteredMainCategories = searchResults[tabQuery]?.map((item) => item.mainCategory).filter((mainCategory, index, arr) =>
        index === arr.findIndex((el) => (
          el?.id === mainCategory?.id
        ))
      );

      const groupedResultsByCategory = filteredMainCategories?.map((mainCategory) =>
      {
        return {
          items: searchResults[tabQuery]?.filter((item) => item.mainCategory?.id === mainCategory?.id) as SearchResults["cases"] | SearchResults["articles"],
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
        searchResults[tabQuery]?.length > 0 ? (
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
                    variant={tabQuery === "cases" ? "case" : "dictionary"}
                    tableType="search"
                    blockHead={{
                      blockType: "searchBlock",
                      categoryName: mainCategory?.mainCategory ?? "",
                      icon: {
                        alt: mainCategoryIcon?.description ?? (mainCategoryIcon?.title || ""),
                        src: <Svg src={mainCategoryIcon?.src}/>
                      },
                      items: categoryGroup.items?.length,
                      variant: tabQuery === "cases" ? "case" : "dictionary"
                    }}
                    items={tabQuery === "cases" ? caseItems?.map(item => ({
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
            })}
          </div>
        ) : (
          NoResultsFound
        )
      );
    }
    case "userUploads":
    {
      return (
        (searchResults.userUploads?.length > 0 || searchResults.userDocuments?.length > 0) ? (
          <div css={styles.searchPageResults}>
            {searchResults.userDocuments?.length > 0 && (
              <SearchPapersBlock
                variant="userDocuments"
                table={(
                  <DocsTable
                    docs={searchResults.userDocuments.map(doc => ({
                      content: doc.content,
                      createdAt: new Date(doc.createdAt),
                      folderId: doc.folderId,
                      id: doc.id,
                      name: doc.name,
                      updatedAt: new Date(doc.updatedAt),
                      userId: doc.userId
                    }))}
                  />
                )}
                numberOfTableItems={searchResults.userDocuments?.length}
              />
            )}
            {searchResults.userUploads?.length > 0 && (
              <SearchPapersBlock
                variant="userUploads"
                table={(
                  <UploadedMaterialTable
                    uploadedFiles={searchResults.userUploads.map(file => ({
                      contentType: file.contentType,
                      createdAt: new Date(file.createdAt),
                      fileExtension: file.fileExtension,
                      folderId: file.folderId,
                      id: file.id,
                      note: null,
                      notes: [],
                      originalFilename: file.originalFilename,
                      serverFilename: "",
                      sizeInBytes: 1,
                      userId: file.userId
                    }))}
                    variant="searchPapers"
                  />
                )}
                numberOfTableItems={searchResults.userUploads?.length}
              />
            )}
          </div>
        ) : NoResultsFound
      );
    }
    default:
    {
      console.error(`Unknown tab query at SearchPageResults: ${tabQuery}`);
      return null;
    }
  }
};

export default SearchPageResults;
