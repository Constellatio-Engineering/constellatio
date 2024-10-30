import CountLabel from "@/components/atoms/countLabel/CountLabel";
import { ArrowRight } from "@/components/Icons/ArrowRight";

import { appPaths } from "@constellatio/shared/paths";
import { slugFormatter } from "@constellatio/utils/slug";
import { Title } from "@mantine/core";
import Link from "next/link";
import React, { type FunctionComponent } from "react";

import * as styles from "./ProgressCard.styles";

interface ProgressCardProps
{
  readonly completed: number;
  readonly icon: React.ReactNode;
  readonly title: string;
  readonly total: number;
}

const ProgressCard: FunctionComponent<ProgressCardProps> = ({
  completed,
  icon,
  title,
  total
}) => 
{
  return (
    <Link
      href={`${appPaths.cases}?category=${slugFormatter(title.replaceAll(" ", ""))}`}
      css={styles.wrapper}>
      {icon && <div css={styles.icon}>{icon}</div>}
      {title && <div><Title order={3}>{title}</Title></div>}
      {total != null && (
        <CountLabel count={completed} total={total} variant="cases"/>
      )}
      <p css={styles.link}>
        Zur Fallübersicht<ArrowRight/>
      </p>
    </Link>
  );
};

export default ProgressCard;
