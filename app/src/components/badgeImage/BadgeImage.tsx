/* eslint-disable @next/next/no-img-element */
import React, { type ComponentProps, type FunctionComponent } from "react";

interface BadgeImageProps extends Omit<ComponentProps<"img">, "src">
{
  readonly filename: string;
}

const BadgeImage: FunctionComponent<BadgeImageProps> = ({
  alt = "badge symbol",
  filename,
  ...props
}) =>
{
  return (
    <img
      {...props}
      src={`/images/badges/${filename}`}
      alt={alt}
    />
  );
};

export default BadgeImage;
