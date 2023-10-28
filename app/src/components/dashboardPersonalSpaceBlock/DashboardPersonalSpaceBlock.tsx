import useAllFavorites from "@/hooks/useAllFavorites";
import useUploadedFiles from "@/hooks/useUploadedFiles";

import { Tabs } from "@mantine/core";
import { useRouter } from "next/router";
import React, { type FunctionComponent } from "react";

import * as styles from "./DashboardPersonalSpaceBlock.styles";
import { BodyText } from "../atoms/BodyText/BodyText";
import { SwitcherTab } from "../atoms/Switcher-tab/SwitcherTab";
import DashboardPersonalSpaceBlockHeader from "../dashboardPersonalSpaceBlockHeader/DashboardPersonalSpaceBlockHeader";
import { Bookmark } from "../Icons/Bookmark";
import { FileWhiteIcon } from "../Icons/FileWhite";
import FavoriteCard from "../molecules/favoriteCard/FavoriteCard";
import MaterialCard from "../molecules/materialCard/MaterialCard";
import { Switcher } from "../molecules/Switcher/Switcher";
import EmptyStateCard from "../organisms/emptyStateCard/EmptyStateCard";

const DashboardPersonalSpaceBlock: FunctionComponent = () => 
{
  const [switcherValue, setSwitcherValue] = React.useState<"favorites" | "materials">("favorites");
  const router = useRouter();
  const { uploadedFiles } = useUploadedFiles(null);
  const { favoritesList } = useAllFavorites();
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
        {switcherValue === "favorites" && (
          <div css={styles.list}>
            {
              favoritesList?.length > 0 ?
                favoritesList.slice(0, 6).map((favorite, i) => favorite?.title && (
                  <FavoriteCard
                    key={i}
                    onClick={async () => router.push(`/${favorite?.__typename === "Case" ? "cases" : "dictionary"}/${favorite?.id}`)}
                    title={favorite.title}
                    variant={favorite?.__typename === "Case" ? "case" : "dictionary"}
                  />
                )) : (
                  <div css={styles.emptyCard}>
                    <EmptyStateCard
                      title="Noch keine Favoriten vorhanden"
                      text="Speichere jetzt Fälle oder Lexikonartikel als Favoriten in deinem persönlichen Bereich."
                      variant="For-small-areas"
                    />
                  </div>
                )
            }
          </div>
        )}
        {switcherValue === "materials" && (
          <div css={styles.list}>
            {uploadedFiles?.length > 0 ? 
              uploadedFiles.slice(0, 6).map((material, i) => (
                <MaterialCard
                  key={i}
                  fileExtension={material?.fileExtension}
                  id=""
                  materialType="file"
                  title={material.originalFilename}
                />
              )) : (
                <div css={styles.emptyCard}>
                  <EmptyStateCard
                    title="Du hast noch keine Dateien hochgeladen"
                    text="Du kannst jetzt jetzt eigene Dateien hochladen und in deinem persönlichen Bereich ablegen."
                    variant="For-small-areas"
                  />
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPersonalSpaceBlock;
