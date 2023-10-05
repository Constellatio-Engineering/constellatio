import ProfileMenu, { type ITab } from "@/components/profileMenu/ProfileMenu";
import ProfileOverview from "@/components/profileOverview/ProfileOverview";
import ProfilePageHeader from "@/components/profilePageHeader/ProfilePageHeader";

import { Container } from "@mantine/core";
import React, { useState, type FunctionComponent } from "react";

import * as styles from "./ProfilePage.styles";

const ProfilePage: FunctionComponent = () =>
{
  const [tabs, setTabs] = useState<ITab[]>([
    { selected: true, title: "Overview" },
    { selected: false, title: "Profile Details" },
    { selected: false, title: "Change Password" },
    { selected: false, title: "History" },
    { selected: false, title: "Notifications" },
    { selected: false, title: "Subscription" },
  ]);

  return (
    <div css={styles.wrapper}>
      <ProfilePageHeader/>
      <Container
        maw={1440}
        sx={{
          alignItems: "flex-start", display: "flex", gap: "64px", padding: "0px 60px;" 
        }}>
        <ProfileMenu tabs={tabs} setTabs={setTabs}/>
        <ProfileOverview/>
      </Container>
    </div>
  );
};

export default ProfilePage;
