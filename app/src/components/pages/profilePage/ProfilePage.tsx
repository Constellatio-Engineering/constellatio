import ChangePasswordTab from "@/components/organisms/changePasswordTab/ChangePasswordTab";
import ProfileDetailsTab from "@/components/organisms/profileDetailsTab/ProfileDetailsTab";
import ProfileMenu, { type ITab } from "@/components/organisms/profileMenu/ProfileMenu";
import ProfileNotificationsTab from "@/components/organisms/profileNotificationsTab/ProfileNotificationsTab";
import ProfileOverview from "@/components/organisms/profileOverview/ProfileOverview";
import ProfilePageHeader from "@/components/organisms/profilePageHeader/ProfilePageHeader";
import ProfileHistoryTab from "@/components/profileHistoryTab/ProfileHistoryTab";
import { type IProfilePageProps } from "@/pages/profile";

import { Container } from "@mantine/core";
import { useRouter } from "next/router";
import React, { useState, type FunctionComponent } from "react";

import * as styles from "./ProfilePage.styles";

const ProfilePage: FunctionComponent<IProfilePageProps> = ({ allMainCategory }) =>
{
  const [tabs, setTabs] = useState<ITab[]>([
    { selected: true, slug: "overview", title: "Overview" },
    { selected: false, slug: "profile-details", title: "Profile Details" },
    { selected: false, slug: "change-password", title: "Change Password" },
    { selected: false, slug: "history", title: "History" },
    { selected: false, slug: "notifications", title: "Notifications" },
    // { selected: false, slug: "subscription", title: "Subscription" },
  ]);

  const contentPicker = (tabs: ITab[]): React.ReactNode => 
  {
    const tab = tabs?.find(x => x.selected);
    switch (tab?.title)
    {
      case "Overview":
        return <ProfileOverview allMainCategory={allMainCategory}/>;
      case "Profile Details":
        return <ProfileDetailsTab/>;
      case "Change Password":
        return <ChangePasswordTab/>;
      case "Notifications":
        return <ProfileNotificationsTab/>;  
      case "History":
        return <ProfileHistoryTab/>;
      default:
        console.log(`Unknown tab: ${tab?.title}, create tab type case in ProfilePage component`);
        return <>{`Unknown tab: ${tab?.title}, create tab type case in ProfilePage component`}</>;
    }
  };

  const router = useRouter();
  React.useEffect(() => 
  {
    if(router.query.q)
    {
      setTabs(tabs.map((x: ITab) => x.slug === router.query.q ? ({ ...x, selected: true }) : ({ ...x, selected: false })));
    }
  // DO NOT ADD {tabs} TO THE DEPENDENCY ARRAY, it causes infinite loop
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.q]);

  return (
    <div css={styles.wrapper}>
      <ProfilePageHeader/>
      <Container
        maw={1440}
        sx={{
          alignItems: "flex-start", display: "flex", flexDirection: "row", gap: "32px", justifyContent: "flex-start", padding: "32px ",
        }}>
        <ProfileMenu tabs={tabs} setTabs={setTabs}/>
        {contentPicker(tabs)}
      </Container>
    </div>
  );
};

export default ProfilePage;
