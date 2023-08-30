import React, { FunctionComponent, ReactNode } from "react";

import * as styles from "./CaseSolvingHeader.styles";
import bgOverlayCase from "../../Icons/bg-layer-case.png";
import bgOverlayDictionary from "../../Icons/bg-layer-dictionary.png";
import OverviewCard from "../overviewCard/OverviewCard";
import IconButton from "@/components/atoms/iconButton/IconButton";
import { Bookmark } from "@/components/Icons/bookmark";
import { Print } from "@/components/Icons/print";
import { Pin } from "@/components/Icons/Pin";
import Link from "next/link";
import { Title } from "@mantine/core";

export interface ICaseSolvingHeaderProps {
  title: string;
  variant: "case" | "dictionary";
  pathSlugs?: string[];
}
interface IIcons {
  src: ReactNode;
  size: "big" | "medium";
  title: string;
}

const CaseSolvingHeader: FunctionComponent<ICaseSolvingHeaderProps> = ({
  title, variant, pathSlugs
}) => {
  // add title to each icon object in the array with keeping size:"big" and src
  const icons: IIcons[] = [
    { src: <Bookmark />, size: "big", title: "Bookmark" },
    { src: <Print />, size: "big", title: "Print" },
    { src: <Pin />, size: "big", title: "Pin" },
  ];
  return (
    <div css={styles.wrapper}>
      <div id="bg-overlay">
        <img src={variant === "case" ? bgOverlayCase.src : bgOverlayDictionary.src} alt="bg with lines" width={100} height={100} />
      </div>
      <div css={styles.body}>
        <div css={styles.bodyText}>
          <div className="icons-bar">
            {icons?.map(({ src, size, title }, index) => (
              <IconButton key={index} icon={src} size={size} title={title} />
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
            lastUpdated={new Date()}
            legalArea={""}
            tags={[]}
            topic={""}
            variant={variant}
            views={0}
            timeInMinutes={0}
          />
        </div>
      </div>
    </div>
  );
};

export default CaseSolvingHeader;
