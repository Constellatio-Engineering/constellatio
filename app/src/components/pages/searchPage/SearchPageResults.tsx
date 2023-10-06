import ItemBlock, { type ICaseBlockProps } from "@/components/organisms/caseBlock/ItemBlock";
import useSearchResults from "@/hooks/useSearchResults";

import { useRouter } from "next/router";
import React, { type FunctionComponent } from "react";

const SearchPageResults: FunctionComponent = () => 
{
  const { searchResults } = useSearchResults();
  const router = useRouter();
  const routerTabQuery = router.query.tab as string;

  return (
    <div>
      <ItemBlock
        blockHead={{
          blockType: "searchBlock",
          categoryName: "hi",
          completedCases: 6,
          items: (searchResults as { [key: string]: unknown[] })[routerTabQuery]?.length,
          variant: "case",
        }}
        variant="caseSearch"
        // items={(searchResults as { [key: string]: ICaseBlockProps["items"] })[routerTabQuery]}
        items={searchResults.cases.map(item => ({
          __typename: "Case", id: item.id, legalArea: { __typename: "LegalArea", ...item.legalArea }, mainCategoryField: item.mainCategory, title: item.title
        }))}
      />
    </div>
  );
};

export default SearchPageResults;
