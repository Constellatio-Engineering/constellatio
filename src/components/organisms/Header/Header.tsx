import Image from "next/image";
import { UserDropdown } from "../../molecules/UserDropdown/UserDropdown";
import Link from "next/link";
import { FC } from "react";
import { SHeader } from "./Header.style";
import ConstellatioFullLogo from "../../../../public/images/icons/constellatio-full-logo.svg";

type THeader = {
  variant?: "default" | "simple";
};

export const Header: FC<THeader> = ({ variant = "default" }) => {
  return variant === "simple" ? (
    <SHeader variant={variant}>
      <div>
        <Link href="/">
          <Image src={ConstellatioFullLogo} alt="Constellatio" />
        </Link>
      </div>
    </SHeader>
  ) : (
    <SHeader variant={variant}>
      <div>
        <Link href="/">
          <Image src={ConstellatioFullLogo} alt="Constellatio" />
        </Link>
      </div>
      <div>
        <UserDropdown />
      </div>
    </SHeader>
  );
};
