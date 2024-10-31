import ProfileLearningTimeBlockHeader from "@/components/molecules/profileLearningTimeBlockHeader/ProfileLearningTimeBlockHeader";

import { type FunctionComponent } from "react";

import * as styles from "./ProfileLearningTimeBlock.styles";

const ProfileLearningTimeBlock: FunctionComponent = () => 
{
  /* const tabs = [{ title: "This week" }, { title: "This month" }, { title: "This year" }];
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);*/
  return (
    <div css={styles.wrapper}>
      <ProfileLearningTimeBlockHeader todaysLearningTime={{ hours: 0, minutes: 0 }} isPending={false}/>
    </div>
  );
};

// File not imported anywhere yet, rule disabled till component is implemented and utilized
// eslint-disable-next-line import/no-unused-modules
export default ProfileLearningTimeBlock;
