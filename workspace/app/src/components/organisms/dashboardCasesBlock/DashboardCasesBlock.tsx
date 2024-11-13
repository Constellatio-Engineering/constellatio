import DashboardCasesBlockHeader from "@/components/molecules/dashboardCasesBlockHeader/DashboardCasesBlockHeader";
import DashboardCasesBlockTable from "@/components/molecules/dashboardCasesBlockTable/DashboardCasesBlockTable";

import { type FunctionComponent } from "react";

import * as styles from "./DashboardCasesBlock.styles";

const DashboardCasesBlock: FunctionComponent = () => (
  <div css={styles.wrapper}>
    <div css={styles.innerWrapper}>
      <DashboardCasesBlockHeader/>
      <DashboardCasesBlockTable/>
    </div>
  </div>
);

export default DashboardCasesBlock;
