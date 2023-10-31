import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import useSearchResults, { type SearchResults, type SearchResultsKey } from "@/hooks/useSearchResults";
import useSearchBarStore from "@/stores/searchBar.store";

import { createParser, useQueryState } from "next-usequerystate";
import React, { type FunctionComponent } from "react";

import * as styles from "./SearchPage.styles";
import SearchPageFiltering from "./SearchPageFiltering";
import SearchPageHeader from "./SearchPageHeader";
import SearchPageResults from "./SearchPageResults";

const tabSchema = createParser({
  parse: (query: string) =>
  {
    switch (query as keyof SearchResults)
    {
      case "userUploads": case "userDocuments": { return "userUploads"; }
      case "cases": { return "cases"; }
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
  const { searchResults } = useSearchResults();
  const searchValue = useSearchBarStore((s) => s.searchValue);
  const closestTabWithResultsIndex = Object.values(searchResults).findIndex(result => result.length > 0);
  // const tabs = Object.keys(searchResults) as keyof SearchResults;
  // tabs.pop();
  const totalSearchResults = Object.values(searchResults).reduce((acc, curr) => acc + curr.length, 0);
  const initialTab: SearchResultsKey = (Object.keys(searchResults) as SearchResultsKey[])[closestTabWithResultsIndex] ?? "articles";
  const [tabQuery, setTabQuery] = useQueryState<SearchResultsKey>("tab", tabSchema.withDefault(initialTab));

  // console.log("initialTab", tabs);

  return (
    <div css={styles.wrapper}>
      {Object.values(searchResults).every((result) => result.length === 0) ? (
        <EmptyStateCard
          variant="For-large-areas"
          title={`Keine Ergebnisse ${searchValue && `für “${searchValue}”`}`}
          text="Bitte versuche es mit anderen Begriffen oder Tags, um relevante Inhalte zu finden."
        />
      ) : (
        <>
          <SearchPageHeader
            totalSearchResults={totalSearchResults}
            tabQuery={tabQuery}
            setTabQuery={setTabQuery}
          />
          <SearchPageFiltering/>
          <SearchPageResults
            tabQuery={tabQuery}
          />
        </>
      )}
    </div>
  );
};

export default SearchPage;
