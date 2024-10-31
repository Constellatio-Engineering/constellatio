import { CaptionText } from "@/components/atoms/CaptionText/CaptionText";
import { ArrowRight } from "@/components/Icons/ArrowRight";

import { type FunctionComponent, type ReactNode } from "react";

import * as styles from "./CategoryButton.styles";

interface CategoryButtonProps
{
  readonly children: ReactNode;
}

const CategoryButton: FunctionComponent<CategoryButtonProps> = ({ children }) => 
{
  return (
    <div css={styles.wrapper}>
      <CaptionText
        styleType="caption-01-bold"
        component="p"
        color="neutrals-02.1"
        tt="uppercase">
        {children}
      </CaptionText>
      <ArrowRight size={24}/>
    </div>
  );
};

export default CategoryButton;
