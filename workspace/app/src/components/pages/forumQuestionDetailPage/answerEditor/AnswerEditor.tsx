import ForumListItem from "@/components/pages/forumOverviewPage/forumListItem/ForumListItem";
import { RichtextEditorField } from "@/components/pages/forumOverviewPage/questionModal/RichtextEditorField/RichtextEditorField";
import ForumItemAuthor from "@/components/pages/forumQuestionDetailPage/forumItemAuthor/ForumItemAuthor";
import useUserDetails from "@/hooks/useUserDetails";

import { type Editor } from "@tiptap/react";
import { type FunctionComponent } from "react";

import * as styles from "./AnswerEditor.styles";

type Props = {
  readonly cancelButtonAction?: () => void;
  readonly id?: string;
  readonly mode: {
    editorMode: "edit";
    initialContent: string;
  } | {
    editorMode: "create";
  };
  readonly saveButton: {
    action: (editor: Editor) => Promise<void>;
    buttonText: string;
    clearAfterAction: boolean;
    isLoading: boolean;
  };
};

const AnswerEditor: FunctionComponent<Props> = ({
  cancelButtonAction,
  id,
  mode,
  saveButton
}) =>
{
  const { userDetails } = useUserDetails();

  return (
    <ForumListItem contentWrapperStylesOverrides={styles.postAnswerFormWrapper}>
      <RichtextEditorField
        noMinHeight={true}
        useInitialLoadingState={true}
        value={mode.editorMode === "edit" ? mode.initialContent : ""}
        id={id}
        toolbarLeftContent={userDetails && (
          <ForumItemAuthor
            externalAuthorityDisplayName={null}
            externalAuthorityUrl={null}
            roles={null}
            username={userDetails.displayName}
            userId={userDetails.id}
            profilePicture={userDetails.profilePicture?.url}
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
                await saveButton.action(editor);
              }
              catch (e: unknown)
              {
                return;
              }

              if(saveButton.clearAfterAction)
              {
                editor.commands.clearContent();
              }
            },
            props: {
              disabled: false,
              loading: saveButton.isLoading,
              size: "large",
              styleType: "primary"
            },
            text: saveButton.buttonText
          },
        ]}
      />
    </ForumListItem>
  );
};

export default AnswerEditor;
