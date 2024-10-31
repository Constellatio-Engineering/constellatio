import { AuthStateContext } from "@/provider/AuthStateProvider";

import { type Nullable } from "@constellatio/utility-types";
import Image from "next/image";
import { type FunctionComponent, useContext } from "react";

import * as styles from "./ForumItemAuthor.styles";
import genericProfileIcon from "../../../../../public/images/icons/generic-user-icon.svg";

type Props = {
  readonly profilePicture: Nullable<string>;
  readonly userId: string;
  readonly username: string;
};

const ForumItemAuthor: FunctionComponent<Props> = ({ profilePicture, userId, username }) =>
{
  const authState = useContext(AuthStateContext);

  return (
    <div css={styles.authorWrapper}>
      <Image
        css={styles.profilePicture(profilePicture != null)}
        src={profilePicture ?? genericProfileIcon.src}
        alt="Avatar"
        width={28}
        height={28}
      />
      <p css={styles.author}>
        <span>{username}</span>
        {authState.isUserLoggedIn && authState.user.id === userId && (
          <span>(Du)</span>
        )}
      </p>
    </div>
  );
};

export default ForumItemAuthor;
