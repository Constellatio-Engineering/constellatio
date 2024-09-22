import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Checkbox } from "@/components/atoms/Checkbox/Checkbox";
import IconButton from "@/components/atoms/iconButton/IconButton";
import { ArrowDown } from "@/components/Icons/ArrowDown";

import React, { type FunctionComponent } from "react";

import * as styles from "./FilterCategory.styles";

type Props = {
  readonly items: Array<{
    readonly id: string;
    readonly isChecked: boolean;
    readonly label: string;
    readonly toggle: () => void;
  }>;
  readonly title: string;
};

export const FilterCategory: FunctionComponent<Props> = ({ items, title }) =>
{
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <div css={styles.wrapper}>
      <div css={styles.categoryTitleWrapper}>
        <BodyText component="p" styleType="body-01-bold" sx={{ fontSize: 18, fontWeight: 500 }}>
          {title}
        </BodyText>
        <IconButton
          stylesOverrides={styles.expandButton}
          icon={<ArrowDown/>}
          size={"big"}
          onClick={() => setIsOpen((isOpen) => !isOpen)}>
          Close
        </IconButton>
      </div>
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
