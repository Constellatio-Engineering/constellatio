import StatusTableCell from "@/components/atoms/statusTableCell/StatusTableCell";
import TableCell from "@/components/atoms/tableCell/TableCell";
import { ClockIcon } from "@/components/Icons/ClockIcon";
import BookmarkButton from "@/components/organisms/caseBlock/BookmarkButton/BookmarkButton";
import { timeFormatter } from "@/components/organisms/overviewCard/OverviewCard";
import { IGenArticle, IGenCase } from "@/services/graphql/__generated/sdk";
import { appPaths } from "@/utils/paths";
import Link from "next/link";
import React, { type FunctionComponent } from "react";

import * as styles from "./ItemRow.styles";

type Props = {
  item: IGenCase | IGenArticle;
}

export const ItemRow: FunctionComponent<Props> = ({ item }) => {
  return (
    <tr key={item?.id}>
      <td className="primaryCell">
        <Link passHref shallow href={`${variant === "case" ? appPaths.cases : appPaths.dictionary}/${item?.id}`}>
          <TableCell variant="titleTableCell" clickable>
            {item?.title}
          </TableCell>
        </Link>
      </td>
      {variant === "case" && (
        <td>
          {/* THIS WILL GET caseId instead of variant */}
          <Link passHref shallow href={`${variant === "case" ? appPaths.cases : appPaths.dictionary}/${item?.id}`}>
            <StatusTableCell progressState={caseProgress?.progressState || "not-started"}/>
          </Link>
        </td>
      )}
      {!isSmallScreensOnFavorite && item?.__typename === "Case" && (
        <td>
          <Link passHref shallow href={`${variant === "case" ? appPaths.cases : appPaths.dictionary}/${item?.id}`}>
            <TableCell variant="simpleTableCell" icon={<ClockIcon/>}>
              {timeFormatter(item?.durationToCompleteInMinutes ?? 0)}
            </TableCell>
          </Link>
        </td>
      )}
      {tableType === "search" && <td><TableCell variant="simpleTableCell">{item?.legalArea?.legalAreaName}</TableCell></td>}
      {tableType === "favorites" && <td><TableCell variant="simpleTableCell">{item?.legalArea?.legalAreaName}</TableCell></td>}
      <td css={styles.topicCell} title={topicsCombined}>
        <Link passHref shallow href={`${variant === "case" ? appPaths.cases : appPaths.dictionary}/${item?.id}`}>
          <TableCell variant="simpleTableCell">{item?.topic?.[0]?.topicName}</TableCell>
        </Link>
      </td>
      <td css={styles.bookmarkButtonCell}>
        <BookmarkButton
          areAllBookmarksLoading={isLoading}
          isBookmarked={isBookmarked}
          resourceId={item?.id}
          variant={variant}
        />
      </td>
    </tr>
  );
};
