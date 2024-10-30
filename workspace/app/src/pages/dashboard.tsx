import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import DashboardPage from "@/components/pages/dashboardPage/DashboardPage";
import { type NextPageWithLayout } from "@/pages/_app";

import { type GetServerSidePropsContext } from "next";

import { getTrpcServerSideHelpers } from "@/server/api/utils";

export async function getServerSideProps(context: GetServerSidePropsContext)
{
  const trpcHelpers = await getTrpcServerSideHelpers(context);

  await trpcHelpers.users.getUserDetails.prefetch();

  return {
    props: {
      trpcState: trpcHelpers.dehydrate(),
    },
  };
}

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
