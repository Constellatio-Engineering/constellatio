import { CustomLink } from "@/components/atoms/CustomLink/CustomLink";
import CategoryButton from "@/components/molecules/categoryButton/CategoryButton";
import useSearchResults from "@/hooks/useSearchResults";

import { type FunctionComponent } from "react";

import * as styles from "./SearchOverlay.styles";
import SuggestionSection from "./SuggestionSection";

type SearchOverlayRightSideProps = {
  readonly hasInput: boolean;
};

const SearchOverlayRightSide: FunctionComponent<SearchOverlayRightSideProps> = ({ hasInput }) =>
{
  const { searchResults } = useSearchResults();

  return (
    <div css={styles.suggestionsRight}>
      {hasInput && searchResults.userUploads.length > 0 && (
        <>
          <SuggestionSection label="Your materials" labelVariant="neutral">
            {searchResults.userUploads.map((result) => (
              <span key={result.id} className="suggestion__section__link">
                <CustomLink styleType="link-content" component="p">
                  {result.originalFilename}
                </CustomLink>
              </span>
            ))}
          </SuggestionSection>
        </>
      )}
      <SuggestionSection label="popular categories" labelVariant="neutral">
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
      </SuggestionSection>
    </div>
  );
};

export default SearchOverlayRightSide;
