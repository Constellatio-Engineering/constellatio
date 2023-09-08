import React, { type FunctionComponent } from "react";

import * as styles from "./CaseResultsReviewStep.styles";

export interface ICaseResultsReviewStepProps
{

}

const CaseResultsReviewStep: FunctionComponent<ICaseResultsReviewStepProps> = ({  }) => {
  return (
    <div css={styles.wrapper} id="ResultsReviewStepContent">
      CaseResultsReviewStep
    </div>
  );
};

export default CaseResultsReviewStep;
