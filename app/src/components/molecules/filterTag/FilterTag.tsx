import { UnstyledButton } from "@/components/molecules/unstyledButton/UnstyledButton";

import React, { type FunctionComponent } from "react";

import * as styles from "./FilterTag.style";
import { BodyText } from "../../atoms/BodyText/BodyText";
import { Cross } from "../../Icons/Cross";

interface Props
{
  readonly onClick?: () => void;
  readonly title: string;
}

const FilterTag: FunctionComponent<Props> = ({ onClick, title }) => (
  <UnstyledButton css={styles.filterTag} onClick={onClick}>
    <BodyText styleType="body-01-medium">
      {title}
      {onClick && (
        <>
          {" "}
          <Cross/>
        </>
      )}
    </BodyText>
  </UnstyledButton>
);

export default FilterTag;
