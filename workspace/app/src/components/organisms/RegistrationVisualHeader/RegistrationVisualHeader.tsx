import { Container, Flex, Title } from "@mantine/core";
import Image from "next/image";
import { type FunctionComponent } from "react";

import * as styles from "./RegistrationVisualHeader.style";
import visual from "../../../../public/images/Registration-visual.svg";
import { Footer } from "../Footer/Footer";

export const RegistrationVisualHeader: FunctionComponent = () =>
{
  return (
    <Container
      bg="brand-01.5"
      css={styles.wrapper}
      sx={() => ({
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        overflow: "auto",
        padding: 0,
      })}>
      <Flex
        direction="column"
        justify="space-between"
        align="center"
        sx={{ 
          alignItems: "center", display: "flex", height: "100%", justifyContent: "center", margin: "0 auto", maxWidth: "100%", overflow: "hidden", padding: 0,
        }}>
        <Flex
          px={20}
          direction="column"
          justify="center"
          align="center">
          <Image
            src={visual}
            priority
            style={{ height: "auto", maxWidth: 460, width: "90%" }}
            alt="Registration-visual"
          />
          <Title
            mt={32}
            align="center"
            order={3}
            c="neutrals-01.0"
            w="96%">
            Mit Constellatio endlich auf das Wesentliche konzentrieren
          </Title>
        </Flex>
      </Flex>
      <Footer variant="simpleColoredBg"/>
    </Container>
  );
};
