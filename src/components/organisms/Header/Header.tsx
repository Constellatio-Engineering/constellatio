import Image from "next/image";
import { UserDropdown } from "../../molecules/UserDropdown/UserDropdown";
import Link from "next/link";
import { FC } from "react";
import { SHeader } from "./Header.style";

type THeader = {
  variant?: "default" | "simple";
};

export const Header: FC<THeader> = ({ variant = "default" }) => {
  return variant === "simple" ? (
    <SHeader variant={variant}>
      <div>
        <Link href="/">
          <Image src={"/images/icons/constellatio-full-logo.svg"} alt="Constellatio" width={141} height={20} />
        </Link>
      </div>
    </SHeader>
  ) : (
    <SHeader variant={variant}>
      <div>
        <Link href="/">
          <Image src={"/images/icons/constellatio-full-logo.svg"} alt="Constellatio" width={141} height={20} />
        </Link>
      </div>
      <div>
        <UserDropdown />
      </div>
    </SHeader>
  );
};
