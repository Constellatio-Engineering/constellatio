import { CustomLink } from "@/components/atoms/CustomLink/CustomLink";
import CategoryButton from "@/components/molecules/categoryButton/CategoryButton";
import useGetPopularSearch from "@/hooks/useGetPopularSearch";
import useSearchResults from "@/hooks/useSearchResults";
import { paths } from "@/utils/paths";

import Link from "next/link";
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
          <SuggestionSection label="Deine Dateien" labelVariant="neutral">
            {searchResults.userUploads.slice(0, 9).map((result) => (
              <Link href={`${paths.search}?.find=${result.originalFilename}&tab=userUploads`} key={result.id} className="suggestion__section__link">
                <CustomLink styleType="link-content" component="p">
                  Hochgeladene Dateien / {result.originalFilename}
                </CustomLink>
              </Link>
            ))}
            {searchResults.userDocuments.slice(0, 9).map((result) => (
              <Link href={`${paths.search}?.find=${result.name}&tab=userUploads`} key={result.id} className="suggestion__section__link">
                <CustomLink styleType="link-content" component="p">
                  Constellatio Docs / {result.name}
                </CustomLink>
              </Link>
            ))}
          </SuggestionSection>
        </>
      )}
      <SuggestionSection label="Häufige Rechtsgebiete" labelVariant="neutral">
        <div className="popularCategories">
          
          {popularSearch?.popularCategories?.map(result => (
            <Link href={`${paths.search}?find=${result?.searchField}`} className="suggestion__section__link" key={result?.id}>
              <CategoryButton>{result?.searchField}</CategoryButton>
            </Link>
          ))}
        </div>
      </SuggestionSection>
    </div>
  );
};

export default SearchOverlayRightSide;
