import React, { type ReactNode, type FunctionComponent } from "react";

import IconButton from "../../atoms/iconButton/IconButton";

interface IIcons 
{
  size?: "big" | "medium";
  src: ReactNode;
  title: string;
}

const IconButtonBar: FunctionComponent<{ readonly icons: IIcons[] }> = ({ icons }) => 
{
  const handleButtonClick = (title: string): void => 
  {
    console.log(title);
    if(typeof window !== undefined)
    {
      switch (title)
      {
        case "Bookmark":
          console.log("Bookmark");
          break;
        case "Print":
          window.print();
          break;
        case "Pin":
          console.log("Pin");
          break;
        default:
          break;
      }
    }
  };
  return (
    <>

      {icons?.map(({ size, src, title }, index) => (
        <IconButton
          key={index}
          icon={src}
          size={size ?? "big"}
          title={title}
          onClick={() => handleButtonClick(title)}
        />
      ))}
    </>
  );
};

export default IconButtonBar;
