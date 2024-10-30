import { Svg } from "@/basic-components/SVG/Svg";
import MenuTab from "@/components/atoms/menuTab/MenuTab";

import { appPaths } from "@constellatio/shared/paths";
import { Group, HoverCard } from "@mantine/core";
import { IconFolder } from "@tabler/icons-react";
import Link from "next/link";
import React, { forwardRef, type ForwardRefRenderFunction } from "react";

import * as styles from "./HeaderItemPersonalSpace.styles";
import BookmarkIconSvg from "../../../../../../public/images/icons/bookmark.svg";
import FileIconSvg from "../../../../../../public/images/icons/file.svg";

export type THeaderItemPersonalSpaceProps = {
  readonly pathname: string;
};

const HeaderItemPersonalSpace: ForwardRefRenderFunction<HTMLAnchorElement, THeaderItemPersonalSpaceProps> = ({ pathname }, ref) => 
{
  return (
    <Group position="center">
      <HoverCard
        // width={"target"}
        width={200}
        shadow="sm"
        offset={2}>
        <HoverCard.Target>
          <Link href={`${appPaths.personalSpace}`} ref={ref}>
            <MenuTab
              title="Persönlicher Bereich"
              icon={<IconFolder size={20}/>}
              active={pathname?.toLowerCase().includes("personal-space")}
            />
          </Link>
        </HoverCard.Target>
        <HoverCard.Dropdown sx={{ padding: 0 }}>
          <Link href={`${appPaths.personalSpace}?category=materials`} css={styles.dropdownItem}>
            <Svg className="icon" src={FileIconSvg.src}/>
            Dateien & Docs
          </Link>
          <Link href={`${appPaths.personalSpace}?category=favorites`} css={styles.dropdownItem}>
            <Svg className="icon" src={BookmarkIconSvg.src}/>
            Favoriten
          </Link>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
};

export default forwardRef(HeaderItemPersonalSpace);
