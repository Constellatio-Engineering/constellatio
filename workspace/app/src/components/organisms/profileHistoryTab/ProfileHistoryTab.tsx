/* eslint-disable max-lines */
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import Label, { type ILabelProps } from "@/components/atoms/label/Label";
import { SubtitleText } from "@/components/atoms/SubtitleText/SubtitleText";
import EmptyStateCard from "@/components/organisms/emptyStateCard/EmptyStateCard";
import { HistoryItemsSkeleton } from "@/components/organisms/profileHistoryTab/HistoryItemsSkeleton";
import { api } from "@/utils/api";

import { type ViewsHistoryItems } from "@constellatio/api/routers/views.router";
import { env } from "@constellatio/env";
import { appPaths } from "@constellatio/shared/paths";
import { Skeleton, Title } from "@mantine/core";
import { IconReload } from "@tabler/icons-react";
import Link from "next/link";
import { Fragment, type FunctionComponent, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import * as styles from "./ProfileHistoryTab.styles";

function getHistoryItemsGroupedByDate(items: ViewsHistoryItems)
{
  const map = new Map<string, ViewsHistoryItems>();

  for(const item of items)
  {
    const { viewedAt } = item;
    const date = viewedAt.toLocaleDateString("de", {
      day: "2-digit", month: "long", weekday: "short", year: "numeric"
    });

    if(!map.has(date))
    {
      map.set(date, []);
    }

    map.get(date)!.push(item);
  }

  map.forEach((items, key) =>
  {
    map.set(key, items.sort((a, b) => b.viewedAt.getTime() - a.viewedAt.getTime()));
  });

  return map;
}

const initialPageSize = 15;
const loadMorePageSize = 10;

const ProfileHistoryTab: FunctionComponent = () => 
{
  const { inView: isEndOfListInView, ref: endOfListLabelRef } = useInView({
    initialInView: false,
    rootMargin: "30% 0px 30%",
    threshold: 0,
    triggerOnce: false,
  });

  const {
    data: viewsHistoryQuery,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isPending,
    isRefetching,
    refetch,
  } = api.views.getViewsHistory.useInfiniteQuery({
    initialPageSize,
    loadMorePageSize,
  }, {
    getNextPageParam: ((previouslyFetchedPage) => previouslyFetchedPage?.nextCursor),
    initialCursor: null,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: Infinity
  });

  const allItems = useMemo(() =>
  {
    return viewsHistoryQuery?.pages.flatMap((page) => page?.visitedItems ?? []) ?? [];
  }, [viewsHistoryQuery?.pages]);

  const loadedItemsLength = allItems.length;
  const itemsGroupedByDate = useMemo(() => Array.from(getHistoryItemsGroupedByDate(allItems)), [allItems]);

  useEffect(() =>
  {
    if(isEndOfListInView)
    {
      void fetchNextPage();
    }
  }, [fetchNextPage, isEndOfListInView, loadedItemsLength]);

  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div css={styles.titleWrapper}>
        <Title order={3}>Verlauf</Title>
        <Button<"button">
          styleType={"tertiary"}
          onClick={async () => refetch()}
          disabled={isFetching}
          leftIcon={<IconReload size={16}/>}>
          Aktualisieren
        </Button>
      </div>
      <div css={styles.wrapper}>
        {(isPending || isRefetching) ? (
          <Fragment>
            <Skeleton
              height={24}
              width={100}
              style={{ marginBottom: 8 }}
            />
            <HistoryItemsSkeleton amountOfItems={initialPageSize}/>
          </Fragment>
        ) : (
          <Fragment>
            {itemsGroupedByDate.map(([date, items], index) => (
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
                    let href: string;

                    switch (item.itemType)
                    {
                      case "article":
                      {
                        labelVariant = "dictionary";
                        href = `${appPaths.dictionary}/${item.itemId}`;
                        break;
                      }
                      case "case":
                      {
                        labelVariant = "case";
                        href = `${appPaths.cases}/${item.itemId}`;
                        break;
                      }
                      case "forumQuestion":
                      {
                        labelVariant = "forum";
                        href = `${appPaths.forum}/${item.itemId}`;
                        break;
                      }
                    }

                    return (
                      <Link
                        href={href}
                        prefetch={false}
                        key={item.id}
                        title={item.title}
                        css={styles.tableRow}>
                        <BodyText styleType="body-02-medium" component="p" css={styles.timeCell}>
                          {item.viewedAt.toLocaleTimeString("de", { hour: "2-digit", minute: "2-digit" })}
                        </BodyText>
                        <div css={styles.blockType}>
                          <Label variant={labelVariant}/>
                        </div>
                        <BodyText css={styles.blockTitle} styleType="body-01-medium" component="p">
                          {item.title}
                        </BodyText>
                        {item.additionalInfo && (
                          <div css={styles.blockCategoryWrapper}>
                            <BodyText
                              title={item.additionalInfo}
                              css={styles.blockCategory}
                              styleType="body-02-medium"
                              component="p">
                              {item.additionalInfo}
                            </BodyText>
                          </div>
                        )}
                      </Link>
                    );
                  })}
                  {(isFetchingNextPage && (index === itemsGroupedByDate.length - 1)) && (
                    <HistoryItemsSkeleton amountOfItems={loadMorePageSize}/>
                  )}
                </div>
              </div>
            ))}
            <p
              ref={endOfListLabelRef}
              css={[
                styles.endOfListReached,
                (!hasNextPage && !isFetchingNextPage && loadedItemsLength > 0) && styles.endOfListReachedVisible
              ]}>
              Es gibt keine weiteren Einträge. Die Historie ist auf {env.NEXT_PUBLIC_CONTENT_ITEMS_VIEWS_HISTORY_DAYS_LIMIT} Tage begrenzt.
            </p>
            {itemsGroupedByDate.length === 0 && (
              <EmptyStateCard
                text="Du hast dir noch keine Inhalte angeschaut"
                title="Hier siehst du den Verlauf der von dir aufgerufenen Inhalte."
                variant="For-small-areas"
              />
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default ProfileHistoryTab;
