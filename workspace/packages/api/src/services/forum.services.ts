/* eslint-disable max-lines */
import { and, asc, count, desc, eq, getTableColumns, inArray, lt, lte, or, type SQL, sql } from "@constellatio/db";
import { db, type DbConnection } from "@constellatio/db/client";
import {
  answerUpvotes,
  correctAnswers,
  forumAnswers,
  forumQuestions,
  forumQuestionsToLegalFields,
  forumQuestionToSubfields,
  forumQuestionToTopics,
  questionUpvotes,
  users
} from "@constellatio/db/schema";
import { type GetAnswersSchema, type GetQuestionsSchema } from "@constellatio/schemas";
import { getProfilePictureUrl } from "~/utils/users";

type GetUpvotesForQuestion = (questionId: string) => Promise<number>;

// eslint-disable-next-line import/no-unused-modules
export const getUpvotesForQuestion: GetUpvotesForQuestion = async (questionId) =>
{
  const [result] = await db
    .select({ count: sql<number>`cast(count(*) as int)` })
    .from(questionUpvotes)
    .where(eq(questionUpvotes.questionId, questionId));

  return result?.count ?? 0;
};

type GetInfiniteQuestionsParams = GetQuestionsSchema & {
  getQuestionsType: "infinite";
  userId: string;
};

type GetQuestionByIdParams = {
  getQuestionsType: "byId";
  questionId: string;
  userId: string;
};

type GetQuestionsParams = GetInfiniteQuestionsParams | GetQuestionByIdParams;

export const getQuestions = async (params: GetQuestionsParams) => // eslint-disable-line @typescript-eslint/explicit-function-return-type
{
  if(params.getQuestionsType === "infinite" && params.questionIds && params.questionIds.length === 0)
  {
    return [];
  }

  const userUpvotesSubQuery = db
    .$with("UserUpvotes")
    .as(db
      .select({ questionId: questionUpvotes.questionId })
      .from(questionUpvotes)
      .where(eq(questionUpvotes.userId, params.userId))
    );

  const subquery = db
    .with(userUpvotesSubQuery)
    .select({
      ...getTableColumns(forumQuestions),
      hasCorrectAnswer: sql<boolean>`case when ${correctAnswers.questionId} is null then false else true end`.as("hasCorrectAnswer"),
      isUpvoted: sql<boolean>`case when ${userUpvotesSubQuery.questionId} is null then false else true end`.as("isUpvoted"),
      upvotesCount: count(questionUpvotes).as("upvotesCount"),
    })
    .from(forumQuestions)
    .leftJoin(userUpvotesSubQuery, eq(forumQuestions.id, userUpvotesSubQuery.questionId))
    .leftJoin(questionUpvotes, eq(forumQuestions.id, questionUpvotes.questionId))
    .leftJoin(correctAnswers, eq(forumQuestions.id, correctAnswers.questionId))
    .where(params.getQuestionsType === "byId"
      ? eq(forumQuestions.id, params.questionId)
      : params.questionIds != null
        ? inArray(forumQuestions.id, params.questionIds)
        : undefined
    )
    .groupBy(forumQuestions.id, userUpvotesSubQuery.questionId, correctAnswers.questionId)
    .as("questionUpvotesSq");

  let queryConditions: SQL<unknown> | undefined;
  let orderBy: SQL | SQL[] = [];

  if(params.getQuestionsType === "infinite")
  {
    const { cursor } = params;

    switch (cursor.cursorType)
    {
      case "newest":
      {
        if(cursor.index != null)
        {
          queryConditions = lte(subquery.index, cursor.index);
        }
        orderBy = desc(subquery.index);
        break;
      }
      case "upvotes":
      {
        if(cursor.upvotes != null)
        {
          if(cursor.index == null)
          {
            queryConditions = lte(subquery.upvotesCount, cursor.upvotes);
          }
          else
          {
            // If the upvotes count is the same, the newer question ranks higher
            queryConditions = or(
              lt(subquery.upvotesCount, cursor.upvotes),
              and(
                eq(subquery.upvotesCount, cursor.upvotes),
                lte(subquery.index, cursor.index)
              )
            );
          }
        }

        orderBy = [desc(subquery.upvotesCount), desc(subquery.index)];
        break;
      }
    }
  }

  const questionsSortedWithAuthor = await db
    .with(subquery)
    .select({
      author: {
        id: users.id,
        username: users.displayName,
      },
      createdAt: subquery.createdAt,
      hasCorrectAnswer: subquery.hasCorrectAnswer,
      id: subquery.id,
      index: subquery.index,
      isUpvoted: subquery.isUpvoted,
      slug: subquery.slug,
      text: subquery.text,
      title: subquery.title,
      updatedAt: subquery.updatedAt,
      upvotesCount: subquery.upvotesCount,
    })
    .from(subquery)
    .where(queryConditions)
    .innerJoin(users, eq(subquery.userId, users.id))
    .orderBy(...(Array.isArray(orderBy) ? orderBy : [orderBy]))
    .limit(params.getQuestionsType === "byId" ? 1 : params.limit + 1);

  const questionIds = questionsSortedWithAuthor.map(question => question.id);

  const questionsWithAdditionalData = questionIds.length > 0 ? await db.query.forumQuestions.findMany({
    where: inArray(forumQuestions.id, questionIds),
    with: {
      answers: {
        columns: {
          id: true,
        },
      },
      forumQuestionToLegalFields: true,
      forumQuestionToSubfields: true,
      forumQuestionToTopics: true,
      user: {
        with: {
          profilePictures: {
            columns: {
              profilePictureSource: true,
              serverFilename: true,
              url: true,
              userId: true,
            },
          }
        }
      }
    }
  }) : [];

  const result = questionsSortedWithAuthor.map(question =>
  {
    let legalFieldId: string | undefined;
    let subfieldsIds: string[] = [];
    let topicsIds: string[] = [];
    let authorProfilePictureUrl: string | null = null;
    let answersCount = 0;

    const questionData = questionsWithAdditionalData.find(q => q.id === question.id);

    if(questionData)
    {
      legalFieldId = questionData.forumQuestionToLegalFields.map(lf => lf.legalFieldId)[0];
      subfieldsIds = questionData.forumQuestionToSubfields.map(sf => sf.subfieldId);
      topicsIds = questionData.forumQuestionToTopics.map(t => t.topicId);
      answersCount = questionData.answers.length ?? 0;

      const _authorProfilePictureUrl = questionData.user?.profilePictures?.[0];

      if(_authorProfilePictureUrl)
      {
        authorProfilePictureUrl = getProfilePictureUrl(_authorProfilePictureUrl);
      }
    }

    return {
      ...question,
      answersCount,
      authorProfilePictureUrl,
      legalFieldId,
      subfieldsIds,
      topicsIds
    };
  });

  return result;
};

