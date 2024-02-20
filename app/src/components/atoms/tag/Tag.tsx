import { appPaths } from "@/utils/paths";
import { type Nullable } from "@/utils/types";

import Link from "next/link";
import React, { type FunctionComponent } from "react";

import * as styles from "./Tag.styles";
import { BodyText } from "../BodyText/BodyText";

export interface ITag 
{
  readonly isNotClickable?: boolean;
  readonly title: Nullable<string>;
}

const Tag: FunctionComponent<ITag> = ({ isNotClickable, title, }) =>
{
  if(!title)
  {
    return null;
  }

  if(isNotClickable)
  {
    return (
      <BodyText styleType="body-02-medium" component="p" css={styles.tag}>
        {title}
      </BodyText>
    );
  }

  return (
    <Link
      href={`${appPaths.search}?find=${title}`}
      css={styles.tag}
      target="_blank nofollow noopener noreferrer"
      onClick={e => e.stopPropagation()}>
      <BodyText styleType="body-02-medium" component="p">
        {title}
      </BodyText>
    </Link>
  );
};

export default Tag;
