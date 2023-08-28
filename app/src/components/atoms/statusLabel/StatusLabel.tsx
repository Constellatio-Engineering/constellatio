import React, { FunctionComponent, PropsWithChildren } from "react";

import * as styles from "./StatusLabel.styles";
import { BodyText } from "../BodyText/BodyText";
import { CompletedStatusLabelIcon, InProgressStatusLabelIcon, NotStartedStatusLabelIcon } from "@/components/Icons/StatusLabelIcons";

export interface IStatusLabel extends PropsWithChildren {
  variant: "notStarted" | "inProgress" | "completed";
  title?: string
}

const StatusLabel: FunctionComponent<IStatusLabel> = ({ children, title, variant }) => {
  switch (variant) {
    case "inProgress":
      return (
          <div css={styles.inProgress}>
            <InProgressStatusLabelIcon/>
            <BodyText styleType={"body-02-medium"}>{title ?? children}</BodyText>
          </div>
      );
    case "completed":
      return (
        <div css={styles.completed}>
          <CompletedStatusLabelIcon/>
          <BodyText styleType={"body-02-medium"}>{title ?? children}</BodyText>
        </div>
      );
    default:
      return (
        <div css={styles.notStarted}>
          <NotStartedStatusLabelIcon/>
          <BodyText styleType={"body-02-medium"}>{title ?? children}</BodyText>
        </div>
      );
  }
};

export default StatusLabel;
