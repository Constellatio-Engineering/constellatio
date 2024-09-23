import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Checkbox } from "@/components/atoms/Checkbox/Checkbox";
import IconButton from "@/components/atoms/iconButton/IconButton";
import { ArrowDown } from "@/components/Icons/ArrowDown";
import { UnstyledButton } from "@/components/molecules/unstyledButton/UnstyledButton";

import React, { type FunctionComponent } from "react";

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
  readonly title: string;
};

export const FilterCategory: FunctionComponent<Props> = ({
  activeFiltersCount,
  clearFilters,
  items,
  title
}) =>
{
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const hasActiveFilters = activeFiltersCount > 0;

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
        {items.map((item) => (
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
