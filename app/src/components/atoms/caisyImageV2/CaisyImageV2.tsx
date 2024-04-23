import type { IGenAsset } from "@/services/graphql/__generated/sdk";
import { useLightboxModalStore } from "@/stores/lightbox.store";
import { getCaisyImageBlurUrl } from "@/utils/caisy";
import { type Nullable } from "@/utils/types";

import { type SerializedStyles } from "@emotion/react";
import { type ImageProps } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React, { type ComponentProps, type FunctionComponent } from "react";

import * as styles from "./CaisyImageV2.styles";

type Props =
  Omit<ImageProps, "alt" | "src" | "width" | "height" | "id" | "title"> &
  Pick<IGenAsset, "description" | "dominantColor" | "height" | "src" | "title" | "width"> & {
    readonly alt?: Nullable<string>;
    readonly htmlTitle?: string;
    readonly id?: Nullable<string>;
    readonly nativeFallbackImageProps?: ComponentProps<"img">;
    readonly stylesOverwrite?: SerializedStyles;
    readonly withLightbox?: boolean;
  };

export const CaisyImageV2: FunctionComponent<Props> = ({
  alt: providedAlt,
  description,
  dominantColor,
  height,
  htmlTitle,
  id,
  nativeFallbackImageProps,
  onClick,
  src,
  stylesOverwrite,
  title,
  width,
  withLightbox,
  ...props
}) => 
{
  const openLightbox = useLightboxModalStore(s => s.openModal);
  const alt = providedAlt ?? description ?? title ?? "";

  if(!src)
  {
    return null;
  }

  let hoverStyles: SerializedStyles | undefined;

  if(withLightbox)
  {
    onClick = () => openLightbox({
      height: height!, // Todo: Fix exclamation mark
      url: src,
      width: width!, // Todo: Fix exclamation mark
    });

    hoverStyles = styles.withOnClick;
  }

  if(!width || !height)
  {
    console.warn("Width or height missing for CaisyImageV2 with src '" + src + "'. Rendering native img component as fallback.");

    return (
      <img // eslint-disable-line @next/next/no-img-element
        loading={"lazy"}
        {...nativeFallbackImageProps}
        src={src}
        onClick={onClick}
        alt={alt}
        css={[styles.image(), hoverStyles, stylesOverwrite]}
      />
    );
  }

  return (
    <Image
      {...props}
      id={id ?? undefined}
      title={htmlTitle ?? undefined}
      placeholder={"blur"}
      blurDataURL={getCaisyImageBlurUrl(src)}
      src={src}
      alt={alt}
      onClick={onClick}
      css={[styles.image(dominantColor), hoverStyles, stylesOverwrite]}
      width={width}
      height={height}
    />
  );
};
