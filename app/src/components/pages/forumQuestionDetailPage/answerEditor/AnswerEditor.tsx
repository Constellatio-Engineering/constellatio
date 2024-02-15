import ForumListItem from "@/components/pages/forumOverviewPage/forumListItem/ForumListItem";
import { RichtextEditorField } from "@/components/pages/forumOverviewPage/questionModal/RichtextEditorField/RichtextEditorField";
import ForumItemAuthor from "@/components/pages/forumQuestionDetailPage/forumItemAuthor/ForumItemAuthor";
import { usePostAnswer } from "@/hooks/usePostAnswer";
import useUserDetails from "@/hooks/useUserDetails";
import { type GetAnswersSchema } from "@/schemas/forum/getAnswers.schema";

import React, { type FunctionComponent } from "react";

import * as styles from "./AnswerEditor.styles";

type Props = {
  readonly cancelButtonAction?: () => void;
  readonly id?: string;
  readonly parent: GetAnswersSchema["parent"];
};

const AnswerEditor: FunctionComponent<Props> = ({ cancelButtonAction, id, parent }) =>
{
  const { userDetails } = useUserDetails();
  const { isPending: isPostingAnswer, mutateAsync: postAnswer } = usePostAnswer();

  return (
    <ForumListItem contentWrapperStylesOverrides={styles.postAnswerFormWrapper}>
      <RichtextEditorField
        value={""}
        id={id}
        toolbarLeftContent={userDetails && (
          <ForumItemAuthor
            username={userDetails.displayName}
            userId={userDetails.id}
            profilePicture={null}
          />
        )}
        minHeight={100}
        placeholder={"Antwort verfassen..."}
        buttons={[
          cancelButtonAction != null ? {
            action: cancelButtonAction,
            overwriteDisabled: false,
            props: {
              disabled: false,
              size: "large",
              styleType: "secondarySimple"
            },
            text: "Abbrechen"
          } : null,
          {
            action: async (editor) =>
            {
              try
              {
                await postAnswer({
                  parent,
                  text: editor?.getHTML()
                });
              }
              catch (e: unknown)
              {
                return;
              }

              editor.commands.clearContent();
            },
            props: {
              disabled: false,
              loading: isPostingAnswer,
              size: "large",
              styleType: "primary"
            },
            text: "Antwort posten"
          },
        ]}
      />
    </ForumListItem>
  );
};

export default AnswerEditor;
