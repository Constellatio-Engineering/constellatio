import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import { NotificationsPage } from "@/components/pages/notificationsPage/NotificationsPage";
import { type NextPageWithLayout } from "@/pages/_app";

const Notifications: NextPageWithLayout = () =>
{
  return (
    <>
      <PageHead pageTitle="Benachrichtigungen"/>
      <NotificationsPage/>
    </>
  );
};

Notifications.getLayout = Layout;

export default Notifications;
