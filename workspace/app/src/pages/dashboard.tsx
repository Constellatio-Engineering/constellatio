import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import DashboardPage from "@/components/pages/dashboardPage/DashboardPage";
import { type NextPageWithLayout } from "@/pages/_app";
import { getTrpcServerSideHelpers } from "@/utils/trpc";

import { type AllLearningPaths, getAllLearningPaths } from "@constellatio/cms/content/getAllLearningPaths";
import { type Nullable } from "@constellatio/utility-types";
import { type GetServerSideProps } from "next";

export type GetDashboardPagePropsResult = {
  readonly allLearningPaths: Nullable<AllLearningPaths>;
};

export const getServerSideProps: GetServerSideProps<GetDashboardPagePropsResult> = async (context) =>
{
  const allLearningPaths = await getAllLearningPaths();
  const trpcHelpers = await getTrpcServerSideHelpers(context);

  await trpcHelpers.users.getUserDetails.prefetch();

  return {
    props: {
      allLearningPaths,
      trpcState: trpcHelpers.dehydrate(),
    },
  };
};

const Dashboard: NextPageWithLayout<GetDashboardPagePropsResult> = (props) =>
{
  return (
    <>
      <PageHead pageTitle="Dashboard"/>
      <DashboardPage {...props}/>
    </>
  );
};

Dashboard.getLayout = Layout;

export default Dashboard;
