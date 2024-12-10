import { CompletedStatusLabelIcon, InProgressStatusLabelIcon, NotStartedStatusLabelIcon } from "@/components/Icons/StatusLabelIcons";

import { type CaseProgressState } from "@constellatio/shared/validation";
import { type FunctionComponent, type PropsWithChildren } from "react";

import * as styles from "./StatusLabel.styles";
import { BodyText } from "../BodyText/BodyText";

export interface IStatusLabel extends PropsWithChildren 
{
  readonly overwrites?: {
    readonly completed?: string;
    readonly inProgress?: string;
    readonly upcoming?: string;
  };
  readonly progressState: CaseProgressState | "in-progress" | "upcoming";
  readonly variant?: "case" | "dictionary";
}

const StatusLabel: FunctionComponent<IStatusLabel> = ({ overwrites, progressState, variant = "case" }) =>
{
  switch (progressState)
  {
    case "completing-tests":
    case "solving-case":
    case "in-progress":
      return (
        <div css={styles.inProgress}>
          <InProgressStatusLabelIcon/>
          <BodyText styleType="body-02-medium" component="p" tt="capitalize">
            {overwrites?.inProgress ?? "In Bearbeitung"}
          </BodyText>
        </div>
      );
    case "completed":
      return (
        <div css={styles.completed}>
          <CompletedStatusLabelIcon/>
          <BodyText styleType="body-02-medium" component="p" tt="capitalize">
            {overwrites?.completed ?? (variant === "case" ? "Gelöst" : "Gelesen")}
          </BodyText>
        </div>
      );
    case "not-started":
    case "upcoming":
      return (
        <div css={styles.notStarted}>
          <NotStartedStatusLabelIcon/>
          <BodyText styleType="body-02-medium" component="p" tt="capitalize">
            {overwrites?.upcoming ?? (variant === "case" ? "Offen" : "Ungelesen")}
          </BodyText>
        </div>
      );
    default:
      console.log("Invalid status label variant: " + progressState);
      return null;
  }
};

export default StatusLabel;
