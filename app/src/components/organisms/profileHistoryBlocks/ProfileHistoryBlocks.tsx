import { BodyText } from "@/components/atoms/BodyText/BodyText";
import Label, { type ILabelProps } from "@/components/atoms/label/Label";
import { SubtitleText } from "@/components/atoms/SubtitleText/SubtitleText";
import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import { useLastViewedArticles } from "@/hooks/useLastViewedArticles";
import { useLastViewedCases } from "@/hooks/useLastViewedCases";

import { Skeleton } from "@mantine/core";
import entry from "next/dist/server/typescript/rules/entry";
import React, { type FunctionComponent, useMemo } from "react";

import * as styles from "./ProfileHistoryBlocks.styles";

type HistoryItem = ReturnType<typeof useLastViewedArticles>["lastViewedArticles"][number] | ReturnType<typeof useLastViewedCases>["lastViewedCases"][number];

type DateWithHistoryItems = Map<string, HistoryItem[]>;

function getHistoryItemsGroupedByDate(items: HistoryItem[]): DateWithHistoryItems
{
  const map: DateWithHistoryItems = new Map();

  for(const item of items)
  {
    console.log(item.title + " - " + item.viewedDate.toLocaleTimeString("de"));

    const { viewedDate } = item;
    const date = viewedDate.toLocaleDateString("de", { day: "2-digit", month: "2-digit", year: "numeric" });

    if(!map.has(date))
    {
      map.set(date, []);
    }

    map.get(date)!.push(item);
  }

  map.forEach((items, key) =>
  {
    map.set(key, items.sort((a, b) => b.viewedDate.getTime() - a.viewedDate.getTime()));
  });

  return map;
}

const ProfileHistoryBlocks: FunctionComponent = () => 
{
  const { isLoading: areLastViewedArticlesLoading, lastViewedArticles } = useLastViewedArticles();
  const { isLoading: areLastViewedCasesLoading, lastViewedCases } = useLastViewedCases();
  const isLoading = areLastViewedArticlesLoading || areLastViewedCasesLoading;

  const itemsGroupedByDate = useMemo(() =>
  {
    return Array.from(getHistoryItemsGroupedByDate([...lastViewedCases, ...lastViewedArticles]));
  }, [lastViewedArticles, lastViewedCases]);

  if(isLoading)
  {
    return (
      <div css={styles.wrapper}>
        <Skeleton
          height={24}
          width={100}
          style={{ marginBottom: 8 }}
        />
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton
            key={index}
            height={80}
            width="100%"
            style={{ marginBottom: 8 }}
          />
        ))}
      </div>
    );
  }

  return (
    <div css={styles.wrapper}>
      <div css={styles.list}>
        {itemsGroupedByDate.map(([date, items]) => (
          <div css={styles.listItem} key={date}>
            <div css={styles.blockDate}>
              <SubtitleText styleType="subtitle-01-medium" component="p">
                {date}
              </SubtitleText>
            </div>
            <div css={styles.table}>
              {items.map((item) =>
              {
                let labelVariant: ILabelProps["variant"];

                switch (item.__typename)
                {
                  case "Article":
                  {
                    labelVariant = "dictionary";
                    break;
                  }
                  case "Case":
                  {
                    labelVariant = "case";
                    break;
                  }
                  default:
                  {
                    labelVariant = "neutral";
                  }
                }

                console.log(item.legalArea);

                return (
                  <div key={item.id} css={styles.tableRow}>
                    <BodyText styleType="body-02-medium" component="p" css={styles.timeCell}>
                      {item.viewedDate.toLocaleTimeString("de", { hour: "2-digit", minute: "2-digit" })}
                    </BodyText>
                    <div css={styles.blockType}>
                      <Label variant={labelVariant} title={"Lexikon"}/>
                    </div>
                    <BodyText css={styles.blockTitle} styleType="body-01-medium" component="p">{item?.title}</BodyText>
                    <div css={styles.blockCategoryWrapper}>
                      <BodyText
                        title={item.legalArea?.legalAreaName ?? ""}
                        css={styles.blockCategory}
                        styleType="body-02-medium"
                        component="p">{item?.legalArea?.legalAreaName}
                      </BodyText>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        {itemsGroupedByDate.length === 0 && (
          <EmptyStateCard
            text="Du hast dir noch keine Inhalte angeschaut"
            title="Hier siehst du den Verlauf der von dir aufgerufenen Inhalte."
            variant="For-small-areas"
          />
        )}
      </div>
    </div>
  );
};

export default ProfileHistoryBlocks;
