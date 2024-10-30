import { CustomLink } from "@/components/atoms/CustomLink/CustomLink";
import Tag from "@/components/atoms/tag/Tag";
import { SearchOverlayLink } from "@/components/organisms/searchOverlay/SearchOverlayLink";
import useGetPopularSearch from "@/hooks/useGetPopularSearch";
import useSearchResults from "@/hooks/useSearchResults";
import useSearchBarStore from "@/stores/searchBar.store";

import { appPaths } from "@constellatio/shared/paths";
import { type FunctionComponent } from "react";

import * as styles from "./SearchOverlay.styles";
import SuggestionSection from "./SuggestionSection";
import EmptyStateCard from "../emptyStateCard/EmptyStateCard";

type SearchOverlayLeftSideProps = {
  readonly hasInput: boolean;
};

const SearchOverlayLeftSide: FunctionComponent<SearchOverlayLeftSideProps> = ({ hasInput }) =>
{
  const searchValue = useSearchBarStore((s) => s.searchValue);
  const searchHistory = useSearchBarStore((s) => s.searchHistory);
  const { isLoading, searchResults } = useSearchResults(searchValue);
  const { popularSearch } = useGetPopularSearch();

  // Loading should be so fast that it is okay to show the recent searches in the meantime, so it switches instantly from recent searches to results
  if(!hasInput || isLoading)
  {
    return (
      <div css={styles.suggestionsLeft}>
        <SuggestionSection label="Zuletzt gesucht" labelVariant="neutral">
          {searchHistory.slice(0, 9).map((result, index) => (
            <SearchOverlayLink
              href={`${appPaths.search}?find=${result}`}
              key={index}
              className="suggestion__section__link">
              <CustomLink styleType="link-content-title" component="p">
                {result}
              </CustomLink>
            </SearchOverlayLink>
          ))}
        </SuggestionSection>
        <SuggestionSection label="Häufig gesucht" labelVariant="neutral">
          {popularSearch?.popularSearches?.map((result) => (
            <SearchOverlayLink
              href={`${appPaths.search}?find=${result?.searchField}`}
              key={result?.id}
              className="suggestion__section__link">
              <CustomLink styleType="link-content-title" component="p">
                {result?.searchField}
              </CustomLink>
            </SearchOverlayLink>
          ))}
        </SuggestionSection>
      </div>
    );
  }

  if(searchResults.cases.length === 0 && searchResults.articles.length === 0 && searchResults.forumQuestions.length === 0)
  {
    return (
      <div css={styles.suggestionsLeft}>
        <span className="emptyStateCard">
          <EmptyStateCard
            variant="For-small-areas"
            title="Keine Ergebnisse"
            text="Bitte versuche es mit anderen Begriffen oder Tags, um relevante Inhalte zu finden."
          />
        </span>
      </div>
    );
  }

  return (
    <div css={styles.suggestionsLeft}>
      {searchResults.cases.length > 0 && (
        <SuggestionSection label="Fälle" labelVariant="case">
          {searchResults.cases.slice(0, 5).map((legalCase) =>
          {
            const mainCategory = legalCase.mainCategory?.mainCategory;
            return (
              <SearchOverlayLink
                key={legalCase.id}
                href={`${appPaths.cases}/${legalCase.id}`}
                title={legalCase.title ?? ""}
                className="suggestion__section__link">
                <CustomLink styleType="link-content-title" component="p">
                  {legalCase.title}
                </CustomLink>
                {mainCategory && (
                  <Tag title={mainCategory}/>
                )}
              </SearchOverlayLink>
            );
          })}
        </SuggestionSection>
      )}
      {searchResults.articles.length > 0 && (
        <SuggestionSection label="LEXIKON" labelVariant="dictionary">
          {searchResults.articles.slice(0, 5).map((article) =>
          {
            const mainCategory = article.mainCategory?.mainCategory;
            return (
              <SearchOverlayLink
                key={article.id}
                href={`${appPaths.dictionary}/${article.id}`}
                title={article.title ?? ""}
                className="suggestion__section__link">
                <CustomLink styleType="link-content-title" component="p">
                  {article.title}
                </CustomLink>
                {mainCategory && (
                  <Tag title={mainCategory}/>
                )}
              </SearchOverlayLink>
            );
          })}
        </SuggestionSection>
      )}
      {searchResults.forumQuestions.length > 0 && (
        <SuggestionSection label="FORUM" labelVariant="forum">
          {searchResults.forumQuestions.slice(0, 5).map((question) => (
            <SearchOverlayLink
              key={question.id}
              href={`${appPaths.forum}/${question.id}`}
              title={question.title}
              className="suggestion__section__link">
              <CustomLink styleType="link-content-title" component="p">
                {question.title}
              </CustomLink>
              {question.legalFields?.map((legalField) => (
                <Tag key={legalField.id} title={legalField.name}/>
              ))}
            </SearchOverlayLink>
          ))}
        </SuggestionSection>
      )}
    </div>
  );
};

export default SearchOverlayLeftSide;
