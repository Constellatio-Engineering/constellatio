import React, { Fragment, type FunctionComponent } from "react";

import * as styles from "./ProfileHistoryBlocks.styles";
import { SubtitleText } from "../atoms/SubtitleText/SubtitleText";
import { BodyText } from "../atoms/BodyText/BodyText";
import Label from "../atoms/label/Label";

interface IProfileHistoryBlocksProps {
  visitedItems: {
    viewedDate: Date;
    documentType:  "dictionary" | "case" | "forum" | "neutral";
    documentName: string;
    documentMainCategory:  string;
  }[];
}

function formatDate(date: Date) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  let suffix = 'th';
  if (day % 10 === 1 && day !== 11) {
    suffix = 'st';
  } else if (day % 10 === 2 && day !== 12) {
    suffix = 'nd';
  } else if (day % 10 === 3 && day !== 13) {
    suffix = 'rd';
  }
  return `${month} ${day}${suffix}, ${year}`;
}

function extractUniqueDays(items :IProfileHistoryBlocksProps['visitedItems']) {
  const dates = items.map(item => {
    const date = item.viewedDate;
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  });
  const uniqueDates = Array.from(new Set(dates));
  return uniqueDates;
}

const ProfileHistoryBlocks: FunctionComponent = () => {
  const visitedItems:IProfileHistoryBlocksProps['visitedItems'] = [
    {
      viewedDate: new Date('2023-03-16T10:00:00Z'),
      documentType: "dictionary",
      documentName: "ArbR 1 | Working with young unicorns",
      documentMainCategory: "Civil law",
    },
    {
      viewedDate: new Date('2023-03-14T14:20:00Z'),
      documentType: "case",
      documentName: "ArbR 2 | Vacation or no vacation",
      documentMainCategory: "Criminal law",
    },
    {
      viewedDate: new Date('2023-03-14T14:20:00Z'),
      documentType: "dictionary",
      documentName: "ArbR 3 | Christmas presents",
      documentMainCategory: "Civil law",
    },
    {
      viewedDate: new Date('2023-03-16T10:00:00Z'),
      documentType: "case",
      documentName: "Brown vs. Board of Education",
      documentMainCategory: "Criminal law",
    },
  ];
  const uniqueDays = extractUniqueDays(visitedItems);
  return (
  <div css={styles.wrapper}>
    <div css={styles.list}>
      {uniqueDays.map((day, index) => (
        <div css={styles.listItem} key={index}>
          <div css={styles.blockDate}><SubtitleText styleType="subtitle-01-medium" component="p">{formatDate(new Date())}</SubtitleText></div>
          <div css={styles.table}>
            {visitedItems.map((item, index) => {
              const isSameDay = day === `${item.viewedDate.getFullYear()}-${String(item.viewedDate.getMonth() + 1).padStart(2, '0')}-${String(item.viewedDate.getDate()).padStart(2, '0')}`;
              if (isSameDay) {
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
              }else { return <></> }
            })}
          </div>
        </div>
)      )}
    </div>
  </div>
)};

export default ProfileHistoryBlocks;
