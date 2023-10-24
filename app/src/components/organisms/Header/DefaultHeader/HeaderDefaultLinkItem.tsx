import MenuTab from "@/components/atoms/menuTab/MenuTab";

import Link from "next/link";
import { type FunctionComponent } from "react";

type HeaderDefaultLinkItemProps = {
  readonly link: {
    slug: string;
    title: string;
  };
  readonly pathname: string;
};

const HeaderDefaultLinkItem: FunctionComponent<HeaderDefaultLinkItemProps> = ({ link, pathname }) => 
{
  return (
    <Link href={`/${link.slug.toLowerCase()}`}>
      <MenuTab
        active={pathname
          ?.toLowerCase()
          .includes(link.slug.toLowerCase())}
        title={link.title}
      />
    </Link>
  );
};

export default HeaderDefaultLinkItem;
