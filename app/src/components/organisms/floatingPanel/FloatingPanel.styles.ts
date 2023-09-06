import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

const CSSHiddenCard = css`
height: 317px;
overflow: hidden;
`;

export const wrapper = ({ hidden, theme }: {hidden?: boolean; theme: MantineTheme}) => css`
  position:relative;
  width: 422px;
  /* padding:20px 16px 0 16px; */
  background-color: ${theme.colors["neutrals-01"][0]};
  border-radius: 12px;
  /* margin: 50px 50px 50px auto; */
  padding-top: 20px;
  .switcher {
    margin: 0px 24px 8px 24px;
  }
  overflow:auto;
  
  ${hidden && CSSHiddenCard}
  &::-webkit-scrollbar{
    width: 8px;
    background-color: white;
    &-thumb{
      background-color:${theme.colors["neutrals-01"][4]};
      border-radius:4px;
      margin:0 5px;
    }
  }
  .hidden-overlay{
    position: absolute;
    bottom: 0;
    height:auto;
    /* background-color: ${theme.colors["neutrals-01"][0]}; */
    width: 100%;
    /* background: linear-gradient(180deg, rgba(255,255,255,0) 63%, red 97%); */
    background: white;
    /* background: linear-gradient(180deg, rgba(255,255,255,0) 0%, ${theme.colors["neutrals-01"][0]} 40%); */
   
    /* outline: 1px solid grey; */
    color: ${theme.colors["neutrals-01"][7]};
    svg{
      display: inline-block;
    }
   
      div{    display:flex;
    align-items: flex-end;
    justify-content: center;
gap:12px;
    padding:  20px;
        background-color: transparent;
        border-top: 2px solid ${theme.colors["neutrals-01"][4]};
        position: relative;
        &::before{
          content: "";
          position: absolute;
          top: -111%;
          left: 0;
          width: 100%;
          height: 110%;
          background: linear-gradient(180deg, rgba(255,255,255,0) 43%, white 97%);
          /* background: linear-gradient(180deg, rgba(255,255,255,0) 63%, ${theme.colors["neutrals-01"][0]} 97%); */

        }
      }
    
  }
`;

export const item = ({
  isExpandable,
  isExpanded,
  isTopLevel,
  theme
}: {
  isExpandable?: boolean;
  isExpanded?: boolean;
  isTopLevel?: boolean;
  theme: MantineTheme;
}) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${isTopLevel && isExpanded
    ? theme?.colors["neutrals-02"][1]
    : theme?.colors?.["neutrals-01"]?.[9]};
    a{
      color: ${isTopLevel && isExpanded
    ? theme?.colors["neutrals-02"][1]
    : theme?.colors?.["neutrals-01"]?.[9]};
    }
  background: ${isTopLevel && isExpandable && isExpanded
    ? theme?.colors["neutrals-01"][2]
    : theme?.colors?.["neutrals-01"]?.[0]};
  border-bottom: 1px solid ${theme.colors["neutrals-01"][4]};
  border-left: 3px solid ${isTopLevel && isExpandable && isExpanded ? theme.colors["neutrals-02"][1] : "transparent"};
  &:hover {
    background: ${theme.colors["neutrals-01"][1]};
}
padding: 12px 0 12px 0;
p{
    display: flex;
  align-items: center;
    justify-content: center;
    padding-left: 5px;
}
position: relative;
svg{
  position: absolute;
  left: 3px;
}
`;

export const facts = (theme: MantineTheme) => css`
padding:8px 24px 0 24px;
`;
