import { type Sx } from "@mantine/styles";

import { type TLink } from "./CustomLink";

export const customLinkStyles = ({ stylesOverwrite, styleType }: TLink) => 
{
  const styles: Sx = (theme) => ({
    ":disabled": {
      color: colooors["neutrals-01"][7],
    },
    ":hover": {
      color: colooors["neutrals-02"][1],
      textDecoration: "underline",
    },
    color:
      styleType === "link-primary"
        ? colooors["neutrals-02"][2]
        : styleType === "link-primary-ts"
          ? colooors["transparency-01"][4]
          : styleType === "link-secondary"
            ? colooors["neutrals-01"][8]
            : colooors["neutrals-02"][1],
    fontFamily:
      styleType === "link-content" || styleType === "link-content-title"
        ? `${theme.headings.fontFamily}, serif}`
        : `${theme.fontFamily}, sans-serif`,
    fontSize:
      styleType === "link-secondary"
        ? theme.fontSizes["spacing-14"]
        : styleType === "link-content-title"
          ? theme.fontSizes["spacing-18"]
          : theme.fontSizes["spacing-16"],
    fontWeight:
      styleType === "link-content" || styleType === "link-content-title"
        ? 400
        : 500,
    lineHeight:
      styleType === "link-content-title"
        ? theme.spacing["spacing-28"]
        : styleType === "link-secondary"
          ? theme.spacing["spacing-20"]
          : theme.spacing["spacing-24"],
    textDecoration:
      styleType === "link-content" || styleType === "link-content-title"
        ? "none"
        : "underline",
    transition: "color 0.3s ease",
    ...stylesOverwrite,
  });

  return styles;
};
