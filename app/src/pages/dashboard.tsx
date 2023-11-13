import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import DashboardPage from "@/components/pages/dashboardPage/DashboardPage";
import { type NextPageWithLayout } from "@/pages/_app";

const Dashboard: NextPageWithLayout = () =>
{
  return (
    <>
      <PageHead pageTitle="Dashboard"/>
      <DashboardPage/>
    </>
  );
};

Dashboard.getLayout = Layout;

export default Dashboard;
