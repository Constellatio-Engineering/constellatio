import { Container, Flex, Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import visual from "../../../../public/images/Registration-visual.png";
import { Footer } from "../Footer/Footer";

export const RegistrationVisualHeader: FunctionComponent = () =>
{
  return (
    <Container
      bg="brand-01.5"
      sx={() => ({
        height: "100%",
        overflow: "auto",
        padding: 0,
      })}>
      <Flex
        direction="column"
        justify="space-between"
        align="center"
        mah="100%"
        maw="90%"
        sx={{ margin: "0 auto", overflow: "hidden" }}
        pt={64}>
        <Flex
          px={20}
          direction="column"
          maw="100%"
          justify="space-between"
          align="center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={visual.src}
            style={{ height: "auto", maxWidth: "100%", objectFit: "contain" }}
            alt="Registration-visual"
          />
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
