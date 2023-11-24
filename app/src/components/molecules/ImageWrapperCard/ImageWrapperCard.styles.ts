import { spacing } from "@/constants/styles/spacing";
import { type MantineCssObjectStyles } from "@/utils/types";

import styled from "@emotion/styled";

export const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing["spacing-24"]};
`;

type ImageWrapperStyles = MantineCssObjectStyles;

export const imageWrapperStyles = (): ImageWrapperStyles =>
{
  const styles: ImageWrapperStyles = theme => ({
    alignItems: "flex-start",
    backgroundColor: theme.colors["neutrals-01"][0],
    border: `1px solid ${theme.colors["neutrals-01"][3]}`,
    borderRadius: theme.radius["radius-12"],
    display: "flex",
    gap: theme.spacing["spacing-8"],
    img: {
      width: "100%",
    },
    padding: theme.spacing["spacing-8"],

    position: "relative",
  });

  return styles;
};

type IconWrapperStyles = MantineCssObjectStyles;

export const iconWrapperStyles = (): IconWrapperStyles =>
{
  const styles: IconWrapperStyles = () => ({
    alignItems: "center",
    bottom: "20px",
    display: "flex",
    gap: "6px",
    position: "absolute",
    right: "20px",
  });

  return styles;
};
