import { CompletedStatusLabelIcon, InProgressStatusLabelIcon, NotStartedStatusLabelIcon } from "@/components/Icons/StatusLabelIcons";

import React, { type FunctionComponent, type PropsWithChildren } from "react";

import * as styles from "./StatusLabel.styles";
import { BodyText } from "../BodyText/BodyText";

export interface IStatusLabel extends PropsWithChildren 
{
  // readonly title?: string;
  readonly variant: "notStarted" | "inProgress" | "completed";
}

const StatusLabel: FunctionComponent<IStatusLabel> = ({ variant }) => 
{
  switch (variant) 
  {
    case "inProgress":
      return (
        <div css={styles.inProgress}>
          <InProgressStatusLabelIcon/>
          <BodyText styleType="body-02-medium">In Progress</BodyText>
        </div>
      );
    case "completed":
      return (
        <div css={styles.completed}>
          <CompletedStatusLabelIcon/>
          <BodyText styleType="body-02-medium">Completed</BodyText>
        </div>
      );
    default:
      return (
        <div css={styles.notStarted}>
          <NotStartedStatusLabelIcon/>
          <BodyText styleType="body-02-medium">Not Selected</BodyText>
        </div>
      );
  }
};

export default StatusLabel;
