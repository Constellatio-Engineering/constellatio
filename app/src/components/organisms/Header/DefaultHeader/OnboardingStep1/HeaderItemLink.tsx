import MenuTab from "@/components/atoms/menuTab/MenuTab";

import Link from "next/link";
import { type ForwardRefRenderFunction, forwardRef } from "react";

export type THeaderItemLinkProps = {
  readonly link: {
    slug: string;
    title: string;
  };
  readonly pathname: string;
};

const HeaderItemLink: ForwardRefRenderFunction<HTMLAnchorElement, THeaderItemLinkProps> = ({ link, pathname }, ref) => 
{
  return (
    <Link href={`${link.slug.toLowerCase()}`} ref={ref}>
      <MenuTab
        active={pathname
          ?.toLowerCase()
          .includes(link.slug.toLowerCase())}
        title={link.title}
      />
    </Link>
  );
};

export default forwardRef(HeaderItemLink);
