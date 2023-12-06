import MaterialCard from "@/components/molecules/materialCard/MaterialCard";
import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import useDocuments from "@/hooks/useDocuments";
import useUploadedFiles from "@/hooks/useUploadedFiles";
import { paths } from "@/utils/paths";

import { useRouter } from "next/router";
import React, { Fragment, type FunctionComponent } from "react";

import * as favoritesExcerptStyles from "../favoritesExcerpt/FavoritesExcerpt.styles";

const MaterialsExcerpt: FunctionComponent = () =>
{
  const router = useRouter();
  const { uploadedFilesInAllFolders } = useUploadedFiles();
  const { documentsInAllFolders } = useDocuments();

  const allUserData = [
    ...uploadedFilesInAllFolders.map((file) => ({ ...file, dataType: "file" }) as const),
    ...documentsInAllFolders.map((document) => ({ ...document, dataType: "document" }) as const)
  ]
    .filter(Boolean)
    .sort((a, b) =>
    {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  if(!allUserData)
  {
    return null;
  }

  if(allUserData.length === 0)
  {
    return (
      <div css={favoritesExcerptStyles.emptyCard}>
        <EmptyStateCard
          title="Du hast noch keine Dateien hochgeladen oder Constellatio Docs erstellt"
          text="Du kannst jetzt eigene Dateien hochladen und in deinem persönlichen Bereich ablegen oder eigene Dokumente erstellen."
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
    );
  }

  return allUserData.slice(0, 6).map((data) => (
    <Fragment key={data.id}>
      {data.dataType === "file" ? (
        <MaterialCard
          materialsLabelTitle={`.${data.fileExtension}`}
          id={data.id}
          materialType="file"
          title={data.originalFilename}
        />
      ) : (
        <MaterialCard
          materialsLabelTitle="Constellatio Doc"
          materialType="paper"
          title={data.name}
          doc={data}
        />
      )}
    </Fragment>
  ));
};

export default MaterialsExcerpt;
