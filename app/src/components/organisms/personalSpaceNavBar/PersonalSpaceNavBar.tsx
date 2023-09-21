import React, { type FunctionComponent } from "react";

import * as styles from "./PersonalSpaceNavBar.styles";


interface INavTab {
  title: string;
  itemsPerTab: number;
}

interface PersonalSpaceNavBarProps
{
  tabs: Array<INavTab>;
}

const PersonalSpaceNavBar: FunctionComponent<PersonalSpaceNavBarProps> = ({  }) => {
  return (
    <div css={styles.wrapper}>
      PersonalSpaceNavBar
    </div>
  );
};

export default PersonalSpaceNavBar;
