import useSearchBarStore from "@/stores/searchBar.store";

import { type LinkProps } from "next/dist/client/link";
import Link from "next/link";
import { type FunctionComponent } from "react";

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & LinkProps & {
  readonly children?: React.ReactNode;
} & React.RefAttributes<HTMLAnchorElement>;

export const SearchOverlayLink: FunctionComponent<Props> = ({
  children,
  onClick,
  ...props
}) =>
{
  const closeDrawer = useSearchBarStore((s) => s.closeDrawer);
  
  return (
    <Link
      {...props}
      onClick={(e) =>
      {
        if(onClick)
        {
          onClick(e);
        }

        closeDrawer();
      }}>
      {children}
    </Link>
  );
};
