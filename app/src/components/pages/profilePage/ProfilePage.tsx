import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import ChangeEmailTab from "@/components/organisms/changeEmailTab/ChangeEmailTab";
import ChangePasswordTab from "@/components/organisms/changePasswordTab/ChangePasswordTab";
import ProfileDetailsTab from "@/components/organisms/profileDetailsTab/ProfileDetailsTab";
// import ProfileHistoryTab from "@/components/organisms/profileHistoryTab/ProfileHistoryTab";
import ProfileMenu from "@/components/organisms/profileMenu/ProfileMenu";
import RenderedTabSkeleton from "@/components/organisms/profileMenu/renderedTabSkeleton/RenderedTabSkeleton";
import ProfileNavMenuTablet from "@/components/organisms/profileNavMenuTablet/ProfileNavMenuTablet";
import ProfileOverview from "@/components/organisms/profileOverview/ProfileOverview";
import ProfilePageHeader from "@/components/organisms/profilePageHeader/ProfilePageHeader";
import ProfileReferral from "@/components/organisms/profileReferral/ProfileReferral";
import SubscriptionTab from "@/components/organisms/subscriptionTab/SubscriptionTab";
import UseQueryStateWrapper from "@/components/Wrappers/useQueryStateWrapper/UseQueryStateWrapper";
import useUserDetails from "@/hooks/useUserDetails";

import { Container } from "@mantine/core";
import { parseAsString, useQueryState } from "next-usequerystate";
import React, { type FunctionComponent, type ReactNode, useMemo } from "react";

import * as styles from "./ProfilePage.styles";

export const tabQueryKey = "tab";
export const changeEmailTabSlug = "change-email";
export const subscriptionTabSlug = "subscription";

export const tabs = [
  { slug: "overview", title: "Übersicht" },
  { slug: "profile-details", title: "Persönliche Daten" },
  { slug: changeEmailTabSlug, title: "E-Mail ändern" },
  { slug: "change-password", title: "Passwort ändern" },
  { slug: subscriptionTabSlug, title: "Abonnement" },
  { slug: "referral", title: "Freunde einladen" },
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
      // case "history":
      //   return <ProfileHistoryTab/>;
      case "subscription":
        return <SubscriptionTab/>;
      case "referral":
        return <ProfileReferral/>;
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
        <ContentWrapper>
          <div css={styles.innerContainer}>
            <ProfileMenu
              tabs={tabs}
              setTab={setTab}
              activeTabSlug={activeTab?.slug}
            />
            {renderedTab}
          </div>
        </ContentWrapper>
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
