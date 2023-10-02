import CaisyImg from "@/basic-components/CaisyImg";
import { FloatingButton } from "@/components/atoms/FloatingButton/FloatingButton";
import { type IGenImageWrapperCard } from "@/services/graphql/__generated/sdk";

import { Box } from "@mantine/core";
import React, { type FC } from "react";

import { ContainerWrapper, iconWrapperStyles, imageWrapperStyles } from "./ImageWrapperCard.styles";

export type ImageWrapperCardProps = IGenImageWrapperCard;

export const ImageWrapperCard: FC<ImageWrapperCardProps> = ({ downloadable, image }) =>
{
  return (
    <>
      {image?.src && (
        <ContainerWrapper>
          <Box sx={imageWrapperStyles()}>
            <CaisyImg src={image.src} description={image.description ?? ""}/>
            {downloadable && (
              <Box sx={iconWrapperStyles()}>
                <FloatingButton
                  variation="icon-big"
                  component="a"
                  href={image?.src}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </Box>
            )}
          </Box>
        </ContainerWrapper>
      )}
    </>
  );
};
