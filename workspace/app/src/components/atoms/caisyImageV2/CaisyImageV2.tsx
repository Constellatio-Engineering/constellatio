import { useLightboxModalStore } from "@/stores/lightbox.store";

import { type IGenAsset } from "@constellatio/cms/generated-types";
import { getCaisyImageBlurUrl } from "@constellatio/cms/utils/caisy";
import { type SerializedStyles } from "@emotion/react";
import Image from "next/image";
import { type FunctionComponent } from "react";

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
      alt,
      height,
      url: src,
      width,
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
      placeholder={"empty"}
      src={src}
      alt={alt}
      css={[styles.image(dominantColor), hoverStyles, stylesOverwrite]}
      style={{
        backgroundImage: `url(${getCaisyImageBlurUrl(src)})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}
      width={width}
      height={height}
    />
  );
};
