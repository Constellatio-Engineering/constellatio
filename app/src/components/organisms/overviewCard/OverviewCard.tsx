import React, { FunctionComponent } from "react";

import * as styles from "./OverviewCard.styles";
import { useMantineTheme } from "@mantine/core";
import { CaptionText } from "@/components/atoms/CaptionText/CaptionText";
import { Show } from "@/components/Icons/Show";
import { Timer } from "@/components/Icons/timer";
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import Tag from "@/components/atoms/tag/Tag";
import StatusLabel, { IStatusLabel } from "@/components/atoms/statusLabel/StatusLabel";
import { LinkButton } from "@/components/atoms/LinkButton/LinkButton";
import { IconTrash } from "@tabler/icons-react";

export interface IOverviewCard {
  variant: "case" | "dictionary";
  views: number;
  timeInMinutes?: number;
  lastUpdated: Date;
  legalArea: string;
  topic: string;
  tags: string[];
  status?: IStatusLabel['variant'];
}

function timeFormatter(minutes: number): string {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    return `${hours} HOUR${hours > 1 ? "S" : ""}`;
  } else {
    return `${minutes} MINUTE${minutes !== 1 ? "S" : ""}`;
  }
}
function formatDate(inputDate: string | number | Date): string {
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
  variant,
  views,
  timeInMinutes,
  lastUpdated,
  legalArea,
  tags,
  topic,
  status,
}) => {
  const theme = useMantineTheme();
  return (
    <div css={styles.wrapper({ variant, theme })}>
      <div css={styles.topDetails({ variant, theme })}>
        <div className="left-side">
          {views && (
            <div className="views">
              <CaptionText styleType={"caption-01-bold"}>
                <Show /> {views} VIEWS
              </CaptionText>
            </div>
          )}
          {variant === "case" && timeInMinutes && (
            <div className="time">
              <CaptionText styleType={"caption-01-bold"}>
                <Timer /> {timeFormatter(timeInMinutes)}
              </CaptionText>
            </div>
          )}
        </div>
        {lastUpdated && (
          <div className="right-side">
            <BodyText styleType="body-02-medium">Last updated: </BodyText>
            <CaptionText styleType={"caption-01-bold"}>
              {formatDate(lastUpdated)}
            </CaptionText>
          </div>
        )}
      </div>
      <div css={styles.cardBody({ theme, variant })}>
        <div css={styles.row({ theme, variant })}>
          <div className="row-title">
            <CaptionText styleType={"caption-01-medium"}>
              LEGAL AREA
            </CaptionText>
            {variant === "case" && (
              <CaptionText styleType={"caption-01-medium"} component="p">TOPIC</CaptionText>
            )}
          </div>
          <div className="row-value">
            <BodyText styleType={"body-01-medium"}>{legalArea}</BodyText>
            {variant === "case" && (
              <BodyText styleType={"body-01-medium"}>{topic}</BodyText>
            )}
          </div>
        </div>
        {variant === "dictionary" && (
          <div css={styles.row({ theme, variant })}>
            <div className="row-title">
              <CaptionText styleType={"caption-01-medium"} component="p">TOPIC</CaptionText>
            </div>
            <div className="row-value">
              <BodyText styleType={"body-01-medium"}>{topic}</BodyText>
            </div>
          </div>
        )}
        <div css={styles.row({ theme, variant })}>
            <div className="row-title">
              <CaptionText styleType={"caption-01-medium"} component="p">TAGS</CaptionText>
            </div>
            <div className="row-value">
              {
                tags?.map((tag, tagIndex) => (
                  <Tag key={tagIndex}>{tag}</Tag>
                ))
              }
            </div>
          </div>
          {
            variant === "case" && (
              <div css={styles.row({ theme, variant })}>
              <div className="row-title">
                <CaptionText styleType={"caption-01-medium"}>STATUS</CaptionText>
              </div>
              <div className="row-value">
                {
                 status && (
                    <StatusLabel variant={status}/>
                  )
                }
              <LinkButton title={`${<BodyText styleType={"body-02-medium"}>Reset case progress</BodyText>}`} icon={<IconTrash/>} />
              </div>
            </div>
            )
          }
      </div>
    </div>
  );
};

export default OverviewCard;
