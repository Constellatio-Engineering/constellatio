import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Checkbox } from "@/components/atoms/Checkbox/Checkbox";
import IconButton from "@/components/atoms/iconButton/IconButton";
import { ArrowDown } from "@/components/Icons/ArrowDown";
import { UnstyledButton } from "@/components/molecules/unstyledButton/UnstyledButton";
import { colors } from "@/constants/styles/colors";

import { Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import fuzzysort from "fuzzysort";
import React, { type FunctionComponent, useDeferredValue, useMemo } from "react";

import * as styles from "./FilterCategory.styles";

type Props = {
  readonly activeFiltersCount: number;
  readonly clearFilters: () => void;
  readonly items: Array<{
    readonly id: string;
    readonly isChecked: boolean;
    readonly label: string;
    readonly toggle: () => void;
  }>;
  readonly search?: {
    readonly searchesFor: string;
  };
  readonly title: string;
};

export const FilterCategory: FunctionComponent<Props> = ({
  activeFiltersCount,
  clearFilters,
  items: _items,
  search,
  title
}) =>
{
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
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
      <UnstyledButton css={styles.categoryTitleWrapper} onClick={() => setIsOpen((isOpen) => !isOpen)}>
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
                  setIsOpen(false);
                }}>
                zurücksetzen
              </UnstyledButton>
              <div css={styles.divider}/>
            </>
          )}
          <IconButton
            stylesOverrides={styles.expandButton}
            icon={<ArrowDown/>}
            size={"big"}
            onClick={(e) =>
            {
              e.stopPropagation();
              setIsOpen((isOpen) => !isOpen);
            }}
          />
        </div>
      </UnstyledButton>
      <div css={[styles.itemsWrapper, !isOpen && styles.itemWrapperCollapsed]}>
        {search && (
          <div css={styles.searchInputWrapper}>
            <Input
              icon={<IconSearch size={20}/>}
              placeholder={`Suche nach ${search.searchesFor}`}
              styles={{
                icon: {
                  color: colors["neutrals-01"][7],
                },
                input: {
                  "&::placeholder": {
                    color: colors["neutrals-01"][7],
                  },
                  "&:focus-within": {
                    borderColor: colors["neutrals-01"][7],
                  },
                  border: "1px solid ##D6D6D6",
                },
                wrapper: {}
              }}
              value={searchValue}
              onChange={(event) => setSearchValue(event.currentTarget.value)}
              size={"md"}
              radius="md"
            />
          </div>
        )}
        {itemsFiltered.map((item) => (
          <div css={styles.itemWrapper} key={item.id}>
            <Checkbox
              checked={item.isChecked}
              onChange={(_event) => item.toggle()}
              label={item.label}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
