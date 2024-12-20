import { CaptionText } from "@/components/atoms/CaptionText/CaptionText";
import { PlanePaperIcon } from "@/components/Icons/PlanePaper";

import { type FunctionComponent } from "react";

import * as styles from "./DashboardheaderProgressBar.styles";

const DashboardheaderProgressBar: FunctionComponent = () => 
{
  return (
    <div css={styles.wrapper}>
      <div css={styles.track}>
        <div css={styles.progress({ progress: 11 })}/>
        <div css={styles.progresDescription}>
          <CaptionText styleType="caption-01-bold" component="p"><PlanePaperIcon size={18}/>GUTER ANFANG!</CaptionText>
        </div>
      </div>
      <div css={styles.checkPoints}>
        <span>
          <CaptionText styleType="caption-01-medium" component="p">Ausbauig <br/> 3 / 12 Tagen online </CaptionText>
        </span>
        <span>
          <CaptionText styleType="caption-01-medium" component="p">Ausbaufähig <br/> 3 / 12 Tagen online </CaptionText>
        </span>
        <span>
          <CaptionText styleType="caption-01-medium" component="p">Aushig <br/> 3 / 12 Tagen online </CaptionText>
        </span>
        <span>
          <CaptionText styleType="caption-01-medium" component="p">Aufähig <br/> 3 / 12 Tagen online </CaptionText>
        </span>
      </div>
    </div>
  );
};

// temporary disbale unused eslint rule until we are going to use this comp 
// eslint-disable-next-line import/no-unused-modules
export default DashboardheaderProgressBar;
