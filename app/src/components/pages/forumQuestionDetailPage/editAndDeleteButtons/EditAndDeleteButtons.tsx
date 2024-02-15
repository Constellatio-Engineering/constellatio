import { Edit } from "@/components/Icons/Edit";
import { Trash } from "@/components/Icons/Trash";
import IconAndTextButton from "@/components/molecules/iconAndTextButton/IconAndTextButton";

import React, { type FunctionComponent } from "react";

import * as styles from "./EditAndDeleteButtons.styles";

type Props = {
  readonly isCurrentUserAuthor: boolean;
  readonly onDelete: () => void;
  readonly onEdit: () => void;
};

const EditAndDeleteButtons: FunctionComponent<Props> = ({ isCurrentUserAuthor, onDelete, onEdit }) => 
{
  if(!isCurrentUserAuthor)
  {
    return null;
  }

  return (
    <div css={styles.actionButtonsWrapper}>
      <IconAndTextButton icon={<Edit/>} text={"Bearbeiten"} onClick={onEdit}/>
      <IconAndTextButton icon={<Trash/>} text={"Löschen"} onClick={onDelete}/>
    </div>
  );
};

export default EditAndDeleteButtons;
