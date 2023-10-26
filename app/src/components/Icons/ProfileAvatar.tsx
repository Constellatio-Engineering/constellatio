import { type FunctionComponent } from "react";

import { Avatar01 } from "./Avatar-01";
import { Avatar02 } from "./Avatar-02";
import { Avatar03 } from "./Avatar-03";
import { Avatar04 } from "./Avatar-04";
import { Avatar05 } from "./Avatar-05";
import { Avatar06 } from "./Avatar-06";
import { Avatar07 } from "./Avatar-07";

export interface IProfilePictureAvatars 
{
  readonly type:
  | "avatar-01"
  | "avatar-02"
  | "avatar-03"
  | "avatar-04"
  | "avatar-05"
  | "avatar-06"
  | "avatar-07";
}

export const ProfileAvatar: FunctionComponent<{
  readonly type: IProfilePictureAvatars["type"];
}> = ({ type }) =>
  type === "avatar-01" ? (
    <Avatar01/>
  ) : type === "avatar-02" ? (
    <Avatar02/>
  ) : type === "avatar-03" ? (
    <Avatar03/>
  ) : type === "avatar-04" ? (
    <Avatar04/>
  ) : type === "avatar-05" ? (
    <Avatar05/>
  ) : type === "avatar-06" ? (
    <Avatar06/>
  ) : (
    <Avatar07/>
  );
