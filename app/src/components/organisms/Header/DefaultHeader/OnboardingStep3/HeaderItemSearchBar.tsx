import SearchField from "@/components/molecules/searchField/SearchField";
import useSearchResults from "@/hooks/useSearchResults";
import useSearchBarStore from "@/stores/searchBar.store";

import { forwardRef, type ForwardRefRenderFunction } from "react";

const HeaderItemSearchBar: ForwardRefRenderFunction<HTMLDivElement> = (_, ref) => 
{

  const { refetch: refetchSearchResults } = useSearchResults();
  const openDrawer = useSearchBarStore((s) => s.openDrawer);

  return (
    <div className="search-input" ref={ref}>
      <SearchField
        size="small"
        onClick={() => openDrawer(refetchSearchResults)}
      />
    </div>
  );
};

export default forwardRef(HeaderItemSearchBar);
