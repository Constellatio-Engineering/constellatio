import { spacing } from "@/constants/styles/spacing";

import styled from "@emotion/styled";
import { type CSSObject, type MantineTheme } from "@mantine/core";

export const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing["spacing-24"]};
`;

export const imageWrapperStyles = () => 
{
  const styles = (theme: MantineTheme): CSSObject => ({
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

export const iconWrapperStyles = () => 
{
  const styles = (theme: MantineTheme): CSSObject => ({
    bottom: "20px",
    position: "absolute",
    right: "20px",
  });

  return styles;
};
