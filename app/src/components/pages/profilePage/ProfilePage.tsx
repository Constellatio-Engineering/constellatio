import ErrorPage from "@/components/errorPage/ErrorPage";
import ChangePasswordTab from "@/components/organisms/changePasswordTab/ChangePasswordTab";
import ProfileDetailsTab from "@/components/organisms/profileDetailsTab/ProfileDetailsTab";
// import ProfileHistoryTab from "@/components/organisms/profileHistoryTab/ProfileHistoryTab";
import ProfileMenu from "@/components/organisms/profileMenu/ProfileMenu";
import ProfileOverview from "@/components/organisms/profileOverview/ProfileOverview";
import ProfilePageHeader from "@/components/organisms/profilePageHeader/ProfilePageHeader";
import ProfileNavMenuTablet from "@/components/profileNavMenuTablet/ProfileNavMenuTablet";
import SubscriptionTab from "@/components/subscriptionTab/SubscriptionTab";
import useUserDetails from "@/hooks/useUserDetails";
import { type IProfilePageProps } from "@/pages/profile";
import { type UserFiltered } from "@/utils/filters";

import { Container } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { parseAsString, useQueryState } from "next-usequerystate";
import React, { type FunctionComponent, type ReactNode, useMemo } from "react";

import * as styles from "./ProfilePage.styles";

export const tabs = [
  { slug: "overview", title: "Übersicht" },
  { slug: "profile-details", title: "Einstellungen" },
  { slug: "change-password", title: "Passwort ändern" },
  { slug: "subscription", title: "Vertrag" },
  // { slug: "history", title: "Verlauf" },
] as const;

export type UserDetails = {
  readonly userDetails: UserFiltered;
};
type ProfilePageProps = IProfilePageProps & UserDetails;

const ProfilePage: FunctionComponent<ProfilePageProps> = ({ allMainCategory, userDetails }) =>
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
      case "subscription":
        return <SubscriptionTab subscriptionStatus="You are currently using a free 5-day trial. You can purchase a subscription by clicking the button below:"/>;
      default:
        return <>{`Unknown tab. Create tab type case in ProfilePage component: ${JSON.stringify(activeTab, null, 2)}`}</>;
      // case "history":
      //   return <ProfileHistoryTab/>;
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
        p={0}
        maw="100%"
        css={styles.outerContianer}>
        <Container
          p={0}
          maw={1440}
          css={styles.innerContainer}>
          <ProfileMenu
            tabs={tabs}
            setTab={setTab}
            userDetails={userDetails}
            activeTabSlug={activeTab?.slug}
          />
          {renderedTab}
        </Container>
      </Container>
    </div>
  );
};

type ProfilePageWrapperProps = IProfilePageProps;

const ProfilePageWrapper: FunctionComponent<ProfilePageWrapperProps> = (props) =>
{
  const { error, isLoading, userDetails } = useUserDetails();

  if(isLoading)
  {
    return null;
  }

  if(error)
  {
    return (
      <ErrorPage error={error.message}/>
    );
  }

  if(!userDetails)
  {
    return (
      <ErrorPage error="User Details not found"/>
    );
  }

  return <ProfilePage {...props} userDetails={userDetails}/>;
};

export default ProfilePageWrapper;
