import { CustomLink } from "@/components/atoms/CustomLink/CustomLink";
import CategoryButton from "@/components/molecules/categoryButton/CategoryButton";
import { SearchOverlayLink } from "@/components/organisms/searchOverlay/SearchOverlayLink";
import useGetPopularSearch from "@/hooks/useGetPopularSearch";
import useSearchResults from "@/hooks/useSearchResults";

import { appPaths } from "@constellatio/shared/paths";
import { type FunctionComponent } from "react";

import * as styles from "./SearchOverlay.styles";
import SuggestionSection from "./SuggestionSection";

type SearchOverlayRightSideProps = {
  readonly hasInput: boolean;
};

const SearchOverlayRightSide: FunctionComponent<SearchOverlayRightSideProps> = ({ hasInput }) =>
{
  const { searchResults } = useSearchResults();
  const { popularSearch } = useGetPopularSearch();

  return (
    <div css={styles.suggestionsRight}>
      {hasInput && (searchResults.userDocuments.length > 0 || searchResults.userUploads.length > 0) && (
        <>
          <SuggestionSection label="Dateien & Docs" labelVariant="neutral">
            {searchResults.userUploads.slice(0, 9).map((result) => (
              <SearchOverlayLink href={{ pathname: appPaths.search, query: { find: result.originalFilename, tab: "userUploads" } }} key={result.id} className="suggestion__section__link">
                <CustomLink styleType="link-content" component="p">
                  Hochgeladene Dateien / {result.originalFilename}
                </CustomLink>
              </SearchOverlayLink>
            ))}
            {searchResults.userDocuments.slice(0, 9).map((result) => (
              <SearchOverlayLink href={{ pathname: appPaths.search, query: { find: result.name, tab: "userUploads" } }} key={result.id} className="suggestion__section__link">
                <CustomLink styleType="link-content" component="p">
                  Constellatio Docs / {result.name}
                </CustomLink>
              </SearchOverlayLink>
            ))}
          </SuggestionSection>
        </>
      )}
      <SuggestionSection label="Häufige Rechts- und Teilgebiete" labelVariant="neutral">
        <div className="popularCategories">
          {popularSearch?.popularCategories?.map(result => (
            <SearchOverlayLink href={{ pathname: appPaths.search, query: { find: result?.searchField } }} className="suggestion__section__link" key={result?.id}>
              <CategoryButton>{result?.searchField}</CategoryButton>
            </SearchOverlayLink>
          ))}
        </div>
      </SuggestionSection>
    </div>
  );
};

export default SearchOverlayRightSide;
