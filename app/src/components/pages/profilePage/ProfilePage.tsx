import ProfileMenu, { type ITab } from "@/components/organisms/profileMenu/ProfileMenu";
import ProfileOverview from "@/components/organisms/profileOverview/ProfileOverview";
import ProfilePageHeader from "@/components/organisms/profilePageHeader/ProfilePageHeader";
import { type IProfilePageProps } from "@/pages/profile";

import { Container } from "@mantine/core";
import React, { useState, type FunctionComponent } from "react";

import * as styles from "./ProfilePage.styles";

const ProfilePage: FunctionComponent<IProfilePageProps> = ({ allMainCategory }) =>
{
  const [tabs, setTabs] = useState<ITab[]>([
    { selected: true, title: "Overview" },
    { selected: false, title: "Profile Details" },
    { selected: false, title: "Change Password" },
    { selected: false, title: "History" },
    { selected: false, title: "Notifications" },
    { selected: false, title: "Subscription" },
  ]);

  const contentPicker = (tabs: ITab[]): React.ReactNode => 
  {
    const tab = tabs.find(x => x.selected);
    console.log({ tab });
    switch (tab?.title)
    {
      case "Overview":
        return <ProfileOverview allMainCategory={allMainCategory}/>;
      case "Profile Details":
        return <>Profile Details</>;
      default:
        console.log(`Unknown tab: ${tab?.title}, create tab case in ProfilePage component`);
        return <>{`Unknown tab: ${tab?.title}, create tab case in ProfilePage component`}</>;
    }
  };

  return (
    <div css={styles.wrapper}>
      <ProfilePageHeader/>
      <Container
        maw={1440}
        sx={{
          alignItems: "flex-start", display: "flex", gap: "64px", padding: "32px 60px;" 
        }}>
        <ProfileMenu tabs={tabs} setTabs={setTabs}/>
        {contentPicker(tabs)}
      </Container>
    </div>
  );
};

export default ProfilePage;
