import { Group, Header as MantineHeader } from "@mantine/core";
import ConstellatioLogo from "../../../../public/constellatio.svg";
import Image from "next/image";
import { UserDropdown } from "@/components/molecules/UserDropdown/UserDropdown";
import Link from "next/link";

export function Header() {
  return (
    <MantineHeader height={72} px="xl">
      <Group position="apart" sx={{ height: "100%" }}>
        <div>
          <Link href="/">
            <Image src={ConstellatioLogo} alt="Constellatio" />
          </Link>
        </div>
        <div>
          <UserDropdown />
        </div>
      </Group>
    </MantineHeader>
  );
}
