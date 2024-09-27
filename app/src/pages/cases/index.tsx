import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import OverviewPage from "@/components/pages/OverviewPage/OverviewPage";
import { type CaseProgressState } from "@/db/schema";
import useCasesProgress from "@/hooks/useCasesProgress";
import { type NextPageWithLayout } from "@/pages/_app";
import { dummyCases } from "@/pages/cases/dummy-data";
import getAllCases, { type AllCases } from "@/services/content/getAllCases";
import { getOverviewPageProps, type GetOverviewPagePropsResult } from "@/services/content/getOverviewPageProps";
import { useCasesOverviewFiltersStore } from "@/stores/overviewFilters.store";

import { type GetStaticProps } from "next";
import { useMemo } from "react";
import { useStore } from "zustand";

type GetCasesOverviewPagePropsResult = GetOverviewPagePropsResult & {
  items: AllCases;
  variant: "case";
};

export const getStaticProps: GetStaticProps<GetCasesOverviewPagePropsResult> = async () =>
{
  // const allCases = await getAllCases();
  const allCases = dummyCases;
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
  const filters = useStore(useCasesOverviewFiltersStore, s => s.filters);
  const openDrawer = useStore(useCasesOverviewFiltersStore, s => s.openDrawer);
  const toggleFilter = useStore(useCasesOverviewFiltersStore, s => s.toggleFilter);
  const clearAllFilters = useStore(useCasesOverviewFiltersStore, s => s.clearAllFilters);
  const totalFiltersCount = useStore(useCasesOverviewFiltersStore, s => s.getTotalFiltersCount());

  return (
    <>
      <PageHead pageTitle="Fälle"/>
      <OverviewPage
        {...props}
        items={casesWithProgress}
        variant={"case"}
        filter={{
          clearAllFilters,
          filters,
          openDrawer,
          toggleFilter,
          totalFiltersCount
        }}
      />
    </>
  );
};

Page.getLayout = Layout;

export default Page;
