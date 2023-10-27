
import CountLabel from "@/components/atoms/countLabel/CountLabel";
import { ArrowRight } from "@/components/Icons/ArrowRight";
import { paths } from "@/utils/paths";

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
    <div css={styles.wrapper}>
      {icon && <div css={styles.icon}>{icon}</div>}
      {title && <div css={{}}><Title order={3}>{title}</Title></div>}
      {total != null && (
        <div css={{}}>
          <CountLabel count={completed} total={total} variant="cases"/>
        </div>
      )}
      <Link href={`${paths.cases}`} css={styles.link}>Complete more cases <ArrowRight/></Link>
    </div>
  );
};

export default ProgressCard;
