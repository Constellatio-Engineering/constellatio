import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import useSearchResults, { type SearchResultsKey } from "@/hooks/useSearchResults";
import useSearchBarStore from "@/stores/searchBar.store";

import { Loader } from "@mantine/core";
import { createParser, useQueryState } from "next-usequerystate";
import { type FunctionComponent, useMemo } from "react";

import * as styles from "./SearchPage.styles";
import SearchPageFiltering from "./SearchPageFiltering";
import SearchPageHeader from "./SearchPageHeader";
import SearchPageResults from "./SearchPageResults";

const tabSchema = createParser({
  parse: (query: string) =>
  {
    switch (query as SearchResultsKey)
    {
      case "userUploads": { return "userUploads"; }
      case "cases": { return "cases"; }
      case "forumQuestions": { return "forumQuestions"; }
      case "articles": { return "articles"; }
      default:
      {
        console.error(`Unknown tab query at createParser: ${query}`);
        return "cases";
      }
    }
  },
  serialize: (query) => query
});

const SearchPage: FunctionComponent = () => 
{
  const { isLoading, searchResults } = useSearchResults();
  const searchValue = useSearchBarStore((s) => s.searchValue);
  const closestTabWithResultsIndex = Object.values(searchResults).findIndex(result => result.length > 0);
  const totalSearchResults = Object.values(searchResults).reduce((acc, curr) => acc + curr.length, 0);
  const initialTab = useMemo(() => 
  {
    const tabs = Object.keys(searchResults).filter(tab => tab !== "userDocuments") as SearchResultsKey[];
    return tabs[closestTabWithResultsIndex] ?? "articles";
  }, [searchResults, closestTabWithResultsIndex]);

  const [tabQuery, setTabQuery] = useQueryState<SearchResultsKey>("tab", tabSchema.withDefault(initialTab));

  if(isLoading)
  {
    return (
      <ContentWrapper>
        <div css={styles.loadingWrapper}>
          <Loader size="md"/>
        </div>
      </ContentWrapper>
    );
  }

  return (
    <div css={styles.wrapper}>
      {Object.values(searchResults).every((result) => result.length === 0) ? (
        <ContentWrapper>
          <EmptyStateCard
            variant="For-large-areas"
            title={`Keine Ergebnisse ${searchValue && `für “${searchValue}”`}`}
            text="Bitte versuche es mit anderen Begriffen oder Tags, um relevante Inhalte zu finden."
          />
        </ContentWrapper>
      ) : (
        <>
          <SearchPageHeader
            totalSearchResults={totalSearchResults}
            tabQuery={tabQuery}
            setTabQuery={setTabQuery}
          />
          <SearchPageFiltering/>
          <SearchPageResults tabQuery={tabQuery}/>
        </>
      )}
    </div>
  );
};

export default SearchPage;
