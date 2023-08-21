import { Container, Flex, Title } from "@mantine/core";
import Image from "next/image";
import React from "react";

import visual from "../../../../public/images/Registration-visual.png";
import { Footer } from "../Footer/Footer";

export const RegistrationVisualHeader = () => 
{
  return (
    <Container
      bg="brand-01.5"
      sx={() => ({
        height: "100%",
        overflow: "scroll",
        padding: 0,
      })}>
      <Flex
        direction="column"
        justify="space-between"
        align="center"
        h="100%"
        pt={64}>
        <Flex
          px={20}
          direction="column"
          justify="space-between"
          align="center">
          <Image src={visual} style={{ height: "auto", maxWidth: 550 }} alt="Registration-visual"/>
          <Title
            mt={32}
            align="center"
            order={3}
            c="neutrals-01.0"
            w="65%">
            Making learning process easy and fun
          </Title>
        </Flex>
        <Footer variant="simpleColoredBg"/>
      </Flex>
    </Container>
  );
};
