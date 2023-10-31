import ChangeEmailTab from "@/components/organisms/changeEmailTab/ChangeEmailTab";
import ChangePasswordTab from "@/components/organisms/changePasswordTab/ChangePasswordTab";
import ProfileDetailsTab from "@/components/organisms/profileDetailsTab/ProfileDetailsTab";
import ProfileMenu from "@/components/organisms/profileMenu/ProfileMenu";
import RenderedTabSkeleton from "@/components/organisms/profileMenu/renderedTabSkeleton/RenderedTabSkeleton";
import ProfileOverview from "@/components/organisms/profileOverview/ProfileOverview";
import ProfilePageHeader from "@/components/organisms/profilePageHeader/ProfilePageHeader";
import ProfileNavMenuTablet from "@/components/profileNavMenuTablet/ProfileNavMenuTablet";
import SubscriptionTab from "@/components/subscriptionTab/SubscriptionTab";
import UseQueryStateWrapper from "@/components/useQueryStateWrapper/UseQueryStateWrapper";
import useUserDetails from "@/hooks/useUserDetails";

import { Container } from "@mantine/core";
import { parseAsString, useQueryState } from "next-usequerystate";
import React, { type FunctionComponent, type ReactNode, useMemo } from "react";

import * as styles from "./ProfilePage.styles";

export const tabQueryKey = "tab";
export const changeEmailTabSlug = "change-email";

export const tabs = [
  { slug: "overview", title: "Übersicht" },
  { slug: "profile-details", title: "Einstellungen" },
  { slug: changeEmailTabSlug, title: "E-Mail ändern" },
  { slug: "change-password", title: "Passwort ändern" },
  { slug: "subscription", title: "Vertrag" },
  // { slug: "history", title: "Verlauf" },
] as const;

const ProfilePageContent: FunctionComponent = () =>
{
  const [tab, setTab] = useQueryState(tabQueryKey, parseAsString.withDefault(tabs[0]!.slug));
  const activeTab = tabs?.find(x => x.slug === tab);
  const { error, isLoading, userDetails } = useUserDetails();

  const renderedTab: ReactNode = useMemo(() =>
  {
    if(isLoading)
    {
      return <RenderedTabSkeleton/>;
    }

    if(error || !userDetails)
    {
      return (
        <div>
          <h2>Da ist leider etwas schief gelaufen...</h2>
        </div>
      );
    }

    switch (activeTab?.slug)
    {
      case "overview":
        return <ProfileOverview/>;
      case "profile-details":
        return <ProfileDetailsTab userDetails={userDetails}/>;
      case "change-password":
        return <ChangePasswordTab/>;
      case "change-email":
        return <ChangeEmailTab userDetails={userDetails}/>;
      /* case "history":
        return <ProfileHistoryTab/>;*/
      case "subscription":
        return <SubscriptionTab/>;
      default:
        return <>{`Unknown tab. Create tab type case in ProfilePage component: ${JSON.stringify(activeTab, null, 2)}`}</>;
      /* case "Notifications":
        return <ProfileNotificationsTab/>;*/
    }
  }, [activeTab, error, isLoading, userDetails]);

  return (
    <div>
      <ProfilePageHeader/>
      <ProfileNavMenuTablet
        tabs={tabs}
        setTab={setTab}
        activeTabSlug={activeTab?.slug}
      />
      <Container
        p={0}
        maw="100%"
        css={styles.outerContainer}>
        <Container
          p={0}
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

const ProfilePage: FunctionComponent = () =>
{
  return (
    <UseQueryStateWrapper>
      <ProfilePageContent/>
    </UseQueryStateWrapper>
  );
};

export default ProfilePage;
