import { CaisyImageV2 } from "@/components/atoms/caisyImageV2/CaisyImageV2";
import { FloatingButton } from "@/components/atoms/FloatingButton/FloatingButton";

import { type IGenAsset } from "@constellatio/cms/generated-types";
import { getFileExtensionLowercase } from "@constellatio/utils/files";
import { saveAs } from "file-saver";
import React, { type FC } from "react";

import * as styles from "./ImageWrapperCard.styles";

export type ImageWrapperCardProps = IGenAsset;

export const ImageWrapperCard: FC<ImageWrapperCardProps> = (imageProps) =>
{
  const { src, title } = imageProps;

  if(!src)
  {
    return null;
  }

  const fileExtension = getFileExtensionLowercase(src);

  return (
    <div css={styles.wrapper}>
      <div css={styles.imageWrapper}>
        <CaisyImageV2
          withLightbox={true}
          caisyAsset={imageProps}
        />
        <div css={styles.iconWrapper}>
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
        </div>
      </div>
    </div>
  );
};
