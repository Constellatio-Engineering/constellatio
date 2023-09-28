import IconButton from "@/components/atoms/iconButton/IconButton";
import { OverlayLines } from "@/components/Icons/bg-layer";
import { Bookmark } from "@/components/Icons/Bookmark";
import { Pin } from "@/components/Icons/Pin";
import { Print } from "@/components/Icons/print";
import IconButtonBar from "@/components/organisms/iconButtonBar/IconButtonBar";

import { Container, Title, useMantineTheme } from "@mantine/core";
import Link from "next/link";
import React, { type FunctionComponent, type ReactNode } from "react";

import * as styles from "./CaseSolvingHeader.styles";
import OverviewCard, { type IOverviewCard } from "../overviewCard/OverviewCard";

interface IBreadcrumbItem 
{
  path: string;
  slug: string;
}
export interface ICaseSolvingHeaderProps 
{
  readonly overviewCard: IOverviewCard;
  readonly pathSlugs?: IBreadcrumbItem[];
  // readonly steps?: string[];
  readonly title: string;
  readonly variant: "case" | "dictionary";
}

const CaseSolvingHeader: FunctionComponent<ICaseSolvingHeaderProps> = ({
  overviewCard,
  pathSlugs,
  title,
  variant
}) => 
{
  const icons = [
    { src: <Bookmark/>, title: "Bookmark" },
    { src: <Print/>, title: "Print" },
    { src: <Pin/>, title: "Pin" },
  ];
  const theme = useMantineTheme();
  return (
    <div css={styles.wrapper({ theme, variant })}>
      <Container maw={1440}>
        <div id="overlay-lines">
          <OverlayLines/>
        </div>
        <div css={styles.body}>
          <div css={styles.bodyText}>
            <div className="icons-bar">
              <IconButtonBar icons={icons}/>
            </div>
            <div className="bread-crumb">
              {pathSlugs?.map(({ path, slug }, index) => (
                <Link key={index} href={path}>{slug}{index + 1 < pathSlugs.length ? " / " : ""}</Link>
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
      </Container>
    </div>
  );
};

export default CaseSolvingHeader;
