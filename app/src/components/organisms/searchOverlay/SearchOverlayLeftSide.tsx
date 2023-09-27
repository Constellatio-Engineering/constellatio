import { CustomLink } from "@/components/atoms/CustomLink/CustomLink";
import Label from "@/components/atoms/label/Label";
import Tag from "@/components/atoms/tag/Tag";
import useSearchStore from "@/stores/search.store";

import Link from "next/link";
import React, { type FunctionComponent, type ReactNode } from "react";

import * as styles from "./SearchOverlay.styles";
import EmptyStateCard from "../emptyStateCard/EmptyStateCard";

type SearchOverlayLeftSideProps = {
  readonly DataIsLoading: ReactNode;
  readonly hasInput: boolean;
};

const SearchOverlayLeftSide: FunctionComponent<SearchOverlayLeftSideProps> = ({ DataIsLoading, hasInput }) => 
{
  const searchResults = useSearchStore((s) => s.searchResults);
  const isLoading = useSearchStore((s) => s.isLoading);
  const searchHistory = useSearchStore((s) => s.searchHistory);
  const setSearchValue = useSearchStore((s) => s.setSearchValue);

  return (
    <div css={styles.suggestionsLeft}>
      {DataIsLoading}
      {hasInput && searchResults.cases.length < 1 ? (
        !isLoading && (
          <span className="emptyStateCard">
            <EmptyStateCard
              variant="For-small-areas"
              title="No search results in cases"
              text="Please adjust your search if you’re looking for the materials in the categories mentioned above"
            />
          </span>
        )
      ) : (
        hasInput ? (
          <>
            <div className="suggestion__section">
              <Label variant="case">Cases</Label>
              {searchResults.cases.map((result) => (
                <Link
                  key={result.id}
                  href={`cases/${result.id}`}
                  className="suggestion__section__link">
                  <CustomLink styleType="link-content-title" component="p">
                    {result.title}
                  </CustomLink>
                  <Tag>{result.mainCategory.mainCategory}</Tag>
                </Link>
              ))}
            </div>
            <div className="suggestion__section">
              <Label variant="case">Cases</Label>
              {searchResults.cases.map((result) => (
                <Link
                  key={result.id}
                  href={`cases/${result.id}`}
                  className="suggestion__section__link">
                  <CustomLink styleType="link-content-title" component="p">
                    {result.title}
                  </CustomLink>
                  <Tag>{result.mainCategory.mainCategory}</Tag>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <>
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
          </>
        )
      )}
    </div>
  );
};

export default SearchOverlayLeftSide;
