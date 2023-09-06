/* eslint-disable @next/next/no-img-element */
import React, { type FC } from "react";

interface TCaisyImg 
{
  readonly description?: string;
  readonly src: string;
}

const CaisyImg: FC<TCaisyImg> = ({ description, src }) => 
{
  return (
    <>
      {src && (
        <img
          loading="lazy"
          src={src}
          alt={description ?? ""}
        />
      )}
    </>
  );
};

export default CaisyImg;
