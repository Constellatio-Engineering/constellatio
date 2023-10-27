import useBookmarks from "@/hooks/useBookmarks";
import useCases from "@/hooks/useCases";
import useCasesProgress from "@/hooks/useCasesProgress";
import { paths } from "@/utils/paths";

import { useMantineTheme } from "@mantine/styles";
import { useRouter } from "next/router";
import React, { type FunctionComponent } from "react";

import * as styles from "./DashboardCasesBlockTable.styles";
import { BodyText } from "../atoms/BodyText/BodyText";
import { CaptionText } from "../atoms/CaptionText/CaptionText";
import StatusTableCell from "../atoms/statusTableCell/StatusTableCell";
import { ClockIcon } from "../Icons/ClockIcon";
import CaseBlockBookmarkButton from "../organisms/caseBlock/caseBlockBookmarkButton/CaseBlockBookmarkButton";
import EmptyStateCard from "../organisms/emptyStateCard/EmptyStateCard";
import { timeFormatter } from "../organisms/overviewCard/OverviewCard";

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
  const { casesProgress } = useCasesProgress();
  const theme = useMantineTheme();
  const casesWithProgress = allCases.map(caseItem => 
  {
    return {
      case: caseItem,
      progress: casesProgress?.find((caseProgress) => caseProgress?.caseId === caseItem?.id) ?? { caseId: "", progressState: "not-started" }
    };
  });
  const sortedCases = casesWithProgress.sort((a, b) => getProgressWeight(b.progress.progressState) - getProgressWeight(a.progress.progressState)).
    map(item => ({ ...item.case, progress: item.progress?.progressState }));
  const { bookmarks: casesBookmarks, isLoading: isGetCasesBookmarksLoading } = useBookmarks("case", { enabled: true });
  const bookmarks = casesBookmarks;
  const routeToCase = (id: string | null | undefined): void => void router.push(`${paths.cases}/${id}`);
  return (
    <div css={styles.wrapper}>
      {allCases?.length > 0 && (
        <table css={styles.casesTable}>
          <thead>
            <tr>
              <th className="primaryCell">
                <CaptionText styleType="caption-01-medium" component="p">Fälle</CaptionText>
              </th>
              <th>
                <CaptionText
                  pl={21}
                  styleType="caption-01-medium"
                  component="p">STATUS
                </CaptionText>
              </th>
              <th>
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
            {sortedCases.slice(0, 6).map((item, index) => (
              <tr key={index}>
                <td className="primaryCell" onClick={() => routeToCase(item?.id)}>
                  <BodyText styleType="body-01-medium" component="p">{item?.title}</BodyText>
                </td>
                <td onClick={() => routeToCase(item?.id)}>
                  <StatusTableCell progressState={item?.progress ?? "not-started"}/>
                </td>
                <td onClick={() => routeToCase(item?.id)}>
                  <BodyText styleType="body-01-medium" css={styles.durationCell} component="p"><ClockIcon/>{timeFormatter(item?.durationToCompleteInMinutes ?? 0)}</BodyText>
                </td>
                <td onClick={() => routeToCase(item?.id)}>
                  <BodyText styleType="body-01-medium" color={theme.colors["neutrals-01"][9]} component="p">{item?.mainCategoryField?.[0]?.mainCategory}</BodyText>
                </td>
                <td onClick={() => routeToCase(item?.id)}>
                  <BodyText styleType="body-01-medium" color={theme.colors["neutrals-01"][9]} component="p">{item?.legalArea?.legalAreaName}</BodyText>
                </td>
                <td>
                  <CaseBlockBookmarkButton
                    areAllBookmarksLoading={isGetCasesBookmarksLoading}
                    isBookmarked={bookmarks.some(bookmark => bookmark?.resourceId === item?.id) || false}
                    caseId={item.id}
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