type GetInfiniteAnswersParams = GetAnswersSchema & {
  getAnswersType: "all";
  userId: string;
};

type GetAnswerByIdParams = {
  answerId: string;
  getAnswersType: "byId";
  userId: string;
};

type GetAnswersParams = GetInfiniteAnswersParams | GetAnswerByIdParams;

export const getAnswers = async (params: GetAnswersParams) => // eslint-disable-line @typescript-eslint/explicit-function-return-type
{
  const userUpvotesSubQuery = db
    .$with("UserUpvotes")
    .as(db
      .select({ answerId: answerUpvotes.answerId })
      .from(answerUpvotes)
      .where(eq(answerUpvotes.userId, params.userId))
    );

  const countUpvotesSubquery = db
    .with(userUpvotesSubQuery)
    .select({
      ...getTableColumns(forumAnswers),
      isUpvoted: sql<boolean>`case when ${userUpvotesSubQuery.answerId} is null then false else true end`.as("isUpvoted"),
      upvotesCount: count(answerUpvotes.answerId).as("upvotesCount"),
    })
    .from(forumAnswers)
    .leftJoin(userUpvotesSubQuery, eq(forumAnswers.id, userUpvotesSubQuery.answerId))
    .leftJoin(answerUpvotes, eq(forumAnswers.id, answerUpvotes.answerId))
    .where(params.getAnswersType === "byId" ? eq(forumAnswers.id, params.answerId) : undefined)
    .groupBy(forumAnswers.id, userUpvotesSubQuery.answerId)
    .as("answerUpvotesSq");

  const queryConditions: Array<SQL<unknown> | undefined> = [];
  let orderBy: SQL | SQL[] = [];

  if(params.getAnswersType === "all")
  {
    orderBy = desc(countUpvotesSubquery.index);

    switch (params.sortBy)
    {
      case "newest":
      {
        orderBy = asc(countUpvotesSubquery.index);
        break;
      }
      case "upvotes":
      {
        orderBy = [desc(countUpvotesSubquery.upvotesCount), asc(countUpvotesSubquery.index)];
        break;
      }
    }

    switch (params.parent.parentType)
    {
      case "question":
      {
        queryConditions.push(eq(countUpvotesSubquery.parentQuestionId, params.parent.questionId));
        break;
      }
      case "answer":
      {
        queryConditions.push(eq(countUpvotesSubquery.parentAnswerId, params.parent.answerId));
        break;
      }
    }
  }

  const answersSortedWithAuthor = await db
    .with(countUpvotesSubquery)
    .select({
      author: {
        id: users.id,
        username: users.displayName,
      },
      createdAt: countUpvotesSubquery.createdAt,
      id: countUpvotesSubquery.id,
      index: countUpvotesSubquery.index,
      isCorrectAnswer: sql<boolean>`case when ${correctAnswers.answerId} is null then false else true end`.as("isCorrectAnswer"),
      isUpvoted: countUpvotesSubquery.isUpvoted,
      text: countUpvotesSubquery.text,
      updatedAt: countUpvotesSubquery.updatedAt,
      upvotesCount: countUpvotesSubquery.upvotesCount,
    })
    .from(countUpvotesSubquery)
    .where(and(...queryConditions))
    .innerJoin(users, eq(countUpvotesSubquery.userId, users.id))
    .leftJoin(correctAnswers, eq(countUpvotesSubquery.id, correctAnswers.answerId))
    .orderBy(...(Array.isArray(orderBy) ? orderBy : [orderBy]));

  const answerIds = answersSortedWithAuthor.map(answer => answer.id);

  const answersWithAdditionalData = answerIds.length > 0 ? await db.query.forumAnswers.findMany({
    where: inArray(forumAnswers.id, answerIds),
    with: {
      user: {
        with: {
          profilePictures: {
            columns: {
              profilePictureSource: true,
              serverFilename: true,
              url: true,
              userId: true,
            },
          }
        }
      }
    }
  }) : [];

  const result = answersSortedWithAuthor.map(answer =>
  {
    let authorProfilePictureUrl: string | null = null;

    const answerData = answersWithAdditionalData.find(a => a.id === answer.id);

    if(answerData)
    {
      const _authorProfilePictureUrl = answerData.user?.profilePictures?.[0];

      if(_authorProfilePictureUrl)
      {
        authorProfilePictureUrl = getProfilePictureUrl(_authorProfilePictureUrl);
      }
    }

    return {
      ...answer,
      authorProfilePictureUrl,
    };
  });

  return result;
};

