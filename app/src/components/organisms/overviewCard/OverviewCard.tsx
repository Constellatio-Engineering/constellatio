/* eslint-disable max-lines */
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { CaptionText } from "@/components/atoms/CaptionText/CaptionText";
import { LinkButton } from "@/components/atoms/LinkButton/LinkButton";
import StatusLabel, { type IStatusLabel } from "@/components/atoms/statusLabel/StatusLabel";
import Tag from "@/components/atoms/tag/Tag";
import { Show } from "@/components/Icons/Show";
import { Timer } from "@/components/Icons/timer";
import { Trash } from "@/components/Icons/Trash";
import useArticleViews from "@/hooks/useArticleViews";
import useCaseViews from "@/hooks/useCaseViews";
import useResetCaseProgress from "@/hooks/useResetCaseProgress";
import { type IGenLegalArea, type IGenTags } from "@/services/graphql/__generated/sdk";

import { useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { type Maybe } from "@trpc/server";
import React, { type FunctionComponent } from "react";

import * as styles from "./OverviewCard.styles";
import OverviewCardTagsModal from "../overviewCardTagsModal/OverviewCardTagsModal";

export interface IOverviewCard 
{
  readonly contentId: string;
  readonly lastUpdated: Date;
  readonly legalArea: Maybe<IGenLegalArea> | undefined;
  readonly progressState?: IStatusLabel["progressState"];
  readonly tags: Maybe<Array<Maybe<IGenTags>>> | undefined;
  readonly timeInMinutes?: number;
  readonly topic: string;
  readonly variant: "case" | "dictionary";
}

export function timeFormatter(minutes: number): string 
{
  if(minutes >= 60) 
  {
    const hours = Math.floor(minutes / 60);
    return `${hours} ${hours > 1 ? "Stunden" : "Stunde"}`;
  }
  else 
  {
    return `${minutes} Minute${minutes !== 1 ? "n" : ""}`;
  }
}
function formatDate(inputDate: string | number | Date): string 
{
  // Ensure the input is treated as a Date object
  const date = new Date(inputDate);

  // Get day, month, and year
  const day = date.getDate();
  const months = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${monthName}, ${year}`;
}

const OverviewCard: FunctionComponent<IOverviewCard> = ({
  contentId,
  lastUpdated,
  legalArea,
  progressState,
  tags,
  timeInMinutes,
  topic,
  variant,
}) => 
{
  const resetCaseProgress = useResetCaseProgress();
  const { count: articleViews } = useArticleViews(contentId);
  const { count: caseViews } = useCaseViews(contentId);
  const views = variant === "dictionary" ? articleViews : caseViews;
  const [opened, { close, open }] = useDisclosure(false);
  const theme = useMantineTheme();
  const initialFilteredTags = tags?.filter((tag) => !tag?.tagName?.startsWith("§"));
  const filteredTags = (initialFilteredTags && initialFilteredTags.length === 0) ? tags : initialFilteredTags;
  const filteredTagsWithNames = filteredTags?.filter(Boolean).filter(tag => Boolean(tag.tagName)) ?? [];

  return (
    <div css={styles.wrapper()}>
      <div css={styles.topDetails({ theme, variant })}>
        <div className="left-side">
          <div className="views">
            <CaptionText styleType="caption-01-bold" tt="uppercase">
              <Show/> {views} Aufrufe
            </CaptionText>
          </div>
          {variant === "case" && (timeInMinutes !== null && timeInMinutes !== undefined) && (
            <div className="time">
              <CaptionText styleType="caption-01-bold">
                <Timer/> {timeFormatter(timeInMinutes)}
              </CaptionText>
            </div>
          )}
        </div>
        {lastUpdated && (
          <div className="right-side">
            <BodyText styleType="body-02-medium">Zuletzt aktualisiert: </BodyText>
            <CaptionText styleType="caption-01-bold">
              {formatDate(lastUpdated)}
            </CaptionText>
          </div>
        )}
      </div>
      <div css={styles.cardBody({ theme, variant })}>
        <table style={{ borderBottom: "1px solid #F0F0F0", textAlign: "left", width: "100%" }}>
          <thead>
            <tr>
              {(legalArea?.__typename === "LegalArea" && legalArea?.legalAreaName) && <th style={{ color: "#949494", padding: "16px 32px 8px 16px" }}><CaptionText styleType="caption-01-medium" tt="uppercase">Rechtsgebiet</CaptionText></th>}
              {variant === "case" && topic && (<th style={{ color: "#949494", padding: "16px 32px 8px 16px" }}><CaptionText styleType="caption-01-medium" component="p" tt="uppercase">Thema</CaptionText> </th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              {(legalArea?.__typename === "LegalArea" && legalArea?.legalAreaName) && <td style={{ color: "black", padding: "4px 32px 16px 16px" }}><BodyText styleType="body-01-medium">{legalArea?.legalAreaName}</BodyText></td>}
              {variant === "case" && topic && <td style={{ color: "black", padding: "4px 32px 16px 16px" }}><BodyText styleType="body-01-medium">{topic}</BodyText></td>}
            </tr>
          </tbody>
        </table>
        {variant === "dictionary" && (
          <div css={styles.row({ theme, variant })}>
            <div className="row-title">
              <CaptionText styleType="caption-01-medium" component="p" tt="capitalize">Thema</CaptionText>
            </div>
            <div className="row-value">
              <BodyText styleType="body-01-medium">{topic}</BodyText>
            </div>
          </div>
        )}
        <div css={styles.row({ theme, variant })}>
          <div className="row-title">
            <CaptionText styleType="caption-01-medium" component="p">TAGS</CaptionText>
          </div>
          {/* <ScrollArea> */}
          <div className="row-value tags-values">
            {filteredTagsWithNames?.map((tag) => (
              <Tag key={tag.id} title={tag.tagName!}/>
            ))}
          </div>
          <BodyText
            type="button"
            css={styles.seeAllTagsButton}
            onClick={open}
            styleType="body-01-regular"
            component="button">Alle ansehen
          </BodyText>
          <OverviewCardTagsModal opened={opened} tags={tags} close={close}/>
        </div>
        {
          variant === "case" && (
            <div css={styles.row({ theme, variant })}>
              <div className="row-title">
                <CaptionText styleType="caption-01-medium">STATUS</CaptionText>
              </div>
              <div className="row-value">
                {progressState && (
                  <StatusLabel progressState={progressState}/>
                )}
                <div className="reset-button">
                  <LinkButton
                    onClick={() => resetCaseProgress({ caseId: contentId })}
                    size="medium"
                    title="Fall neu starten"
                    icon={<Trash/>}
                  />
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default OverviewCard;
