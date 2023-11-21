import { paths } from "@/utils/paths";

import Link from "next/link";
import React, { type FunctionComponent } from "react";

import * as styles from "./Tag.styles";
import { BodyText } from "../BodyText/BodyText";

export interface ITag 
{
  readonly title: string;
}

const Tag: FunctionComponent<ITag> = ({ title }) => (
  <Link
    href={`${paths.search}?find=${title}`}
    css={styles.tag}
    target="_blank"
    onClick={e => e.stopPropagation()}>
    <BodyText styleType="body-02-medium" component="p">{title}</BodyText>
  </Link>
);

export default Tag;
