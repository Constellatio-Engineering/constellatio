import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import OverviewPage from "@/components/pages/OverviewPage/OverviewPage";
import useCasesProgress from "@/hooks/useCasesProgress";
import { type NextPageWithLayout } from "@/pages/_app";
import { statusesFilterOptions, type StatusFilterOption, useCasesOverviewFiltersStore } from "@/stores/overviewFilters.store";

import { type AllCases, getAllCases } from "@constellatio/cms/content/getAllCases";
import { getOverviewPageProps, type GetOverviewPagePropsResult } from "@constellatio/cms/content/getOverviewPageProps";
import { type CaseProgressState } from "@constellatio/shared/validation";
import { type GetStaticProps } from "next";
import { useMemo } from "react";
import { useStoreWithEqualityFn } from "zustand/traditional";

type GetCasesOverviewPagePropsResult = GetOverviewPagePropsResult & {
  items: AllCases;
  variant: "case";
};

export const getStaticProps: GetStaticProps<GetCasesOverviewPagePropsResult> = async () =>
{
  const allCases = await getAllCases();
  // const allCases = dummyCases;
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

const getCasesWithProgress = (cases: GetCasesOverviewPagePropsResult["items"], casesProgress: ReturnType<typeof useCasesProgress>["data"]) =>
{
  return cases.map(legalCase =>
  {
    const progress = (casesProgress?.find(progress => progress?.caseId === legalCase.id)?.progressState ?? "not-started") satisfies CaseProgressState;

    let progressStateFilterable: StatusFilterOption;

    switch (progress)
    {
      case "not-started":
      {
        progressStateFilterable = statusesFilterOptions.find(status => status.value === "open")!;
        break;
      }
      case "completing-tests":
      case "solving-case":
      {
        progressStateFilterable = statusesFilterOptions.find(status => status.value === "in-progress")!;
        break;
      }
      case "completed":
      {
        progressStateFilterable = statusesFilterOptions.find(status => status.value === "completed")!;
        break;
      }
    }

    return ({
      ...legalCase,
      progressStateBackend: progress,
      progressStateFilterable
    });
  });
};

export type CasesWithProgress = ReturnType<typeof getCasesWithProgress>;
export type CaseOverviewPageProps = Omit<GetCasesOverviewPagePropsResult, "items"> & {
  items: CasesWithProgress;
};
export type CaseOverviewPageItems = CaseOverviewPageProps["items"][number];

const Page: NextPageWithLayout<GetCasesOverviewPagePropsResult> = ({
  items,
  ...props
}) =>
{
  const { data: casesProgress } = useCasesProgress();
  const casesWithProgress = useMemo(() => getCasesWithProgress(items, casesProgress), [items, casesProgress]);
  const filters = useStoreWithEqualityFn(useCasesOverviewFiltersStore, s => s.filters);
  const openDrawer = useStoreWithEqualityFn(useCasesOverviewFiltersStore, s => s.openDrawer);
  const clearAllFilters = useStoreWithEqualityFn(useCasesOverviewFiltersStore, s => s.clearAllFilters);
  const totalFiltersCount = useStoreWithEqualityFn(useCasesOverviewFiltersStore, s => s.getTotalFiltersCount());

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
          totalFiltersCount
        }}
      />
    </>
  );
};

Page.getLayout = Layout;

export default Page;
