import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import OverviewPage from "@/components/pages/OverviewPage/OverviewPage";
import { type CaseProgressState } from "@/db/schema";
import useCasesProgress from "@/hooks/useCasesProgress";
import { type NextPageWithLayout } from "@/pages/_app";
import getAllCases, { type AllCases } from "@/services/content/getAllCases";
import { getOverviewPageProps, type GetOverviewPagePropsResult } from "@/services/content/getOverviewPageProps";
import { useCasesOverviewFiltersStore } from "@/stores/overviewFilters.store";

import { type GetStaticProps } from "next";
import { useMemo } from "react";

type GetCasesOverviewPagePropsResult = GetOverviewPagePropsResult & {
  items: AllCases;
  variant: "case";
};

export const getStaticProps: GetStaticProps<GetCasesOverviewPagePropsResult> = async () =>
{
  const allCases = await getAllCases();
  const overviewPageProps = await getOverviewPageProps(allCases);

  return {
    props: {
      ...overviewPageProps,
      items: allCases,
      variant: "case"
    },
    revalidate: 10,
  };
};

const getCasesWithProgress = (cases: GetCasesOverviewPagePropsResult["items"], casesProgress: ReturnType<typeof useCasesProgress>["casesProgress"]) =>
{
  return cases.map(legalCase => ({
    ...legalCase,
    progressState: (casesProgress?.find(progress => progress?.caseId === legalCase.id)?.progressState ?? "not-started") satisfies CaseProgressState
  }));
};

export type CasesWithProgress = ReturnType<typeof getCasesWithProgress>;
export type CaseOverviewPageProps = Omit<GetCasesOverviewPagePropsResult, "items"> & {
  items: CasesWithProgress;
};

const Page: NextPageWithLayout<GetCasesOverviewPagePropsResult> = ({
  items,
  ...props
}) =>
{
  const { casesProgress } = useCasesProgress();
  const casesWithProgress = useMemo(() => getCasesWithProgress(items, casesProgress), [items, casesProgress]);
  const filteredLegalAreas = useCasesOverviewFiltersStore(s => s.filteredLegalAreas);
  const filteredStatuses = useCasesOverviewFiltersStore(s => s.filteredStatuses);
  const filteredTags = useCasesOverviewFiltersStore(s => s.filteredTags);
  const filteredTopics = useCasesOverviewFiltersStore(s => s.filteredTopics);
  const openDrawer = useCasesOverviewFiltersStore(s => s.openDrawer);

  return (
    <>
      <PageHead pageTitle="Fälle"/>
      <OverviewPage
        {...props}
        items={casesWithProgress}
        variant={"case"}
        filter={{
          filteredLegalAreas,
          filteredStatuses,
          filteredTags, 
          filteredTopics,
          openDrawer
        }}
      />
    </>
  );
};

Page.getLayout = Layout;

export default Page;
