import CaisyImg from "@/basic-components/CaisyImg";
import { FloatingButton } from "@/components/atoms/FloatingButton/FloatingButton";
import { type IGenAsset } from "@/services/graphql/__generated/sdk";

import { Box } from "@mantine/core";
import React, { type FC } from "react";

import { ContainerWrapper, iconWrapperStyles, imageWrapperStyles } from "./ImageWrapperCard.styles";

export type ImageWrapperCardProps = IGenAsset;

export const ImageWrapperCard: FC<ImageWrapperCardProps> = ({ description, src, title }) =>
{
  return (
    <>
      {src && (
        <ContainerWrapper>
          <Box sx={imageWrapperStyles()}>
            <CaisyImg src={src} description={description ?? (title || "")}/>
            <Box sx={iconWrapperStyles()}>
              <FloatingButton
                variation="icon-big"
                component="a"
                href={src}
                download
                target="_blank"
                rel="noopener noreferrer"
              />
            </Box>
          </Box>
        </ContainerWrapper>
      )}
    </>
  );
};
