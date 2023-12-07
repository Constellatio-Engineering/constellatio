import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { SwitcherTab } from "@/components/atoms/Switcher-tab/SwitcherTab";
import { Bookmark } from "@/components/Icons/Bookmark";
import { FileWhiteIcon } from "@/components/Icons/FileWhite";
import DashboardPersonalSpaceBlockHeader from "@/components/molecules/dashboardPersonalSpaceBlockHeader/DashboardPersonalSpaceBlockHeader";
import { Switcher } from "@/components/molecules/Switcher/Switcher";
import FavoritesExcerpt from "@/components/organisms/favoritesExcerpt/FavoritesExcerpt";
import MaterialsExcerpt from "@/components/organisms/materialsExcerpt/MaterialsExcerpt";
import useAllFavorites from "@/hooks/useAllFavorites";
import { useAllUserData } from "@/hooks/useAllUserData";

import { Tabs } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./DashboardPersonalSpaceBlock.styles";

const DashboardPersonalSpaceBlock: FunctionComponent = () => 
{
  const [switcherValue, setSwitcherValue] = React.useState<"favorites" | "materials">("favorites");
  const { favoritesList } = useAllFavorites();
  const { allUserData } = useAllUserData();

  return (
    <div css={styles.wrapper}>
      <DashboardPersonalSpaceBlockHeader/>
      <div style={{ flex: "1" }}>
        <div css={styles.switcher}>
          <Switcher
            className="switcher"
            tabStyleOverwrite={{ whiteSpace: "nowrap", width: "auto" }}
            defaultValue={switcherValue}
            size="big">
            <Tabs.List>
              <SwitcherTab value="favorites" onClick={() => setSwitcherValue("favorites")} icon={<Bookmark/>}>
                <BodyText styleType="body-01-medium" component="p">Favoriten</BodyText>
              </SwitcherTab>
              <SwitcherTab value="materials" onClick={() => setSwitcherValue("materials")} icon={<FileWhiteIcon/>}>
                <BodyText styleType="body-01-medium" component="p">Deine Dateien</BodyText>
              </SwitcherTab>
            </Tabs.List>
          </Switcher>
        </div>
        <div css={styles.list}>
          {switcherValue === "favorites" && (
            <FavoritesExcerpt favorites={favoritesList} shouldSortByCreatedAt/>
          )}
          {switcherValue === "materials" && (
            <MaterialsExcerpt allUserData={allUserData}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPersonalSpaceBlock;
