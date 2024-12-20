import { LinkExternalIcon } from "@/components/Icons/LinkExternalIcon";
import { AuthStateContext } from "@/provider/AuthStateProvider";

import { type UserRole } from "@constellatio/db/schema";
import { type Nullable } from "@constellatio/utility-types";
import Image from "next/image";
import Link from "next/link";
import { type FunctionComponent, type ReactNode, useContext } from "react";

import * as styles from "./ForumItemAuthor.styles";
import genericProfileIcon from "../../../../../public/images/icons/generic-user-icon.svg";

type Props = {
  readonly externalAuthorityDisplayName: Nullable<string>;
  readonly externalAuthorityUrl: Nullable<string>;
  readonly profilePicture: Nullable<string>;
  readonly roles: Nullable<UserRole[]>;
  readonly userId: string;
  readonly username: string;
};

const ForumItemAuthor: FunctionComponent<Props> = ({
  externalAuthorityDisplayName,
  externalAuthorityUrl,
  profilePicture,
  roles,
  userId,
  username
}) =>
{
  const authState = useContext(AuthStateContext);

  const isConstellatioAuthority = roles?.some(role => role.identifier === "forum-constellatio-authority");
  const isLegalAuthority = roles?.some(role => role.identifier === "forum-legal-authority");

  let authorityElement: ReactNode | null = null;

  if(isLegalAuthority)
  {
    if(externalAuthorityDisplayName != null && externalAuthorityUrl != null) 
    {
      const fullUrl = externalAuthorityUrl.startsWith("http")
        ? externalAuthorityUrl
        : `https://${externalAuthorityUrl}`;
      authorityElement = (
        <div css={styles.authorityWrapper}>
          <a
            css={styles.legalAuthority}
            href={fullUrl}
            target="_blank"
            rel="noreferrer">
            {externalAuthorityDisplayName}
          </a>
          <LinkExternalIcon size={10}/>
        </div>
      );
    }
    else if(externalAuthorityDisplayName != null) 
    {
      authorityElement = (
        <p css={styles.legalAuthority}>
          <span>{externalAuthorityDisplayName}</span>
        </p>
      );
    }
    else 
    {
      authorityElement = (
        <p css={styles.legalAuthority}>
          <span>Juristische Autorität</span>
        </p>
      );
    }
  }
  else if(isConstellatioAuthority) 
  {
    authorityElement = (
      <p css={styles.constellatioAuthority}>
        <span>Constellatio Mitarbeiter</span>
      </p>
    );
  }

  return (
    <div css={styles.authorWrapper}>
      <Image
        css={styles.profilePicture(profilePicture != null)}
        src={profilePicture ?? genericProfileIcon.src}
        alt="Avatar"
        width={28}
        height={28}
      />
      <div css={styles.authorWrapperUser}>
        <p css={styles.author}>
          <span>{username}</span>
          {authState.isUserLoggedIn && authState.user.id === userId && (
            <span>(Du)</span>
          )}
        </p>
        {authorityElement}
      </div>
    </div>
  );
};

export default ForumItemAuthor;
