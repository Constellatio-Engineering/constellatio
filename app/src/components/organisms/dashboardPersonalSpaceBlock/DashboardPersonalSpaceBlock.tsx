import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { SwitcherTab } from "@/components/atoms/Switcher-tab/SwitcherTab";
import { Bookmark } from "@/components/Icons/Bookmark";
import { FileWhiteIcon } from "@/components/Icons/FileWhite";
import DashboardPersonalSpaceBlockHeader from "@/components/molecules/dashboardPersonalSpaceBlockHeader/DashboardPersonalSpaceBlockHeader";
import FavoriteCard from "@/components/molecules/favoriteCard/FavoriteCard";
import MaterialCard from "@/components/molecules/materialCard/MaterialCard";
import { Switcher } from "@/components/molecules/Switcher/Switcher";
import useAllFavorites from "@/hooks/useAllFavorites";
import useDocuments from "@/hooks/useDocuments";
import useUploadedFiles from "@/hooks/useUploadedFiles";
import { paths } from "@/utils/paths";

import { Tabs } from "@mantine/core";
import { useRouter } from "next/router";
import React, { type FunctionComponent } from "react";

import * as styles from "./DashboardPersonalSpaceBlock.styles";
import EmptyStateCard from "../emptyStateCard/EmptyStateCard";
import FileViewer from "../fileViewer/FileViewer";

const DashboardPersonalSpaceBlock: FunctionComponent = () => 
{
  const router = useRouter();
  const [switcherValue, setSwitcherValue] = React.useState<"favorites" | "materials">("favorites");
  const { uploadedFilesInAllFolders } = useUploadedFiles();
  const { documentsInAllFolders } = useDocuments();
  const { favoritesList } = useAllFavorites();

  const allUserData = [
    ...uploadedFilesInAllFolders.map((file) => ({ ...file, dataType: "file" }) as const),
    ...documentsInAllFolders.map((document) => ({ ...document, dataType: "document" }) as const)
  ]
    .filter(Boolean)
    .sort((a, b) =>
    {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
  ;

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
                      button={{
                        content: "Alle Fälle ansehen",
                        onClick: async () => router.push(paths.cases)
                      }}
                    />
                  </div>
                )
            }
          </div>
        )}
        {switcherValue === "materials" && (
          <div css={styles.list}>
            {allUserData?.length > 0 ? allUserData.slice(0, 6).map((data) => (
              <>
                {data.dataType === "file" ? (
                  <MaterialCard
                    key={data.id}
                    fileExtension={data.fileExtension}
                    id={data.id}
                    materialType="file"
                    title={data.originalFilename}
                  />
                ) : (
                  <MaterialCard
                    key={data.id}
                    fileExtension="CONSTELLATIO DOC"
                    id={data?.id}
                    materialType="paper"
                    title={data.name}
                  />
                )}
              </>
            )) : (
              <div css={styles.emptyCard}>
                <EmptyStateCard
                  title="Du hast noch keine Dateien hochgeladen"
                  text="Du kannst jetzt eigene Dateien hochladen und in deinem persönlichen Bereich ablegen."
                  variant="For-small-areas"
                  button={{
                    content: "Zu deinen Dateien",
                    onClick: async () => router.push(paths.personalSpace, {
                      pathname: paths.personalSpace,
                      query: { category: "materials" }
                    })
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
      <FileViewer/>
    </div>
  );
};

export default DashboardPersonalSpaceBlock;
