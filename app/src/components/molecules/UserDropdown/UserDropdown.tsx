import { BodyText } from "@/components/atoms/BodyText/BodyText";
import ProfilePicture from "@/components/molecules/profilePicture/ProfilePicture";
import HeaderDefaultRecreateSearch from "@/components/organisms/Header/DefaultHeader/HeaderDefaultRecreateSearch";
import { useSignout } from "@/hooks/useSignout";
import useUserDetails from "@/hooks/useUserDetails";
import { isDevelopment } from "@/utils/env";
import { appPaths } from "@/utils/paths";

import { Menu, Title } from "@mantine/core";
import { IconLogout, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import React, { type FunctionComponent } from "react";

import * as styles from "./UserDropdown.styles";

export const UserDropdown: FunctionComponent = () =>
{
  const { handleSignOut } = useSignout();
  const { userDetails } = useUserDetails();

  if(!userDetails)
  {
    return (
      <div css={styles.placeholder}/>
    );
  }

  const {
    displayName,
    firstName,
    lastName,
    roles
  } = userDetails;

  const rolesJoined = roles.length > 0 && roles.map(r => r.name).join(", ");

  return (
    <Menu
      width={320}
      position="bottom-end"
      radius={12}
      transitionProps={{ transition: "pop-top-right" }}
      styles={styles.menuStyles()}>
      <Menu.Target>
        <div css={styles.target}>
          <ProfilePicture sizeInPx={30}/>
        </div>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          component={Link}
          href={appPaths.profile}
          css={styles.menuItem}
          icon={null}>
          <div className="user-info">
            <ProfilePicture sizeInPx={60} disableMarginAuto={true}/>
            <div>
              <Title order={4}>{`${firstName} ${lastName}`}</Title>
              <BodyText styleType="body-02-medium" component="p">@{displayName}</BodyText>
              {rolesJoined && (
                <BodyText styleType="body-02-medium" component="p">{rolesJoined}</BodyText>
              )}
            </div>
          </div>
        </Menu.Item>
        {isDevelopment && (
          <HeaderDefaultRecreateSearch/>
        )}
        <Menu.Item
          sx={{ fontSize: 15 }}
          component={Link}
          href={appPaths.profile}
          icon={<IconUser size="1rem" stroke={1.5}/>}>
          Profil
        </Menu.Item>
        <Menu.Item
          sx={{ fontSize: 15 }}
          onClick={handleSignOut}
          icon={<IconLogout size="1rem" stroke={1.5}/>}>
          Ausloggen
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
