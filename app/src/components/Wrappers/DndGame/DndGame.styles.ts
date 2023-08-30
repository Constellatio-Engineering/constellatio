import styled from "@emotion/styled";
import { type MantineTheme, type Styles, type SwitchStylesNames, type SwitchStylesParams } from "@mantine/core";

export const Container = styled.div`
  max-width: 1440px;
  margin: 16px auto 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  justify-content: center;
`;

export const GameWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;

  form {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

export const OptionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const OutputWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing["spacing-8"]};
  padding: ${({ theme }) => theme.spacing["spacing-12"]};
  flex: 1 0 0;
  border-radius: ${({ theme }) => theme.radius["radius-12"]};
  border: 1px solid ${({ theme }) => theme.colors["neutrals-01"][3]};
  background-color: ${({ theme }) => theme.colors["neutrals-01"][2]};
`;

export const CardItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing["spacing-32"]};

  > span {
    min-width: 26px;
    height: 26px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors["neutrals-01"][8]};
    color: ${({ theme }) => theme.colors["neutrals-01"][0]};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors["neutrals-02"][1]};
      color: ${({ theme }) => theme.colors["neutrals-01"][3]};
    }
  }
`;

export const CardItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing["spacing-8"]};
  padding: ${({ theme }) => theme.spacing["spacing-12"]};
  justify-content: space-between;
  border-radius: ${({ theme }) => theme.radius["radius-12"]};
  border: 1px solid ${({ theme }) => theme.colors["neutrals-01"][4]};
  background-color: ${({ theme }) => theme.colors["neutrals-01"][0]};
  transition: background-color 0.3s ease;

  &:active{
    background-color: ${({ theme }) => theme.colors["neutrals-01"][1]};
  }
`;

type SwitchStyles = Styles<SwitchStylesNames, SwitchStylesParams>;

export const switchStyle = ({ checked }: { checked: boolean }): SwitchStyles =>
{
  const style: SwitchStyles = (theme: MantineTheme) => ({
    thumb: {
      alignItems: "center",
      justifyContent: "center",

      svg: {
        color: checked
          ? `${theme.colors["support-success"][2]} !important`
          : `${theme.colors["support-error"][2]} !important`,
      },
    },
    track: {
      backgroundColor: checked
        ? `${theme.colors["support-success"][3]} !important`
        : `${theme.colors["support-error"][3]} !important`,
      borderColor: checked
        ? ` ${theme.colors["support-success"][1]} !important`
        : ` ${theme.colors["support-error"][1]} !important`,
      cursor: "pointer",
    },
  });
  return style;
};
