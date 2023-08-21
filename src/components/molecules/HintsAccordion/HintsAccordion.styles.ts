import styled from "@emotion/styled";
import { AccordionStylesNames, AccordionStylesParams, MantineTheme, Styles } from "@mantine/core";

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

export const hintsAccordionStyles = ({}) => {
  const styles: Styles<AccordionStylesNames, AccordionStylesParams> = (theme: MantineTheme) => ({
    item: {
      border: `1px solid ${theme.colors["neutrals-01"][3]}`,
      borderRadius: "12px",
      backgroundColor: theme.colors["neutrals-01"][2],

      "&[data-active] .mantine-Accordion-control": {
        borderBottom: `1px solid ${theme.colors["neutrals-01"][3]}`,
        borderRadius: "12px 12px 0 0",
      },
    },
    control: {
      padding: "12px 16px",
      borderRadius: "12px",
    },
    label: {
      padding: 0,
    },
    chevron: {
      width: "24px",
      height: "24px",
      margin: 0,

      svg: {
        width: "20px !important",
        height: "20px !important",
      },
    },
    panel: {
      padding: "16px",
    },
    content: {
      padding: 0,

      ul: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      },
    },
  });

  return styles;
};
