import React, { type ReactNode, type FunctionComponent } from "react";

import IconButton from "../../atoms/iconButton/IconButton";

interface IIcons 
{
  size?: "big" | "medium";
  src: ReactNode;
  title: string;
}

const IconButtonBar: FunctionComponent<{ readonly icons: IIcons[] }> = ({ icons }) => (
  <>

    {icons?.map(({ size, src, title }, index) => (
      <IconButton
        key={index}
        icon={src}
        size={size ?? "big"}
        title={title}
      />
    ))}
  </>
);

export default IconButtonBar;
