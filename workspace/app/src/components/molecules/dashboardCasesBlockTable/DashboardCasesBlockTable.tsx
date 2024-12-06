import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { CaptionText } from "@/components/atoms/CaptionText/CaptionText";
import StatusTableCell from "@/components/atoms/statusTableCell/StatusTableCell";
import { ClockIcon } from "@/components/Icons/ClockIcon";
import BookmarkButton from "@/components/organisms/caseBlock/BookmarkButton/BookmarkButton";
import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import { timeFormatter } from "@/components/organisms/overviewCard/OverviewCard";
import { colooors } from "@/constants/styles/colors";
import useBookmarks from "@/hooks/useBookmarks";
import useCases from "@/hooks/useCases";
import useCasesProgress from "@/hooks/useCasesProgress";
import { extractNumeric } from "@/utils/helpers";

import { appPaths } from "@constellatio/shared/paths";
import { useRouter } from "next/router";
import { type FunctionComponent } from "react";

import * as styles from "./DashboardCasesBlockTable.styles";

const getProgressWeight = (progress: string): number => 
{
  switch (progress) 
  {
    case "solving-case":
      return 3;
    case "not-started":
      return 1;
    case "completing-tests":
      return 2;
    case "completed":
      return 0;
    default:
      return -1;
  }
};

const DashboardCasesBlockTable: FunctionComponent = () => 
{
  const router = useRouter();
  const { allCases } = useCases();
  const { data: casesProgress } = useCasesProgress();
  const casesWithProgress = allCases.map(caseItem =>
  {
    return {
      case: caseItem,
      progress: casesProgress?.find((caseProgress) => caseProgress?.caseId === caseItem?.id) ?? { caseId: "", progressState: "not-started" }
    };
  });
  const sortedCases = casesWithProgress.sort((a, b) =>
  {
    const numA = extractNumeric(a.case.title ?? "");
    const numB = extractNumeric(b.case.title ?? "");

    if(numA !== null && numB !== null)
    {
      return numA - numB;
    }
    return a?.case?.title?.localeCompare(b.case.title ?? "") ?? -1;
  }).sort((a, b) => getProgressWeight(b.progress.progressState) - getProgressWeight(a.progress.progressState)).
    map(item => ({ ...item.case, progress: item.progress?.progressState }));
  const { bookmarks: casesBookmarks, isLoading: isGetCasesBookmarksLoading } = useBookmarks("case", { enabled: true });
  const bookmarks = casesBookmarks;
  const routeToCase = (id: string | null | undefined): void => void router.push(`${appPaths.cases}/${id}`);

  const numberOfCasesShown = 6;

  return (
    <div css={styles.wrapper}>
      {allCases?.length > 0 && (
        <table css={styles.casesTable(numberOfCasesShown)}>
          <thead>
            <tr>
              <th className="primaryCell">
                <CaptionText styleType="caption-01-medium" component="p">Fälle</CaptionText>
              </th>
              <th>
                <CaptionText
                  pl={21}
                  styleType="caption-01-medium"
                  component="p">
                  STATUS
                </CaptionText>
              </th>
              <th className="hide-on-tablet">
                <CaptionText styleType="caption-01-medium" component="p">Bearbeitungszeit</CaptionText>
              </th>
              <th>
                <CaptionText styleType="caption-01-medium" component="p">Rechtsgebiet</CaptionText>
              </th>
              <th>
                <CaptionText styleType="caption-01-medium" component="p">Teilgebiet</CaptionText>
              </th>
              {/* BOOKMARK CELL */}
              <th/>
            </tr>
          </thead>
          <tbody>
            {sortedCases.slice(0, numberOfCasesShown).map((item, index) => (
              <tr key={index}>
                <td className="primaryCell" onClick={() => routeToCase(item?.id)}>
                  <BodyText styleType="body-01-medium" title={item?.title ?? ""} component="p">{item?.title}</BodyText>
                </td>
                <td onClick={() => routeToCase(item?.id)}>
                  <StatusTableCell progressState={item?.progress ?? "not-started"}/>
                </td>
                <td className="hide-on-tablet" onClick={() => routeToCase(item?.id)}>
                  <BodyText styleType="body-01-medium" css={styles.durationCell} component="p"><ClockIcon/>{timeFormatter(item?.durationToCompleteInMinutes ?? 0)}</BodyText>
                </td>
                <td onClick={() => routeToCase(item?.id)}>
                  <BodyText styleType="body-01-medium" color={colooors["neutrals-01"][9]} component="p">{item?.mainCategoryField?.[0]?.mainCategory}</BodyText>
                </td>
                <td onClick={() => routeToCase(item?.id)}>
                  <BodyText styleType="body-01-medium" color={colooors["neutrals-01"][9]} component="p">{item?.legalArea?.legalAreaName}</BodyText>
                </td>
                <td>
                  <BookmarkButton
                    areAllBookmarksLoading={isGetCasesBookmarksLoading}
                    isBookmarked={bookmarks.some(bookmark => bookmark?.resourceId === item?.id) || false}
                    resourceId={item.id}
                    variant="case"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {sortedCases?.length === 0 && (
        <EmptyStateCard
          title="Du hast bereits alle Fälle gelöst"
          text="In Kürze findest du hier weitere Fälle, die wir gerade für dich erstellen"
          variant="For-small-areas"
        />
      )}
    </div>
  );
};

export default DashboardCasesBlockTable;
