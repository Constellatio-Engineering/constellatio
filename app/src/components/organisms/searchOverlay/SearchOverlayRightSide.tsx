import { CustomLink } from "@/components/atoms/CustomLink/CustomLink";
import Label from "@/components/atoms/label/Label";
import CategoryButton from "@/components/molecules/categoryButton/CategoryButton";
import useSearchStore from "@/stores/search.store";

import React, { type FunctionComponent, type ReactNode } from "react";

import * as styles from "./SearchOverlay.styles";

type SearchOverlayRightSideProps = {
  readonly hasInput: boolean;
};

const SearchOverlayRightSide: FunctionComponent<SearchOverlayRightSideProps> = ({ hasInput }) =>
{
  const searchResults = useSearchStore((s) => s.searchResults);

  return (
    <div css={styles.suggestionsRight}>
      {hasInput && searchResults.userUploads.length > 0 && (
        <>
          <div className="suggestion__section">
            <Label variant="neutral">Your materials</Label>
            {searchResults.userUploads.map((result) => (
              <span key={result.uuid} className="suggestion__section__link">
                <CustomLink styleType="link-content" component="p">
                  {result.originalFilename}
                </CustomLink>
              </span>
            ))}
          </div>
        </>
      )}
      <div className="suggestion__section">
        <Label variant="neutral">popular categories</Label>
        <div className="popularCategories">
          <span className="suggestion__section__link">
            <CategoryButton>Cases / Civil law / labor law</CategoryButton>
          </span>
          <span className="suggestion__section__link">
            <CategoryButton>dictionary / Civil law</CategoryButton>
          </span>
          <span className="suggestion__section__link">
            <CategoryButton>Cases / Civil law</CategoryButton>
          </span>
          <span className="suggestion__section__link">
            <CategoryButton>
              dictionary / criminal law / very long category name
            </CategoryButton>
          </span>
          <span className="suggestion__section__link">
            <CategoryButton>Cases / Civil law / labor law</CategoryButton>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlayRightSide;
