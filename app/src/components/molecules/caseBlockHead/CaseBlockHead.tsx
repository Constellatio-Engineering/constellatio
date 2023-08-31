import CountLabel from "@/components/atoms/countLabel/CountLabel";

import { Title } from "@mantine/core";
import Image from "next/image";
import React, { type FunctionComponent } from "react";

import * as styles from "./CaseBlockHead.styles";

export interface ICaseBlockHeadProps 
{
  readonly cases?: number;
  readonly completedCases?: number;
  readonly icon?: { alt?: string; src: string };
  readonly title: string;
  readonly variant: "case" | "dictionary";
  
}

const CaseBlockHead: FunctionComponent<ICaseBlockHeadProps> = ({
  cases,
  completedCases,
  icon,
  title,
  variant
}) => 
{
  return (
    <div css={styles.wrapper}>
      {icon && <Image alt={icon?.alt ?? ""} css={styles.icon} src={icon.src}/>}
      {title && <Title order={1}>{title}</Title>}
      <div className="details">
        {
          variant === "case" && (
            <>
              {cases && <></>}
            </>
          )
        }
      </div>
    </div>
  );
};

export default CaseBlockHead;

{ /* <CountLabel count={completedCases} total={cases} variant="cases"/> */ }
