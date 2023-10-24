import { CustomLink } from "@/components/atoms/CustomLink/CustomLink";
import Tag from "@/components/atoms/tag/Tag";
import useGetPopularSearch from "@/hooks/useGetPopularSearch";
import useSearchResults from "@/hooks/useSearchResults";
import useSearchBarStore from "@/stores/searchBar.store";
import { paths } from "@/utils/paths";

import Link from "next/link";
import { type FunctionComponent } from "react";

import * as styles from "./SearchOverlay.styles";
import SuggestionSection from "./SuggestionSection";
import EmptyStateCard from "../emptyStateCard/EmptyStateCard";

type SearchOverlayLeftSideProps = {
  readonly hasInput: boolean;
};

const SearchOverlayLeftSide: FunctionComponent<SearchOverlayLeftSideProps> = ({ hasInput }) =>
{
  const searchHistory = useSearchBarStore((s) => s.searchHistory);
  const { isLoading, searchResults } = useSearchResults();
  const { popularSearch } = useGetPopularSearch();

  console.log("searchResults", searchResults);

  // Loading should be so fast that it is okay to show the recent searches in the meantime, so it switches instantly from recent searches to results
  if(!hasInput || isLoading)
  {
    return (
      <div css={styles.suggestionsLeft}>
        <SuggestionSection label="recent searches" labelVariant="neutral">
          {searchHistory.map((result, index) => (
            <Link
              href={`${paths.search}?find=${result}`}
              key={index}
              className="suggestion__section__link">
              <CustomLink styleType="link-content-title" component="p">
                {result}
              </CustomLink>
            </Link>
          ))}
        </SuggestionSection>
        <SuggestionSection label="popular search" labelVariant="neutral">
          {popularSearch?.popularSearches?.map((result) => (
            <Link
              href={`${paths.search}?find=${result?.searchField}`}
              key={result?.id}
              className="suggestion__section__link">
              <CustomLink styleType="link-content-title" component="p">
                {result?.searchField}
              </CustomLink>
            </Link>
          ))}
        </SuggestionSection>
      </div>
    );
  }

  if(searchResults.cases.length === 0 && searchResults.articles.length === 0)
  {
    return (
      <div css={styles.suggestionsLeft}>
        <span className="emptyStateCard">
          <EmptyStateCard
            variant="For-small-areas"
            title="No search results in cases and dictionary"
            text="Please adjust your search if you’re looking for the materials in the categories mentioned above"
          />
        </span>
      </div>
    );
  }

  return (
    <div css={styles.suggestionsLeft}>
      {searchResults.cases.length > 0 && (
        <SuggestionSection label="Cases" labelVariant="case">
          {searchResults.cases.slice(0, 9).map((result) => (
            <Link
              key={result.id}
              href={`${paths.cases}/${result.id}`}
              className="suggestion__section__link">
              <CustomLink styleType="link-content-title" component="p">
                {result.title}
              </CustomLink>
              <Tag>{result.mainCategory?.mainCategory}</Tag>
            </Link>
          ))}
        </SuggestionSection>
      )}
      {searchResults.articles.length > 0 && (
        <SuggestionSection label="Dictionary" labelVariant="dictionary">
          {searchResults.articles.slice(0, 9).map((article) => (
            <Link
              key={article.id}
              href={`${paths.dictionary}/${article.id}`}
              className="suggestion__section__link">
              <CustomLink styleType="link-content-title" component="p">
                {article.title}
              </CustomLink>
              <Tag>{article.mainCategory?.mainCategory}</Tag>
            </Link>
          ))}
        </SuggestionSection>
      )}
    </div>
  );
};

export default SearchOverlayLeftSide;
