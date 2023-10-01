import { DotsIcon } from "@/components/Icons/dots";
import { Edit } from "@/components/Icons/Edit";
import { MoveDownIcon } from "@/components/Icons/MoveDown";
import { Trash } from "@/components/Icons/Trash";

import { Menu, useMantineTheme } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./MenuListItem.styles";
import { BodyText } from "../BodyText/BodyText";

interface MenuListItemProps
{
  readonly active?: boolean;
  readonly icon: React.ReactNode;
  readonly onClick: () => void;
  readonly title: string;
}

const MenuListItem: FunctionComponent<MenuListItemProps & React.HTMLProps<HTMLDivElement>> = ({
  active,
  icon,
  onClick,
  title,
}) =>
{
  // TODO @Hassan <div> with onClick prop should be a button instead of a paragraph due to accessibility reasons

  const theme = useMantineTheme();
  return (
    <div onClick={onClick} css={styles.wrapper({ active, theme })}>
      <Menu width={250} position="left-start">
        <BodyText styleType="body-01-medium" component="p">
          <span className="label">{icon}{title}</span><Menu.Target><span className="dots"><DotsIcon/></span></Menu.Target>
        </BodyText>
        {/* Menu content */}
        <Menu.Dropdown>
          <Menu.Item><span className="label"><Edit/>Rename</span></Menu.Item>
          <Menu.Divider/>
          <Menu.Item><span className="label"><MoveDownIcon/>Download</span></Menu.Item>
          <Menu.Divider/>
          <Menu.Item><span className="label"><Trash/>Delete</span></Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default MenuListItem;
