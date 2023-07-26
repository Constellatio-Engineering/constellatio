import { spacing } from "@/constants/styles/spacing";
import styled from "@emotion/styled";
import { CSSObject, MantineTheme } from "@mantine/core";

export const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing["spacing-24"]};
`;

export const imageWrapperStyles = () => {
  const styles = (theme: MantineTheme): CSSObject => ({
    position: "relative",
    display: "flex",
    alignItems: "flex-start",
    gap: theme.spacing["spacing-8"],
    padding: theme.spacing["spacing-8"],
    borderRadius: theme.radius["radius-8"],
    border: `1px solid ${theme.colors["neutrals-01"][3]}`,
    backgroundColor: theme.colors["neutrals-01"][0],

    img: {
      width: "100%",
    },
  });

  return styles;
};

export const iconWrapperStyles = () => {
  const styles = (theme: MantineTheme): CSSObject => ({
    position: "absolute",
    bottom: "20px",
    right: "20px",
  });

  return styles;
};
