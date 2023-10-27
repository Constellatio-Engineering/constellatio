/* eslint-disable @next/next/no-img-element */
import React, { type FC } from "react";

interface TCaisyImg extends React.ImgHTMLAttributes<HTMLImageElement>
{
  readonly description?: string;
  readonly src: string;
}

const CaisyImg: FC<TCaisyImg> = ({
  description,
  src,
  ...props
}) => 
{
  return (
    <>
      {src && (
        <img
          {...props}
          loading="lazy"
          src={src}
          alt={description ?? ""}
        />
      )}
    </>
  );
};

export default CaisyImg;
