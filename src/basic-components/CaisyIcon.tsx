/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";

type TCaisyIcon = {
  src: string;
  description?: string;
};

const CaisyIcon: FC<TCaisyIcon> = ({ src, description }) => {
  return <>{src && <img loading="lazy" src={`${src}?w=30&h=30`} alt={description ?? ""} />}</>;
};

export default CaisyIcon;
