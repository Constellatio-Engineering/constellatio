import { appPaths } from "@constellatio/shared/paths";
import { type Nullable } from "@constellatio/utility-types";
import Link from "next/link";
import { useRouter } from "next/router";
import { type FunctionComponent } from "react";

import * as styles from "./Tag.styles";
import { BodyText } from "../BodyText/BodyText";

export interface ITag 
{
  readonly shouldRenderAsLink?: boolean;
  readonly title: Nullable<string>;
}

const Tag: FunctionComponent<ITag> = ({ shouldRenderAsLink = true, title, }) =>
{
  const router = useRouter();
  const linkDestination = `${appPaths.search}?find=${title}`;

  if(!title)
  {
    return null;
  }

  if(!shouldRenderAsLink)
  {
    return (
      <BodyText
        styleType="body-02-medium"
        component="span"
        css={[styles.tag, styles.inlineTag]}
        onClick={async e =>
        {
          e.stopPropagation();
          e.preventDefault();
          await router.push(linkDestination);
        }}>
        {title}
      </BodyText>
    );
  }

  return (
    <Link
      href={linkDestination}
      css={styles.tag}
      target="_blank nofollow noopener noreferrer"
      onClick={e => e.stopPropagation()}>
      <BodyText styleType="body-02-medium" component="span">
        {title}
      </BodyText>
    </Link>
  );
};

export default Tag;
