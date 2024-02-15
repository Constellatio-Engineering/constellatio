/* eslint-disable max-lines */
import AnswerEditor from "@/components/pages/forumQuestionDetailPage/answerEditor/AnswerEditor";
import AnswerListItem from "@/components/pages/forumQuestionDetailPage/answerListItem/AnswerListItem";
import AnswersSkeleton from "@/components/pages/forumQuestionDetailPage/answersSkeleton/AnswersSkeleton";
import { useForumAnswers } from "@/hooks/useForumAnswers";
import { type GetAnswersQuestionParent } from "@/schemas/forum/getAnswers.schema";
import { useForumPageStore } from "@/stores/forumPage.store";

import React, { Fragment, type FunctionComponent, useId } from "react";
import { flushSync } from "react-dom";

import * as styles from "./AnswerListItemWithReplies.styles";

type Props = {
  readonly answerId: string;
  readonly authorId: string;
  readonly parent: GetAnswersQuestionParent;
};

const AnswerListItemWithReplies: FunctionComponent<Props> = ({ answerId, authorId, parent }) =>
{
  const setRepliesState = useForumPageStore(s => s.setRepliesState);
  const areRepliesExpanded = useForumPageStore(s => s.getAreRepliesExpanded(answerId));
  const addReplyInputId = useId();
  const { data: replies, isLoading: areRepliesLoading } = useForumAnswers({
    parent: {
      answerId,
      parentType: "answer"
    },
    sortBy: "newest"
  });

  const onAddReplyClick = (): void =>
  {
    flushSync(() =>
    {
      // flushSync is used to ensure that the input is rendered before it is scrolled to
      setRepliesState(answerId, "view");
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
        answerType={"answer"}
        authorId={authorId}
        isMarkedAsCorrect={false}
        numberOfReplies={replies?.length}
        onAddReplyClick={onAddReplyClick}
        parent={parent}
      />
      <div css={styles.repliesWrapper}>
        {areRepliesExpanded && (
          <>
            {areRepliesLoading ? (
              <AnswersSkeleton numberOfSkeletons={2} withReplyButton={false}/>
            ) : (
              <Fragment>
                {replies?.map((reply) => (
                  <AnswerListItem
                    key={reply.id}
                    answerType={"reply"}
                    numberOfReplies={undefined}
                    authorId={reply.author.id}
                    answerId={reply.id}
                    isMarkedAsCorrect={undefined}
                    parent={{
                      answerId,
                      parentType: "answer"
                    }}
                  />
                ))}
                <AnswerEditor
                  id={addReplyInputId}
                  mode={{ editorMode: "create" }}
                  cancelButtonAction={() => setRepliesState(answerId, "closed")}
                  parent={{
                    answerId,
                    parentType: "answer"
                  }}
                />
              </Fragment>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AnswerListItemWithReplies;
