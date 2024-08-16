import MenuTab from "@/components/atoms/menuTab/MenuTab";
import { appPaths } from "@/utils/paths";

import { IconFolder } from "@tabler/icons-react";
import Link from "next/link";
import React, { forwardRef, type ForwardRefRenderFunction } from "react";

export type THeaderItemPersonalSpaceProps = {
  readonly pathname: string;
};

const HeaderItemPersonalSpace: ForwardRefRenderFunction<HTMLAnchorElement, THeaderItemPersonalSpaceProps> = ({ pathname }, ref) => 
{
  return (
    <Link href={`${appPaths.personalSpace}`} ref={ref}>
      <MenuTab
        title="Persönlicher Bereich"
        icon={<IconFolder size={20}/>}
        active={pathname?.toLowerCase().includes("personal-space")}
      />
    </Link>
  );
};

export default forwardRef(HeaderItemPersonalSpace);
