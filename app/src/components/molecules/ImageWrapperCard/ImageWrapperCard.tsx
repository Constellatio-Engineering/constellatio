import CaisyImg from "@/basic-components/CaisyImg";
import { FloatingButton } from "@/components/atoms/FloatingButton/FloatingButton";
import { type IGenAsset } from "@/services/graphql/__generated/sdk";
import { getFileExtensionLowercase } from "@/utils/files";

import { Box } from "@mantine/core";
import { saveAs } from "file-saver";
import React, { type FC } from "react";

import { ContainerWrapper, iconWrapperStyles, imageWrapperStyles } from "./ImageWrapperCard.styles";

export type ImageWrapperCardProps = IGenAsset;

export const ImageWrapperCard: FC<ImageWrapperCardProps> = ({ description, src, title }) =>
{
  if(!src)
  {
    return null;
  }

  const fileExtension = getFileExtensionLowercase(src);

  return (
    <>
      {src && (
        <ContainerWrapper>
          <Box sx={imageWrapperStyles()}>
            <CaisyImg src={src} description={description ?? (title || "")}/>
            <Box sx={iconWrapperStyles()}>
              <FloatingButton
                variation="icon-big"
                component="button"
                type="button"
                onClick={() => saveAs(src, `${title}.${fileExtension}` || "image.jpg")}
              />
              <FloatingButton
                variation="open-in-new-tab"
                component="a"
                href={src}
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
