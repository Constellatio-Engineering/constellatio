import type { IGenAsset } from "@/services/graphql/__generated/sdk";
import { useLightboxModalStore } from "@/stores/lightbox.store";
import { getCaisyImageBlurUrl } from "@/utils/caisy";

import { type SerializedStyles } from "@emotion/react";
import Image from "next/image";
import React, { type FunctionComponent } from "react";

import * as styles from "./CaisyImageV2.styles";

type Props = IGenAsset & {
  readonly stylesOverwrite?: SerializedStyles;
  readonly withLightbox?: boolean;
};

export const CaisyImageV2: FunctionComponent<Props> = ({
  description,
  dominantColor,
  height,
  src,
  stylesOverwrite,
  title,
  width,
  withLightbox
}) => 
{
  const openLightbox = useLightboxModalStore(s => s.openModal);
  const alt = description ?? title ?? "";

  if(!src)
  {
    return null;
  }

  let onClick: (() => void) | undefined;
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
        src={src}
        onClick={onClick}
        alt={alt}
        css={[styles.image(), hoverStyles, stylesOverwrite]}
        loading={"lazy"}
      />
    );
  }

  return (
    <Image
      src={src}
      onClick={onClick}
      css={[styles.image(dominantColor), hoverStyles, stylesOverwrite]}
      placeholder={"blur"}
      blurDataURL={getCaisyImageBlurUrl(src)}
      alt={alt}
      width={width}
      height={height}
    />
  );
};
