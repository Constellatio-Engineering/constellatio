import React, { Fragment, type FunctionComponent } from "react";

import * as styles from "./ProfileHistoryBlocks.styles";
import { BodyText } from "../atoms/BodyText/BodyText";
import Label from "../atoms/label/Label";
import { SubtitleText } from "../atoms/SubtitleText/SubtitleText";
import EmptyStateCard from "../organisms/emptyStateCard/EmptyStateCard";

interface IProfileHistoryBlocksProps 
{
  visitedItems: Array<{
    documentMainCategory: string;
    documentName: string;
    documentType: "dictionary" | "case" | "forum" | "neutral";
    viewedDate: Date;
  }>;
}

function formatDate(date: Date): string
{
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  let suffix = "th";
  if(day % 10 === 1 && day !== 11) 
  {
    suffix = "st";
  }
  else if(day % 10 === 2 && day !== 12) 
  {
    suffix = "nd";
  }
  else if(day % 10 === 3 && day !== 13) 
  {
    suffix = "rd";
  }
  return `${month} ${day}${suffix}, ${year}`;
}

function extractUniqueDays(items: IProfileHistoryBlocksProps["visitedItems"]): string[]
{
  const dates = items.map(item => 
  {
    const date = item.viewedDate;
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  });
  const uniqueDates = Array.from(new Set(dates));
  return uniqueDates;
}

const ProfileHistoryBlocks: FunctionComponent = () => 
{
  const visitedItems: IProfileHistoryBlocksProps["visitedItems"] = [
    {
      documentMainCategory: "Civil law",
      documentName: "ArbR 1 | Working with young unicorns",
      documentType: "dictionary",
      viewedDate: new Date("2023-03-16T10:00:00Z"),
    },
    {
      documentMainCategory: "Criminal law",
      documentName: "ArbR 2 | Vacation or no vacation",
      documentType: "case",
      viewedDate: new Date("2023-03-14T14:20:00Z"),
    },
    {
      documentMainCategory: "Civil law",
      documentName: "ArbR 3 | Christmas presents",
      documentType: "dictionary",
      viewedDate: new Date("2023-03-14T14:20:00Z"),
    },
    {
      documentMainCategory: "Criminal law",
      documentName: "Brown vs. Board of Education",
      documentType: "case",
      viewedDate: new Date("2023-03-16T10:00:00Z"),
    },
  ];
  // filled states
  // const uniqueDays = extractUniqueDays(visitedItems);
  const uniqueDays = extractUniqueDays([]);
  return (
    <div css={styles.wrapper}>
      <div css={styles.list}>
        {
          uniqueDays?.length > 0 ? 
            (uniqueDays.map((day, index) => (
              <div css={styles.listItem} key={index}>
                <div css={styles.blockDate}><SubtitleText styleType="subtitle-01-medium" component="p">{formatDate(new Date())}</SubtitleText></div>
                <div css={styles.table}>
                  {visitedItems.map((item, index) => 
                  {
                    const isSameDay = day === `${item.viewedDate.getFullYear()}-${String(item.viewedDate.getMonth() + 1).padStart(2, "0")}-${String(item.viewedDate.getDate()).padStart(2, "0")}`;
                    if(isSameDay) 
                    {
                      return (
                        <Fragment key={index}>
                          <div css={styles.tableRow}>
                            <BodyText styleType="body-02-medium" component="p" css={styles.timeCell}>
                              {item.viewedDate?.getHours()}:{item.viewedDate?.getMinutes() > 10 ? item.viewedDate?.getMinutes() : `0${item.viewedDate?.getMinutes()}`}
                            </BodyText>
                            <div css={styles.blockType}>
                              <Label variant={item?.documentType ?? "case"} title={item?.documentType}/>
                            </div>
                            <BodyText css={styles.blockTitle} styleType="body-01-medium" component="p">{item.documentName}</BodyText>
                            <BodyText css={styles.blockCategory} styleType="body-02-medium" component="p">{item.documentMainCategory}</BodyText>
                          </div>
                        </Fragment>
                      );
                    }
                    else { return <></>; }
                  })}
                </div>
              </div>
            ))) : (
              <EmptyStateCard text="Here you can access the view history of cases, dictionary, and forum" title="You haven not viewed any materials yet" variant="For-small-areas"/>
            )
        }
      </div>
    </div>
  );
};

export default ProfileHistoryBlocks;
