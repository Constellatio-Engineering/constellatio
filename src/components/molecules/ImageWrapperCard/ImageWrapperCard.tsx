import CaisyImg from "@/basic-components/CaisyImg";
import { DownloadIcon } from "@/components/Icons/DownloadIcon";
import { IGenImageWrapperCard } from "@/services/graphql/__generated/sdk";
import { Box } from "@mantine/core";
import React, { FC } from "react";
import { ContainerWrapper, iconWrapperStyles, imageWrapperStyles } from "./ImageWrapperCard.styles";
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { FloatingButton } from "@/components/atoms/FloatingButton/FloatingButton";

type TImageWrapperCard = IGenImageWrapperCard;

export const ImageWrapperCard: FC<TImageWrapperCard> = ({ downloadable, image, title }) => {
  return (
    <>
      {image?.src && (
        <ContainerWrapper>
          {title && <BodyText styleType="body-01-regular">{title}</BodyText>}
          <Box sx={imageWrapperStyles()}>
            <CaisyImg src={image.src} description={image.description ?? ""} />
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
