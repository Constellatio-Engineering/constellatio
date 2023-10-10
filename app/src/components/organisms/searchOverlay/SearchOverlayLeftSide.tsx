import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { CustomLink } from "@/components/atoms/CustomLink/CustomLink";
import Tag from "@/components/atoms/tag/Tag";
import useSearchResults from "@/hooks/useSearchResults";
import useSearchBarStore from "@/stores/searchBar.store";
import { paths } from "@/utils/paths";

import { useMantineTheme } from "@mantine/styles";
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
  const setSearchValue = useSearchBarStore((s) => s.setSearchValue);
  const { isLoading, searchResults } = useSearchResults();
  const theme = useMantineTheme();
  const hasNoResults = searchResults.cases.length === 0 && searchResults.articles.length === 0;

  // Loading should be so fast that it is okay to show the recent searches in the meantime, so it switches instantly from recent searches to results
  if(!hasInput || isLoading) 
  {
    return (
      <div css={styles.suggestionsLeft({ hasInput, hasNoResults, theme })}>
        <SuggestionSection label="recent searches" labelVariant="neutral">
          {searchHistory.length > 0 ? (
            searchHistory.map((result, index) => (
              <span
                onClick={() => setSearchValue(result)}
                key={index}
                className="suggestion__section__link">
                <CustomLink styleType="link-content-title" component="p">
                  {result}
                </CustomLink>
              </span>
            ))
          ) : (
            <BodyText styleType="body-01-medium" c="neutrals-02.1">
              Your search history is clean
            </BodyText>
          )}
        </SuggestionSection>
        {/* <SuggestionSection label="popular search" labelVariant="neutral">
          {searchHistory.map((result, index) => (
            <span
              onClick={() => setSearchValue(result)}
              key={index}
              className="suggestion__section__link">
              <CustomLink styleType="link-content-title" component="p">
                {result}
              </CustomLink>
            </span>
          ))}
        </SuggestionSection> */}
      </div>
    );
  }

  if(hasNoResults) 
  {
    return (
      <div css={styles.suggestionsLeft({ hasInput, hasNoResults, theme })}>
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
    <div css={styles.suggestionsLeft({ hasInput, hasNoResults, theme })}>
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
