import { Button } from "@/components/atoms/Button/Button";
import { ExpandIcon } from "@/components/Icons/Expand";
import { RichtextEditorField } from "@/components/pages/forumOverviewPage/questionModal/RichtextEditorField/RichtextEditorField";
import AnswerListItem from "@/components/pages/forumQuestionDetailPage/answerListItem/AnswerListItem";
import ForumItemAuthor from "@/components/pages/forumQuestionDetailPage/forumItemAuthor/ForumItemAuthor";
import { useForumAnswerDetails } from "@/hooks/useForumAnswerDetails";
import { useForumAnswers } from "@/hooks/useForumAnswers";
import { usePostAnswer } from "@/hooks/usePostAnswer";
import useUserDetails from "@/hooks/useUserDetails";
import type { GetAnswersSchema } from "@/schemas/forum/getAnswers.schema";
import { useForumPageStore } from "@/stores/forumPage.store";

import React, { Fragment, type FunctionComponent, useId } from "react";
import { flushSync } from "react-dom";

import * as styles from "./AnswerListItemWithReplies.styles";

type Props = {
  readonly answerId: string;
  readonly parent: GetAnswersSchema["parent"];
};

const AnswerListItemWithReplies: FunctionComponent<Props> = ({ answerId, parent }) =>
{
  const toggleAnswerReplies = useForumPageStore(s => s.toggleAnswerReplies);
  const setRepliesState = useForumPageStore(s => s.setRepliesState);
  const repliesState = useForumPageStore(s => s.getRepliesState(answerId));
  const areRepliesExpanded = useForumPageStore(s => s.getAreRepliesExpanded(answerId));
  const addReplyInputId = useId();
  const { userDetails } = useUserDetails();
  const { isPending: isPostingAnswer, mutate: postAnswer } = usePostAnswer();
  const { data: replies, isLoading: areAnswersLoading } = useForumAnswers({
    parent: {
      answerId,
      parentType: "answer"
    },
    sortBy: "newest"
  });

  const hasReplies = replies?.length != null && replies.length > 0;

  const onAddReplyClick = (): void =>
  {
    flushSync(() =>
    {
      // flushSync is used to ensure that the input is rendered before it is scrolled to
      setRepliesState(answerId, "add");
    });

    const inputWrapper = document.getElementById(addReplyInputId);

    if(!inputWrapper)
    {
      console.error("InputWrapper not found");
      return;
    }

    inputWrapper.scrollIntoView({ behavior: "smooth" });

    const input = Array.from(inputWrapper.getElementsByClassName("tiptap ProseMirror"))[0] as HTMLDivElement | undefined;

    if(input == null)
    {
      // The input will likely not be rendered yet if the replies were not expanded before
      return;
    }

    input?.focus();
  };

  return (
    <div>
      <AnswerListItem
        answerId={answerId}
        parent={parent}>
        <div css={styles.replyWrapper}>
          {hasReplies && (
            <button
              type={"button"}
              css={styles.toggleRepliesButton(areRepliesExpanded)}
              onClick={() => toggleAnswerReplies(answerId)}>
              <p>{replies.length} Antworten</p>
              <ExpandIcon size={22}/>
            </button>
          )}
          <Button<"button">
            styleType={"primary"}
            size={"medium"}
            onClick={onAddReplyClick}>
            Antworten
          </Button>
        </div>
      </AnswerListItem>
      <div css={styles.repliesWrapper}>
        {areRepliesExpanded && (
          <Fragment>
            {replies?.map((reply) => (
              <AnswerListItem
                key={reply.id}
                answerId={reply.id}
                parent={{
                  answerId,
                  parentType: "answer"
                }}
              />
            ))}
            {repliesState === "view" && (
              <div css={styles.test}>
                <Button<"button">
                  styleType={"primary"}
                  size={"large"}
                  onClick={() => setRepliesState(answerId, "add")}>
                  Antworten
                </Button>
              </div>
            )}
            {repliesState === "add" && (
              <RichtextEditorField
                id={addReplyInputId}
                value={""}
                placeholder={"Antwort verfassen..."}
                minHeight={100}
                toolbarLeftContent={userDetails && (
                  <ForumItemAuthor
                    username={userDetails.displayName}
                    userId={userDetails.id}
                    profilePicture={null}
                  />
                )}
                buttons={[
                  {
                    action: () => setRepliesState(answerId, "view"),
                    overwriteDisabled: false,
                    props: {
                      disabled: false,
                      size: "large",
                      styleType: "secondarySimple"
                    },
                    text: "Abbrechen"
                  },
                  {
                    action: (editor) =>
                    {
                      postAnswer({
                        parent: {
                          answerId,
                          parentType: "answer"
                        },
                        text: editor?.getHTML()
                      });
                    },
                    props: {
                      disabled: false,
                      size: "large",
                      styleType: "primary"
                    },
                    text: "Antwort posten"
                  },
                ]}
              />
            )}
            {/* <ForumListItem stylesOverrides={styles.listItemAddReplyButtonWrapper}>
              <button type={"button"} css={styles.listItemAddReplyButton}>
                Antwort verfassen +
              </button>
            </ForumListItem>*/}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default AnswerListItemWithReplies;
