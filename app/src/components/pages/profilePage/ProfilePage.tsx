import ErrorPage from "@/components/errorPage/ErrorPage";
import ChangePasswordTab from "@/components/organisms/changePasswordTab/ChangePasswordTab";
import ProfileDetailsTab from "@/components/organisms/profileDetailsTab/ProfileDetailsTab";
import ProfileHistoryTab from "@/components/organisms/profileHistoryTab/ProfileHistoryTab";
import ProfileMenu from "@/components/organisms/profileMenu/ProfileMenu";
import ProfileOverview from "@/components/organisms/profileOverview/ProfileOverview";
import ProfilePageHeader from "@/components/organisms/profilePageHeader/ProfilePageHeader";
import SubscriptionTab from "@/components/subscriptionTab/SubscriptionTab";
import useUserDetails from "@/hooks/useUserDetails";
import { type IProfilePageProps } from "@/pages/profile";
import { type UserFiltered } from "@/utils/filters";

import { Container } from "@mantine/core";
import { parseAsString, useQueryState } from "next-usequerystate";
import React, { type FunctionComponent, type ReactNode, useMemo } from "react";

import * as styles from "./ProfilePage.styles";

export const tabs = [
  { slug: "overview", title: "Overview" },
  { slug: "profile-details", title: "Profile Details" },
  { slug: "change-password", title: "Change Password" },
  { slug: "history", title: "History" },
  { slug: "subscription", title: "Subscription" },
] as const;

export type UserDetails = {
  readonly userDetails: UserFiltered;
};
type ProfilePageProps = IProfilePageProps & UserDetails;

const ProfilePage: FunctionComponent<ProfilePageProps> = ({ allMainCategory, userDetails }) =>
{
  const [tab, setTab] = useQueryState("tab", parseAsString.withDefault(tabs[0]!.slug));
  const activeTab = tabs?.find(x => x.slug === tab);

  console.log("userDetails", userDetails);

  const renderedTab: ReactNode = useMemo(() =>
  {
    switch (activeTab?.title)
    {
      case "Overview":
        return <ProfileOverview allMainCategory={allMainCategory}/>;
      case "Profile Details":
        return <ProfileDetailsTab/>;
      case "Change Password":
        return <ChangePasswordTab/>;
      /* case "Notifications":
        return <ProfileNotificationsTab/>;*/
      case "History":
        return <ProfileHistoryTab/>;
      case "Subscription":
        return <SubscriptionTab subscriptionStatus="You are currently using a free 5-day trial. You can purchase a subscription by clicking the button below:"/>;
      default:
        return <>{`Unknown tab. Create tab type case in ProfilePage component: ${JSON.stringify(activeTab, null, 2)}`}</>;
    }
  }, [activeTab, allMainCategory]);

  return (
    <div>
      <ProfilePageHeader/>
      <Container
        maw="100%"
        css={styles.outerContianer}>
        <Container
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