export const resetLegalFieldsAndTopicsForQuestion = async (questionId: string, dbConnection: DbConnection): Promise<void> =>
{
  const deleteQuestionToLegalFields = dbConnection.delete(forumQuestionsToLegalFields).where(eq(forumQuestionsToLegalFields.questionId, questionId));
  const deleteQuestionToSubfields = dbConnection.delete(forumQuestionToSubfields).where(eq(forumQuestionToSubfields.questionId, questionId));
  const deleteQuestionToTopics = dbConnection.delete(forumQuestionToTopics).where(eq(forumQuestionToTopics.questionId, questionId));

  await Promise.all([
    deleteQuestionToLegalFields,
    deleteQuestionToSubfields,
    deleteQuestionToTopics
  ]);
};

export const insertLegalFieldsAndTopicsForQuestion = async ({
  dbConnection,
  legalFieldId,
  questionId,
  subfieldsIds,
  topicsIds
}: {
  dbConnection: DbConnection;
  legalFieldId: string;
  questionId: string;
  subfieldsIds: string[];
  topicsIds: string[];
}): Promise<void> =>
{
  const insertQuestionToLegalFields = dbConnection
    .insert(forumQuestionsToLegalFields)
    .values({
      legalFieldId,
      questionId
    });

  const insertQuestionToSubfields = subfieldsIds.length > 0 && dbConnection
    .insert(forumQuestionToSubfields)
    .values(subfieldsIds.map(subfieldId => ({
      questionId,
      subfieldId
    })));

  const insertQuestionToTopics = topicsIds.length > 0 && dbConnection
    .insert(forumQuestionToTopics)
    .values(topicsIds.map(topicId => ({
      questionId,
      topicId
    })));

  await Promise.all([
    insertQuestionToLegalFields,
    insertQuestionToSubfields,
    insertQuestionToTopics
  ].filter(Boolean));
};
