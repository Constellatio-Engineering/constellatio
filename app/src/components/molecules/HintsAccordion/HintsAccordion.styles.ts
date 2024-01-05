import styled from "@emotion/styled";
import { type AccordionStylesNames, type AccordionStylesParams, type MantineTheme, type Styles } from "@mantine/core";

export const ItemWrapper = styled.li<{ index: number }>`
  > p {
    display: flex;
    align-items: center;
    gap: 8px;

    &::before {
      content: "${({ index }) => index}";
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 1px solid ${({ theme }) => theme.colors["neutrals-02"][1]};
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 700;
      line-height: 20px;
      text-transform: uppercase;
      text-align: center;
    }
  }
`;

type HintsAccordionStyles = Styles<AccordionStylesNames, AccordionStylesParams>;

export const hintsAccordionStyles = (): HintsAccordionStyles =>
{
  const styles: HintsAccordionStyles = (theme: MantineTheme) => ({
    chevron: {
      height: "24px",
      margin: 0,
      svg: {
        height: "24px !important",
        width: "24px !important",
      },
      width: "24px",
    },
    content: {
      padding: 0,
      ul: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      },
    },
    control: {
      borderRadius: "12px",
      padding: "12px 16px",
    },
    item: {
      "&[data-active] .mantine-Accordion-control": {
        borderBottom: `1px solid ${theme.colors["neutrals-01"][3]}`,
        borderRadius: "12px 12px 0 0",
      },
      backgroundColor: theme.colors["neutrals-01"][2],
      border: `1px solid ${"#5b74c7"}`,
      borderRadius: "12px",
    },
    label: {
      padding: 0,
    },
    panel: {
      padding: "16px",
    },
  });

  return styles;
};
