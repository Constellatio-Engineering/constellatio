import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { ArrowDown } from "@/components/Icons/ArrowDown";
import { UnstyledButton } from "@/components/molecules/unstyledButton/UnstyledButton";
import FilterItem from "@/components/pages/OverviewPage/overviewFiltersDrawer/filterCategory/filterItem/FilterItem";
import { colooors } from "@/constants/styles/colors";

import { type Nullable } from "@constellatio/utility-types";
import { Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import fuzzysort from "fuzzysort";
import { type FunctionComponent, useDeferredValue, useMemo } from "react";

import * as styles from "./FilterCategory.styles";

export type FilterCategoryProps = {
  readonly activeFiltersCount: number;
  readonly clearFilters: () => void; 
  readonly items: Array<{
    readonly isChecked: boolean;
    readonly label: string;
    readonly toggle: () => void;
    readonly value: string | number;
  }>;
  readonly searchesFor: Nullable<string>;
  readonly title: string;
};

export const FilterCategory: FunctionComponent<FilterCategoryProps> = ({
  activeFiltersCount,
  clearFilters,
  items: _items,
  searchesFor,
  title
}) =>
{
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const hasActiveFilters = activeFiltersCount > 0;
  const [searchValue, setSearchValue] = React.useState<string>("");

  const _itemsFiltered = useMemo(() =>
  {
    return searchValue.length === 0 ? _items : fuzzysort
      .go(searchValue, _items, {
        key: "label" satisfies keyof typeof _items[number],
        threshold: 0.5,
      })
      .map(result => result.obj);
  }, [_items, searchValue]);

  const itemsFiltered = useDeferredValue(_itemsFiltered);

  return (
    <div css={styles.wrapper}>
      <div css={styles.categoryTitleWrapper} onClick={() => setIsOpen((isOpen) => !isOpen)}>
        <BodyText component="p" styleType="body-01-bold" sx={{ fontSize: 18, fontWeight: 500 }}>
          {title}
          {" "}
          {hasActiveFilters && (
            <span css={styles.activeFiltersCount}>({activeFiltersCount})</span>
          )}
        </BodyText>
        <div css={styles.categoryActionsWrapper}>
          {hasActiveFilters && (
            <>
              <UnstyledButton
                styles={styles.resetButton}
                onClick={(e) =>
                {
                  e.stopPropagation();
                  clearFilters();
                }}>
                zurücksetzen
              </UnstyledButton>
              <div css={styles.divider}/>
            </>
          )}
          <UnstyledButton css={styles.expandIconWrapper}>
            <ArrowDown size={22}/>
          </UnstyledButton>
        </div>
      </div>
      <div css={[styles.itemsWrapper, !isOpen && styles.itemWrapperCollapsed]}>
        {(searchesFor != null) && (
          <div css={styles.searchInputWrapper}>
            <Input
              icon={<IconSearch size={20}/>}
              placeholder={`Suche nach ${searchesFor}`}
              styles={{
                icon: {
                  color: colooors["neutrals-01"][7],
                },
                input: {
                  "&::placeholder": {
                    color: colooors["neutrals-01"][7],
                  },
                  "&:focus-within": {
                    borderColor: colooors["neutrals-01"][7],
                  },
                  border: "1px solid ##D6D6D6",
                },
              }}
              value={searchValue}
              onChange={(event) => setSearchValue(event.currentTarget.value)}
              size={"md"}
              radius="md"
            />
          </div>
        )}
        {itemsFiltered.map((item) => (
          <FilterItem key={item.value} {...item}/>
        ))}
      </div>
    </div>
  );
};
