import ChangePasswordTab from "@/components/organisms/changePasswordTab/ChangePasswordTab";
import ProfileDetailsTab from "@/components/organisms/profileDetailsTab/ProfileDetailsTab";
import ProfileHistoryTab from "@/components/organisms/profileHistoryTab/ProfileHistoryTab";
import ProfileMenu from "@/components/organisms/profileMenu/ProfileMenu";
import ProfileOverview from "@/components/organisms/profileOverview/ProfileOverview";
import ProfilePageHeader from "@/components/organisms/profilePageHeader/ProfilePageHeader";
import ProfileNavMenuTablet from "@/components/profileNavMenuTablet/ProfileNavMenuTablet";
import SubscriptionTab from "@/components/subscriptionTab/SubscriptionTab";
import { type IProfilePageProps } from "@/pages/profile";

import { Container } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { parseAsString, useQueryState } from "next-usequerystate";
import React, { type FunctionComponent, type ReactNode, useMemo } from "react";

import * as styles from "./ProfilePage.styles";

export const tabs = [
  { slug: "overview", title: "Übersicht" },
  { slug: "history", title: "Verlauf" },
  { slug: "profile-details", title: "Einstellungen" },
  { slug: "change-password", title: "Passwort ändern" },
  { slug: "subscription", title: "Vertrag" },
] as const;

type ProfilePageProps = IProfilePageProps;

const ProfilePage: FunctionComponent<ProfilePageProps> = ({ allMainCategory }) =>
{
  const [tab, setTab] = useQueryState("tab", parseAsString.withDefault(tabs[0]!.slug));
  const activeTab = tabs?.find(x => x.slug === tab);

  const renderedTab: ReactNode = useMemo(() =>
  {
    switch (activeTab?.slug)
    {
      case "overview":
        return <ProfileOverview allMainCategory={allMainCategory}/>;
      case "profile-details":
        return <ProfileDetailsTab/>;
      case "change-password":
        return <ChangePasswordTab/>;
      case "history":
        return <ProfileHistoryTab/>;
      case "subscription":
        return <SubscriptionTab subscriptionStatus="You are currently using a free 5-day trial. You can purchase a subscription by clicking the button below:"/>;
      default:
        return <>{`Unknown tab. Create tab type case in ProfilePage component: ${JSON.stringify(activeTab, null, 2)}`}</>;
      /* case "Notifications":
        return <ProfileNotificationsTab/>;*/
    }
  }, [activeTab, allMainCategory]);
  const isTabletScreen = useMediaQuery("(max-width: 1100px)");
  return (
    <div>
      <ProfilePageHeader/>
      {isTabletScreen && (
        <ProfileNavMenuTablet
          tabs={tabs}
          setTab={setTab}
          activeTabSlug={activeTab?.slug}
        />
      )}
      <Container
        maw="100%"
        css={styles.outerContianer}>
        <Container
          maw={1440}
          css={styles.innerContainer}>
          <ProfileMenu
            tabs={tabs}
            setTab={setTab}
            activeTabSlug={activeTab?.slug}
          />
          {renderedTab}
        </Container>
      </Container>
    </div>
  );
};

export default ProfilePage;
