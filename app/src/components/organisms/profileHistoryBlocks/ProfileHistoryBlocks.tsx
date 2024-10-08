import { BodyText } from "@/components/atoms/BodyText/BodyText";
import Label from "@/components/atoms/label/Label";
import { useLastViewedArticles } from "@/hooks/useLastViewedArticles";
import { useLastViewedCases } from "@/hooks/useLastViewedCases";

import React, { type FunctionComponent } from "react";

import * as styles from "./ProfileHistoryBlocks.styles";

const ProfileHistoryBlocks: FunctionComponent = () => 
{
  const { isLoading: areLastViewedArticlesLoading, lastViewedArticles } = useLastViewedArticles();
  const { isLoading: areLastViewedCasesLoading, lastViewedCases } = useLastViewedCases();

  const lastViewedItems = [...lastViewedCases, ...lastViewedArticles];

  return (
    <div css={styles.wrapper}>
      <div css={styles.list}>
        {lastViewedArticles.map((item, itemIndex) =>
        {
          const lastViewedDate = new Date(item.viewedDate);

          return (
            <div key={item.id} css={styles.tableRow}>
              <BodyText styleType="body-02-medium" component="p" css={styles.timeCell}>
                {lastViewedDate && lastViewedDate.toLocaleTimeString("de", { hour: "2-digit", minute: "2-digit" })}
              </BodyText>
              <div css={styles.blockType}>
                <Label variant={"case"} title={"Lexikon"}/>
              </div>
              <BodyText css={styles.blockTitle} styleType="body-01-medium" component="p">{item?.title}</BodyText>
              <BodyText css={styles.blockCategory} styleType="body-02-medium" component="p">{item?.mainCategoryField?.[0]?.mainCategory}</BodyText>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileHistoryBlocks;
