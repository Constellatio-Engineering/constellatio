import { Flex, Footer as MantineFooter, Group, Text } from "@mantine/core";
import Image from "next/image";
import ConstellatioIcon from "../../../../public/constellatio-icon.svg";

export function Footer() {
  return (
    <MantineFooter height={80} fixed={true} px="xl">
      <Group position="apart" sx={{ height: "100%" }}>
        <div></div>
        <Flex align="center">
          <Text mr="md" opacity={0.5} size="sm">
            &copy; Constellatio 2023. All Rights Reserved.
          </Text>
          <Image src={ConstellatioIcon} alt="Constellatio" />
        </Flex>
      </Group>
    </MantineFooter>
  );
}
