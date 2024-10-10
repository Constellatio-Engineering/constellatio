import { Skeleton } from "@mantine/core";
import { Fragment, type FunctionComponent } from "react";

type Props = {
  readonly amountOfItems: number;
};

export const HistoryItemsSkeleton: FunctionComponent<Props> = ({ amountOfItems }) => (
  <Fragment>
    {Array.from({ length: amountOfItems }).map((_, index) => (
      <Skeleton
        key={index}
        height={65}
        width="100%"
        style={{ marginTop: 5 }}
      />
    ))}
  </Fragment>
);
