import { CompletedStatusLabelIcon, InProgressStatusLabelIcon, NotStartedStatusLabelIcon } from "@/components/Icons/StatusLabelIcons";
import { type CaseProgressState } from "@/db/schema";

import React, { type FunctionComponent, type PropsWithChildren } from "react";

import * as styles from "./StatusLabel.styles";
import { BodyText } from "../BodyText/BodyText";

export interface IStatusLabel extends PropsWithChildren 
{
  // readonly title?: string;
  readonly progressState: CaseProgressState;
}

const StatusLabel: FunctionComponent<IStatusLabel> = ({ progressState }) =>
{
  switch (progressState)
  {
    case "in-progress":
      return (
        <div css={styles.inProgress}>
          <InProgressStatusLabelIcon/>
          <BodyText styleType="body-02-medium" component="p">In Progress</BodyText>
        </div>
      );
    case "completed":
      return (
        <div css={styles.completed}>
          <CompletedStatusLabelIcon/>
          <BodyText styleType="body-02-medium" component="p">Completed</BodyText>
        </div>
      );
    case "not-started":
      return (
        <div css={styles.notStarted}>
          <NotStartedStatusLabelIcon/>
          <BodyText styleType="body-02-medium" component="p">Not Started</BodyText>
        </div>
      );
    default:
      console.log("Invalid status label variant: " + progressState);
      return null;
  }
};

export default StatusLabel;
