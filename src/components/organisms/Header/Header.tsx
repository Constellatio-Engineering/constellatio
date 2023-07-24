import Image from "next/image";
import { UserDropdown } from "../../molecules/UserDropdown/UserDropdown";
import Link from "next/link";
import { FC } from "react";
import logo from "../../../../public/images/icons/constellatio-full-logo.svg";
import { SHeader } from "./Header.style";

type THeader = {
  variant?: "default" | "simple";
};

export const Header: FC<THeader> = ({ variant = "default" }) => {
  return variant === "simple" ? (
    <SHeader variant={variant}>
      <div>
        <Link href="/">
          <Image src={logo} alt="Constellatio" style={{ width: "auto", height: 20 }} />
        </Link>
      </div>
    </SHeader>
  ) : (
    <SHeader variant={variant}>
      <div>
        <Link href="/">
          <Image src={logo} alt="Constellatio" style={{ width: "auto", height: 20 }} />
        </Link>
      </div>
      <div>
        <UserDropdown />
      </div>
    </SHeader>
  );
};
