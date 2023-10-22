import ChangePasswordTab from "@/components/organisms/changePasswordTab/ChangePasswordTab";
import ProfileDetailsTab from "@/components/organisms/profileDetailsTab/ProfileDetailsTab";
import ProfileHistoryTab from "@/components/organisms/profileHistoryTab/ProfileHistoryTab";
import ProfileMenu, { type ITab } from "@/components/organisms/profileMenu/ProfileMenu";
import ProfileNotificationsTab from "@/components/organisms/profileNotificationsTab/ProfileNotificationsTab";
import ProfileOverview from "@/components/organisms/profileOverview/ProfileOverview";
import ProfilePageHeader from "@/components/organisms/profilePageHeader/ProfilePageHeader";
import SubscriptionTab from "@/components/subscriptionTab/SubscriptionTab";
import { type IProfilePageProps } from "@/pages/profile";

import { Container } from "@mantine/core";
import { useRouter } from "next/router";
import { useQueryState } from "next-usequerystate";
import React, { useState, type FunctionComponent, type ReactNode, useEffect } from "react";

import * as styles from "./ProfilePage.styles";

const ProfilePage: FunctionComponent<IProfilePageProps> = ({ allMainCategory }) =>
{
  const [query, setQuery] = useState("tab");
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
      case "Subscription":
        return <SubscriptionTab subscriptionStatus="You are currently using a free 5-day trial. You can purchase a subscription by clicking the button below:"/>;
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
  return router.query.tab && (
    <> 
      <div>
        <ProfilePageHeader/>
        <Container
          maw="100%"
          css={styles.outerContianer}>
          <Container
            maw={1440}
            css={styles.innerContainer}>
            <ProfileMenu tabs={tabs} setQuery={setQuery} setTabs={setTabs}/>
            {contentPicker(tabs)}
          </Container>
        </Container>
      </div>
    </>
  );
};

export default ProfilePage;
