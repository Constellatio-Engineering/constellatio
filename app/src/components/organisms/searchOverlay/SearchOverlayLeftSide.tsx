import { CustomLink } from "@/components/atoms/CustomLink/CustomLink";
import Label from "@/components/atoms/label/Label";
import Tag from "@/components/atoms/tag/Tag";
import useSearchResults from "@/hooks/useSearchResults";
import useSearchBarStore from "@/stores/searchBar.store";
import { paths } from "@/utils/paths";

import Link from "next/link";
import React, { type FunctionComponent } from "react";

import * as styles from "./SearchOverlay.styles";
import EmptyStateCard from "../emptyStateCard/EmptyStateCard";

type SearchOverlayLeftSideProps = {
  readonly hasInput: boolean;
};

const SearchOverlayLeftSide: FunctionComponent<SearchOverlayLeftSideProps> = ({ hasInput }) =>
{
  const searchHistory = useSearchBarStore((s) => s.searchHistory);
  const setSearchValue = useSearchBarStore((s) => s.setSearchValue);
  const searchValue = useSearchBarStore((s) => s.searchValue);
  const { searchResults } = useSearchResults(searchValue);

  // TODO: <div css={styles.suggestionsLeft}> can/should be extracted to a separate component because it is reused
  // TODO: Every suggestion section can/should be extracted to a separate component because it is reused

  if(!hasInput)
  {
    return (
      <div css={styles.suggestionsLeft}>
        <div className="suggestion__section">
          <Label variant="neutral">Recent searches</Label>
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
        </div>
        <div className="suggestion__section">
          <Label variant="neutral">popular searches</Label>
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
        </div>
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
        <div className="suggestion__section">
          <Label variant="case">Cases</Label>
          {searchResults.cases.map((result) => (
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
        </div>
      )}
      {searchResults.articles.length > 0 && (
        <div className="suggestion__section">
          <Label variant="dictionary">Dictionary</Label>
          {searchResults.articles.map((article) => (
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
        </div>
      )}
    </div>
  );
};

export default SearchOverlayLeftSide;
