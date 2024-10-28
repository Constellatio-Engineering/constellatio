import React, { type ReactNode, type FunctionComponent } from "react";

import IconButton from "../../atoms/iconButton/IconButton";

interface IIcons 
{
  readonly click?: () => void; 
  size?: "big" | "medium";
  src?: ReactNode;
  title?: string;
}

const IconButtonBar: FunctionComponent<{ readonly icons: IIcons[] }> = ({ icons }) => 
{
  return (
    <>

      {icons?.map(({
        click,
        size,
        src,
        title
      }, index) => (
        <IconButton
          key={index}
          icon={src}
          size={size ?? "big"}
          title={title}
          onClick={click}
        />
      ))}
    </>
  );
};

export default IconButtonBar;
