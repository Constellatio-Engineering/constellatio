import CaisyImg from "@/basic-components/CaisyImg";
import { FloatingButton } from "@/components/atoms/FloatingButton/FloatingButton";
import { type IGenAsset } from "@/services/graphql/__generated/sdk";
import { getCaisyImageBlurUrl } from "@/utils/caisy";
import { getFileExtensionLowercase } from "@/utils/files";

import { saveAs } from "file-saver";
import Image from "next/image";
import React, { type FC } from "react";

import * as styles from "./ImageWrapperCard.styles";

export type ImageWrapperCardProps = IGenAsset;

export const ImageWrapperCard: FC<ImageWrapperCardProps> = ({
  blurHash,
  description,
  dominantColor,
  height,
  src,
  title,
  width
}) =>
{
  if(!src)
  {
    return null;
  }

  if(!width)
  {
    return <p>Width missung</p>;
  }

  if(!height)
  {
    return <p>Height missing</p>;
  }

  if(!blurHash)
  {
    return <p>Blurhash missing</p>;
  }

  const fileExtension = getFileExtensionLowercase(src);
  const imageUrl = new URL(src);
  const searchParams = new URLSearchParams(imageUrl.search);
  searchParams.set("w", "32");

  return (
    <div css={styles.wrapper}>
      <img
        src={getCaisyImageBlurUrl(src)}
        width={"100%"}
        height={"auto"}
      />
      <div css={styles.imageWrapper}>
        <Image
          src={src}
          css={styles.image(dominantColor ?? "#fafafa")}
          placeholder={"blur"}
          blurDataURL={getCaisyImageBlurUrl(src)}
          alt={description ?? title ?? ""}
          width={width}
          height={height}
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
