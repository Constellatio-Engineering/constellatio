/* eslint-disable @next/next/no-img-element */
import React, { type FC } from "react";

interface TCaisyIcon 
{
  readonly description?: string;
  readonly src: string;
}

const CaisyIcon: FC<TCaisyIcon> = ({ description, src }) => 
{
  return <>{src && <img loading="lazy" src={`${src}?w=30&h=30`} alt={description ?? ""}/>}</>;
};

export default CaisyIcon;
