import { Svg } from "@/basic-components/SVG/Svg";
import ItemBlock from "@/components/organisms/caseBlock/ItemBlock";
import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import FileViewer from "@/components/organisms/fileViewer/FileViewer";
import UploadedMaterialTable from "@/components/organisms/uploadedMaterialTable/UploadedMaterialTable";
import SearchPapersBlock from "@/components/searchPapersBlock/SearchPapersBlock";
import useSearchResults, { type SearchResults } from "@/hooks/useSearchResults";
import { type IGenArticleOverviewFragment, type IGenFullCaseFragment } from "@/services/graphql/__generated/sdk";
import useMaterialsStore from "@/stores/materials.store";
import { type ArticleSearchIndexItem, type CaseSearchIndexItem } from "@/utils/search";
import { type CommonKeysInTypes } from "@/utils/types";

import { useRouter } from "next/router";
import { Fragment, type FunctionComponent } from "react";

import * as styles from "./SearchPage.styles";

const SearchPageResults: FunctionComponent = () => 
{
  const { searchResults } = useSearchResults();
  const router = useRouter();
  const routerTabQuery = router.query.tab as keyof SearchResults;
  const { selectedFileIdForPreview } = useMaterialsStore();

  const NoResultsFound = (
    <EmptyStateCard 
      title={`No search results found ${router.query.find && `for “${router.query.find}”`} ${routerTabQuery && `at ${routerTabQuery}`}`} 
      text="check other tabs or try different search entry"
      variant="For-large-areas"
    />
  );

  const date = new Date();
  
  if(routerTabQuery === "userUploads") 
  { 
    return (
      searchResults[routerTabQuery]?.length > 0 ? (
        <div css={styles.searchPageResults}>
          <SearchPapersBlock 
            table={(
              <UploadedMaterialTable
                uploadedFiles={searchResults[routerTabQuery].map(file => ({
                  createdAt: date,
                  fileExtension: "",
                  folderId: "",
                  id: file.id,
                  note: null,
                  notes: [],
                  originalFilename: file.originalFilename,
                  serverFilename: "",
                  sizeInBytes: 1,
                  userId: file.userId
                }))}
                variant="searchPapers"
                selectedFolderId={null} // TODO
              />
            )}
            numberOfTableItems={searchResults[routerTabQuery]?.length}
          />
          {selectedFileIdForPreview && (
            <FileViewer/>
          )}
        </div>
      ) : NoResultsFound
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
      searchResults[routerTabQuery]?.length > 0 ? (
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
      ) : (
        NoResultsFound
      )
    );
  }

};

export default SearchPageResults;
