import { Container, Flex, Title } from "@mantine/core";
import Image from "next/image";
import React from "react";
import { Footer } from "../Footer/Footer";

export const RegistrationVisualHeader = () => {
  return (
    <Container
      pt={132}
      bg={"brand-01.5"}
      h={1080}
      sx={() => ({
        padding: 0,
      })}
    >
      <Flex direction={"column"} justify={"space-between"} align={"center"} h={"100%"}>
        <Flex h={671} px={20} direction={"column"} justify={"space-between"} align={"center"}>
          <Image src="/images/Registration-visual.png" width={536} height={525} alt="Registration-visual" />
          <Title align="center" order={3} c={"neutrals-01.0"} w={"65%"}>
            Making learning process easy and fun
          </Title>
        </Flex>
        <Footer variant="simpleColoredBg" />
      </Flex>
    </Container>
  );
};
