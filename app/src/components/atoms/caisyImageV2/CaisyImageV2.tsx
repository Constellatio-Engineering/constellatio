import type { IGenAsset } from "@/services/graphql/__generated/sdk";
import { useLightboxModalStore } from "@/stores/lightbox.store";
import { getCaisyImageBlurUrl } from "@/utils/caisy";

import { type SerializedStyles } from "@emotion/react";
import Image from "next/image";
import React, { type FunctionComponent } from "react";

import * as styles from "./CaisyImageV2.styles";

type Props = {
  readonly caisyAsset: IGenAsset;
  readonly imageProps?: Omit<JSX.IntrinsicElements["img"], "src" | "srcSet" | "ref" | "alt" | "width" | "height" | "loading"> & {
    readonly alt?: string;
  };
  readonly stylesOverwrite?: SerializedStyles;
  readonly withLightbox?: boolean;
};

export const CaisyImageV2: FunctionComponent<Props> = ({
  caisyAsset,
  imageProps = {},
  stylesOverwrite,
  withLightbox,
}) =>
{
  const openLightbox = useLightboxModalStore(s => s.openModal);
  const alt = imageProps.alt ?? caisyAsset.description ?? caisyAsset.title ?? "keine Beschreibung vorhanden";
  const {
    dominantColor,
    height,
    src,
    width
  } = caisyAsset;

  if(!src)
  {
    return null;
  }

  let hoverStyles: SerializedStyles | undefined;

  if(withLightbox)
  {
    imageProps.onClick = () => openLightbox({
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
        {...imageProps}
        src={src}
        alt={alt}
        css={[styles.image(), hoverStyles, stylesOverwrite]}
      />
    );
  }

  return (
    <Image
      {...imageProps}
      placeholder={"blur"}
      blurDataURL={getCaisyImageBlurUrl(src)}
      src={src}
      alt={alt}
      css={[styles.image(dominantColor), hoverStyles, stylesOverwrite]}
      width={width}
      height={height}
    />
  );
};
