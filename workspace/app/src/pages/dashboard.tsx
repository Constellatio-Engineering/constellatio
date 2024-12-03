import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import DashboardPage from "@/components/pages/dashboardPage/DashboardPage";
import { type NextPageWithLayout } from "@/pages/_app";
import { getTrpcServerSideHelpers } from "@/utils/trpc";

import { type IGenLearningPath } from "@constellatio/cms/generated-types";
import { caisySDK } from "@constellatio/cms/sdk";
import { type Nullable } from "@constellatio/utility-types";
import { type GetServerSideProps } from "next";

export type GetDashboardPagePropsResult = {
  readonly learningPath: Nullable<IGenLearningPath>;
};

export const getServerSideProps: GetServerSideProps<GetDashboardPagePropsResult> = async (context) =>
{
  const trpcHelpers = await getTrpcServerSideHelpers(context);

  await trpcHelpers.users.getUserDetails.prefetch();

  const { LearningPath } = await caisySDK.getLearningPathById({ id: "4f9adf51-1500-4f19-b59b-0c79c10ebde3" });

  return {
    props: {
      learningPath: LearningPath,
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
