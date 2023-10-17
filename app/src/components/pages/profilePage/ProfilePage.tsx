import ChangePasswordTab from "@/components/organisms/changePasswordTab/ChangePasswordTab";
import ProfileDetailsTab from "@/components/organisms/profileDetailsTab/ProfileDetailsTab";
import ProfileHistoryTab from "@/components/organisms/profileHistoryTab/ProfileHistoryTab";
import ProfileMenu, { type ITab } from "@/components/organisms/profileMenu/ProfileMenu";
import ProfileNotificationsTab from "@/components/organisms/profileNotificationsTab/ProfileNotificationsTab";
import ProfileOverview from "@/components/organisms/profileOverview/ProfileOverview";
import ProfilePageHeader from "@/components/organisms/profilePageHeader/ProfilePageHeader";
import { type IProfilePageProps } from "@/pages/profile";

import { Container, useMantineTheme } from "@mantine/core";
import { useRouter } from "next/router";
import { useQueryState } from "next-usequerystate";
import React, { useState, type FunctionComponent, type ReactNode, useEffect } from "react";

const ProfilePage: FunctionComponent<IProfilePageProps> = ({ allMainCategory }) =>
{
  const [query, setQuery] = useQueryState("tab");
  const [tabs, setTabs] = useState<ITab[]>([
    { selected: true, slug: "overview", title: "Overview" },
    { selected: false, slug: "profile-details", title: "Profile Details" },
    { selected: false, slug: "change-password", title: "Change Password" },
    { selected: false, slug: "history", title: "History" },
    { selected: false, slug: "subscription", title: "Subscription" },
    // { selected: false, slug: "notifications", title: "Notifications" },
  ]);

  const contentPicker = (tabs: ITab[]): ReactNode => 
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
  useEffect(() => 
  {
    if(typeof window !== "undefined") 
    {
      void (async () => 
      {
        try 
        {
          if(!query) 
          {
            await router.replace({ query: { tab: tabs?.[0]?.slug ?? "" } });
          } 
          else 
          {
            setTabs(tabs.map((x: ITab) => x.slug === query ? ({ ...x, selected: true }) : ({ ...x, selected: false })));
          }
        }
        catch (error) 
        {
          console.error(error);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.tab, setQuery]);
  const theme = useMantineTheme();
  return router.query.tab && (
    <> 
      <div>
        <ProfilePageHeader/>
        <Container
          maw={1440}
          sx={{
            alignItems: "flex-start",
            background: theme.colors["neutrals-01"][1],
            display: "flex",
            flexDirection: "row",
            gap: "32px",
            justifyContent: "flex-start",
            padding: "32px ",
            position: "relative",
            transform: "translateY(-100px)",
            width: "100%",
            zIndex: 3 
          }}>
          <ProfileMenu tabs={tabs} setQuery={setQuery} setTabs={setTabs}/>
          {contentPicker(tabs)}
        </Container>
      </div>
    </>
  );
};

export default ProfilePage;
