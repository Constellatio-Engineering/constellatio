import React, { type ReactNode, type FunctionComponent } from "react";

import IconButton from "../../atoms/iconButton/IconButton";

//new posthog
import { usePostHog } from "posthog-js/react";

export interface IIcons {
  size?: "big" | "medium";
  src: ReactNode;
  title: string;
  readonly variant: "case" | "dictionary";
}

const IconButtonBar: FunctionComponent<{ readonly icons: IIcons[] }> = ({
  icons,
}) => {
  //new posthog feature custom event

  const posthog = usePostHog();

  const handleButtonClick = (
    title: string,
    variant: IIcons["variant"]
  ): void => {
    console.log(title);
    if (typeof window !== undefined) {
      switch (title) {
        case "Bookmark":
          console.log("Bookmark");
          break;
        case "Print":
          window.print();
          posthog.capture("print_button", {
            case: title,
            variant: variant,
          });
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
      {icons?.map(({ size, src, title, variant }, index) => (
        <IconButton
          key={index}
          icon={src}
          size={size ?? "big"}
          title={title}
          onClick={() => handleButtonClick(title, variant)}
        />
      ))}
    </>
  );
};

export default IconButtonBar;
