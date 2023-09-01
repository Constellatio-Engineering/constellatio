
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { CaptionText } from "@/components/atoms/CaptionText/CaptionText";
import { LinkButton } from "@/components/atoms/LinkButton/LinkButton";
import StatusLabel, { type IStatusLabel } from "@/components/atoms/statusLabel/StatusLabel";
import Tag from "@/components/atoms/tag/Tag";
import { Show } from "@/components/Icons/Show";
import { Timer } from "@/components/Icons/timer";
import { Trash } from "@/components/Icons/Trash";
import { type IGenLegalArea, type IGenTags } from "@/services/graphql/__generated/sdk";

import { useMantineTheme } from "@mantine/core";
import { type Maybe } from "@trpc/server";
import React, { type FunctionComponent } from "react";

import * as styles from "./OverviewCard.styles";

export interface IOverviewCard 
{
  readonly lastUpdated: Date;
  readonly legalArea: Maybe<IGenLegalArea> | undefined;
  readonly status?: IStatusLabel["variant"];
  readonly tags: Maybe<Maybe<IGenTags>[]> | undefined;
  readonly timeInMinutes?: number;
  readonly topic: string;
  readonly variant: "case" | "dictionary";
  readonly views: number;
}

export function timeFormatter(minutes: number): string 
{
  if(minutes >= 60) 
  {
    const hours = Math.floor(minutes / 60);
    return `${hours} HOUR${hours > 1 ? "S" : ""}`;
  }
  else 
  {
    return `${minutes} MINUTE${minutes !== 1 ? "S" : ""}`;
  }
}
function formatDate(inputDate: string | number | Date): string 
{
  // Ensure the input is treated as a Date object
  const date = new Date(inputDate);

  // Get day, month, and year
  const day = date.getDate();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${monthName}, ${year}`;
}

const OverviewCard: FunctionComponent<IOverviewCard> = ({
  lastUpdated,
  legalArea,
  status,
  tags,
  timeInMinutes,
  topic,
  variant,
  views,
}) => 
{
  const theme = useMantineTheme();
  return (
    <div css={styles.wrapper()}>
      <div css={styles.topDetails({ theme, variant })}>
        <div className="left-side">
          {views !== undefined && views !== null && (
            <div className="views">
              <CaptionText styleType="caption-01-bold">
                <Show/> {views} VIEWS
              </CaptionText>
            </div>
          )}
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
            <BodyText styleType="body-02-medium">Last updated: </BodyText>
            <CaptionText styleType="caption-01-bold">
              {formatDate(lastUpdated)}
            </CaptionText>
          </div>
        )}
      </div>
      <div css={styles.cardBody({ theme, variant })}>
        <table style={{ textAlign: "left", }}>
          <thead>
            <tr>
              {legalArea && <th style={{ color: "#949494", padding: "16px 32px 8px 16px" }}><CaptionText styleType="caption-01-medium">LEGAL AREA</CaptionText></th>}
              {variant === "case" && topic && (<th style={{ color: "#949494", padding: "16px 32px 8px 16px" }}><CaptionText styleType="caption-01-medium" component="p">TOPIC</CaptionText> </th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              {legalArea?.legalAreaName && <td style={{ color: "black", padding: "4px 32px 16px 16px" }}><BodyText styleType="body-01-medium">{legalArea?.legalAreaName}</BodyText></td>}
              {variant === "case" && topic && <td style={{ color: "black", padding: "4px 32px 16px 16px" }}><BodyText styleType="body-01-medium">{topic}</BodyText></td>}
            </tr>
          </tbody>
        </table>
        {variant === "dictionary" && (
          <div css={styles.row({ theme, variant })}>
            <div className="row-title">
              <CaptionText styleType="caption-01-medium" component="p">TOPIC</CaptionText>
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
          <div className="row-value">
            {
              tags?.map((tag, tagIndex) => (
                <Tag key={tagIndex}>{tag?.tagName}</Tag>
              ))
            }
          </div>
        </div>
        {
          variant === "case" && (
            <div css={styles.row({ theme, variant })}>
              <div className="row-title">
                <CaptionText styleType="caption-01-medium">STATUS</CaptionText>
              </div>
              <div className="row-value">
                {
                  status && (
                    <StatusLabel variant={status}/>
                  )
                }
                <div className="reset-button">
                  <LinkButton size="medium" title="Reset case progress" icon={<Trash/>}/>
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
