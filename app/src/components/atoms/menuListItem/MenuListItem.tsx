import React, { type FunctionComponent} from "react";

import * as styles from "./MenuListItem.styles";
import { BodyText } from "../BodyText/BodyText";
import { DotsIcon } from "@/components/Icons/dots";
import { Menu, useMantineTheme } from "@mantine/core";
import { MoveDownIcon } from "@/components/Icons/MoveDown";
import { Trash } from "@/components/Icons/Trash";
import { Edit } from "@/components/Icons/Edit";

interface MenuListItemProps
{
  readonly title: string;
  readonly icon: React.ReactNode;
  readonly active?: boolean;

}

const MenuListItem: FunctionComponent<MenuListItemProps & React.HTMLProps<HTMLDivElement>> = ({ title, icon, active, ...props }) => {
  const theme = useMantineTheme();
  return (
    <div {...props} css={styles.wrapper({theme,active})} >
      <Menu width={250} position="left-start">
      <BodyText styleType="body-01-medium" component="p">
        <span className="label">{icon}{title}</span>{<Menu.Target><span className="dots"><DotsIcon/></span></Menu.Target>}
      </BodyText>
      {/* Menu content */}
      <Menu.Dropdown>
        <Menu.Item><span className="label"><Edit/>Rename</span></Menu.Item>
           <Menu.Divider />
        <Menu.Item><span className="label"><MoveDownIcon/>Download</span></Menu.Item>
        <Menu.Divider />
        <Menu.Item><span className="label"><Trash/>Delete</span></Menu.Item>
      </Menu.Dropdown>
    </Menu>
    </div>
  );
};

export default MenuListItem;
