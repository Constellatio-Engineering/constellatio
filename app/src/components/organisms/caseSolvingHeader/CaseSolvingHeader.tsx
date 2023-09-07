import IconButton from "@/components/atoms/iconButton/IconButton";
import { OverlayLines } from "@/components/Icons/bg-layer";
import { Bookmark } from "@/components/Icons/Bookmark";
import { Pin } from "@/components/Icons/Pin";
import { Print } from "@/components/Icons/print";

import { Title, useMantineTheme } from "@mantine/core";
import Link from "next/link";
import React, { type FunctionComponent, type ReactNode } from "react";

import * as styles from "./CaseSolvingHeader.styles";
import OverviewCard, { type IOverviewCard } from "../overviewCard/OverviewCard";
export interface ICaseSolvingHeaderProps 
{
  readonly overviewCard: IOverviewCard;
  readonly pathSlugs?: string[];
  // readonly steps?: string[];
  readonly title: string;
  readonly variant: "case" | "dictionary";
}
interface IIcons 
{
  size: "big" | "medium";
  src: ReactNode;
  title: string;
}

const CaseSolvingHeader: FunctionComponent<ICaseSolvingHeaderProps> = ({
  overviewCard,
  pathSlugs,
  title,
  variant
}) => 
{
  const icons: IIcons[] = [
    { size: "big", src: <Bookmark/>, title: "Bookmark" },
    { size: "big", src: <Print/>, title: "Print" },
    { size: "big", src: <Pin/>, title: "Pin" },
  ];
  const theme = useMantineTheme();
  return (
    <div css={styles.wrapper({ theme, variant })}>
      <div id="overlay-lines">
        <OverlayLines/>
      </div>
      <div css={styles.body}>
        <div css={styles.bodyText}>
          <div className="icons-bar">
            {icons?.map(({ size, src, title }, index) => (
              <IconButton
                key={index}
                icon={src}
                size={size}
                title={title}
              />
            ))}
          </div>
          <div className="bread-crumb">
            {pathSlugs?.map((slug, index) => (
              <Link key={index} href={`/${slug}`}>{slug}{index + 1 < pathSlugs.length ? " / " : ""}</Link>
            ))}
          </div>
          <div className="headline">
            <Title order={1}>{title}</Title>
          </div>
        </div>
        <div css={styles.bodyCard}>
          <OverviewCard
            {...overviewCard}
          />
        </div>

      </div>
    </div>
  );
};

export default CaseSolvingHeader;
