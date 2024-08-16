/* eslint-disable max-lines */
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { CaptionText } from "@/components/atoms/CaptionText/CaptionText";
import { LinkButton } from "@/components/atoms/LinkButton/LinkButton";
import StatusLabel, { type IStatusLabel } from "@/components/atoms/statusLabel/StatusLabel";
import Tag from "@/components/atoms/tag/Tag";
import { Restart } from "@/components/Icons/Restart";
import { Show } from "@/components/Icons/Show";
import { Timer } from "@/components/Icons/timer";
import ResetCaseProgressModal from "@/components/organisms/resetCaseProgressModal/ResetCaseProgressModal";
import useArticleViews from "@/hooks/useArticleViews";
import useCaseViews from "@/hooks/useCaseViews";
import { type Maybe, type IGenLegalArea, type IGenTags } from "@/services/graphql/__generated/sdk";
import { type Nullable } from "@/utils/types";
import { formatDate } from "@/utils/utils";

import { useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { type FunctionComponent } from "react";

import * as styles from "./OverviewCard.styles";
import OverviewCardTagsModal from "../overviewCardTagsModal/OverviewCardTagsModal";

export interface IOverviewCard 
{
  readonly contentId: string;
  readonly contentTitle: Nullable<string>;
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

const OverviewCard: FunctionComponent<IOverviewCard> = ({
  contentId,
  contentTitle,
  lastUpdated,
  legalArea,
  progressState,
  tags,
  timeInMinutes,
  topic,
  variant,
}) => 
{
  const { count: articleViews } = useArticleViews(contentId);
  const { count: caseViews } = useCaseViews(contentId);
  const views = variant === "dictionary" ? articleViews : caseViews;
  const [opened, { close, open }] = useDisclosure(false);
  const [isResetCaseModalOpened, { close: closeResetCaseModal, open: openResetCaseModal }] = useDisclosure(false);
  const theme = useMantineTheme();
  const initialFilteredTags = tags?.filter((tag) => !tag?.tagName?.startsWith("§"));
  const filteredTags = (initialFilteredTags && initialFilteredTags.length === 0) ? tags : initialFilteredTags;
  const filteredTagsWithNames = filteredTags?.filter(Boolean).filter(tag => Boolean(tag.tagName)) ?? [];

  return (
    <>
      <div css={styles.wrapper()}>
        <div css={styles.topDetails({ theme, variant })}>
          <div className="left-side">
            <div className="views">
              <CaptionText styleType="caption-01-bold" tt="uppercase">
                <Show/> {views} Aufrufe
              </CaptionText>
            </div>
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
                {(legalArea?.__typename === "LegalArea" && legalArea?.legalAreaName) && <th style={{ color: "#949494", padding: "16px 32px 8px 16px" }}><CaptionText styleType="caption-01-medium" tt="uppercase">Teilgebiet</CaptionText></th>}
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
              component="button">
              Alle ansehen
            </BodyText>
            <OverviewCardTagsModal opened={opened} tags={tags} close={close}/>
          </div>
          {variant === "case" && (
            <>
              {timeInMinutes != null && (
                <div css={styles.row({ theme, variant })}>
                  <div className="row-title">
                    <CaptionText styleType="caption-01-medium">BEARBEITUNGSZEIT</CaptionText>
                  </div>
                  <div className="row-value">
                    <BodyText styleType="body-01-medium" style={{ alignItems: "center", display: "flex", gap: 4 }}>
                      <Timer color={"#000000"}/> {timeFormatter(timeInMinutes)}
                    </BodyText>
                  </div>
                </div>
              )}
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
                      onClick={openResetCaseModal}
                      disabled={progressState !== "completed"}
                      size="medium"
                      title="Fall neu starten"
                      icon={<Restart/>}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <ResetCaseProgressModal
        caseId={contentId}
        caseTitle={contentTitle}
        isOpened={isResetCaseModalOpened}
        onClose={closeResetCaseModal}
      />
    </>
  );
};

export default OverviewCard;
