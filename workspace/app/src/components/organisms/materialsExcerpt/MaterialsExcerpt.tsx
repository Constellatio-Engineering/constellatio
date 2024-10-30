import MaterialCard from "@/components/molecules/materialCard/MaterialCard";
import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import * as styles from "@/components/organisms/favoritesExcerpt/FavoritesExcerpt.styles";
import { type AllUserData } from "@/hooks/useAllUserData";

import { appPaths } from "@constellatio/shared/paths";
import { useRouter } from "next/router";
import React, { Fragment, type FunctionComponent } from "react";

type Props = {
  readonly allUserData: AllUserData;
};

const MaterialsExcerpt: FunctionComponent<Props> = ({ allUserData }) =>
{
  const router = useRouter();

  if(!allUserData)
  {
    return null;
  }

  if(allUserData.length === 0)
  {
    return (
      <div css={styles.emptyCard}>
        <EmptyStateCard
          title="Du hast noch keine Dateien hochgeladen oder Constellatio Docs erstellt"
          text="Du kannst jetzt eigene Dateien hochladen und in deinem persönlichen Bereich ablegen oder eigene Dokumente erstellen."
          variant="For-small-areas"
          button={{
            content: "Zu deinen Dateien",
            onClick: async () => router.push(appPaths.personalSpace, {
              pathname: appPaths.personalSpace,
              query: { category: "materials" }
            })
          }}
        />
      </div>
    );
  }

  return (
    <div css={styles.wrapper}>
      {allUserData.slice(0, 6).map((data) => (
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
      ))}
    </div>
  );
};

export default MaterialsExcerpt;
