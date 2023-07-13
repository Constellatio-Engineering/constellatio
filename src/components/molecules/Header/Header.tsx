import { Group } from "@mantine/core";
import ConstellatioLogo from "../../../../public/constellatio-full-logo.svg";
import Image from "next/image";
import { UserDropdown } from "../UserDropdown/UserDropdown";
import Link from "next/link";
import { FC } from "react";
import { SHeader } from "./Header.style";

type THeader = {
  variant: "default" | "simple";
};

export const Header: FC<THeader> = ({ variant = "default" }) => {
  return variant === "simple" ? (
    <SHeader variant={variant}>
      <div>
        <Link href="/">
          <Image src={ConstellatioLogo} alt="Constellatio" />
        </Link>
      </div>
    </SHeader>
  ) : (
    <SHeader variant={variant}>
      <div>
        <Link href="/">
          <Image src={ConstellatioLogo} alt="Constellatio" />
        </Link>
      </div>
      <div>
        <UserDropdown />
      </div>
    </SHeader>
  );
};
