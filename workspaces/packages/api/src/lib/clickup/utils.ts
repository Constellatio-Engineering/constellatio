/* eslint-disable max-lines */
import { allArticles, AllCases, caisySDK, IGenFullArticleFragment, IGenFullCaseFragment } from "@constellatio/cms";
import { db } from "@constellatio/db/client";
import { casesProgress, contentViews, documents, updateUserInCrmQueue, uploadedFiles, User, users, usersToBadges } from "@constellatio/db/schema";
import { env } from "@constellatio/env";
import { allUniversities, FormbricksFeedbackWebhook } from "@constellatio/schemas";
import { Nullable } from "@constellatio/utility-types";
import { createClickupTask } from "~/lib/clickup/tasks/create-task";
import { deleteClickupCustomFieldValue } from "~/lib/clickup/tasks/delete-custom-field-value";
import { findClickupTask } from "~/lib/clickup/tasks/find-task";
import { updateClickupCustomField } from "~/lib/clickup/tasks/update-custom-field";
import { updateClickupTask } from "~/lib/clickup/tasks/update-task";
import {
  type ClickupTask,
  type ClickupTaskCreate,
  type CurrencyCustomFieldInsertProps,
  type CustomFieldInsert,
  type DateCustomFieldInsertProps,
  type DropDownCustomFieldInsertProps,
  type EmailCustomFieldInsertProps,
  type LabelCustomFieldInsertProps,
  type NumberCustomFieldInsertProps,
  type ShortTextCustomFieldInsertProps, type TextCustomFieldInsertProps,
} from "~/lib/clickup/types";

import { createPagesServerClient, type SupabaseClient, type User as SupabaseUser } from "@supabase/auth-helpers-nextjs";
import { AxiosResponse, type AxiosRequestConfig } from "axios";
import { type NextApiRequest, type NextApiResponse } from "next";
import type Stripe from "stripe";
import { stripe } from "~/lib/stripe/stripe";
import { InternalServerError } from "~/utils/serverError";
import { and, countDistinct, eq, getTableColumns, SQL } from "@constellatio/db";

export const clickupRequestConfig: AxiosRequestConfig = {
  headers: {
    Authorization: env.CLICKUP_API_TOKEN
  }
};

export const clickupUserIds = {
  antonia: 82653125,
  kotti: 82573596,
  philipp: 36440925,
  simon: 36495813,
  sophie: 82743954,
  sven: 36495811
};

const clickupUserFeedbackTaskCustomField = {
  doesUserWantToGetFeedback: {
    fieldId: "9582bfb5-e5a7-460a-bf44-90d4ce4e690c",
    formbricksId: "a6c76m5oocw6xp9agf3d2tam",
    options: {
      no: {
        fieldId: "9750dcb2-e229-4c4f-9d5b-48d382ad8c46",
      },
      yes: {
        fieldId: "4c2b0780-a25b-47c9-80f8-a519c86ebaa5",
        formbricksValueIncludes: "clicked"
      }
    }
  },
  relatedCrmUser: {
    fieldId: "d31855ee-0712-4ed2-83ff-88d2b2f0f2a2",
  },
  type: {
    fieldId: "1c2f6661-b94d-4f29-b49c-a806f59dde24",
    formbricksId: "y8ajg0abd6xz26ylnb0j5wph",
    options: {
      bug: {
        fieldId: "bf9fa0f9-4be3-4fa4-a11f-d42bd0d415ca",
        formbricksValueIncludes: "bug",
      },
      inhaltlicherFehler: {
        fieldId: "d9b6e603-32b2-4786-b417-47ed89ea07c7",
        formbricksValueIncludes: "inhaltlich",
      },
      internalErrorCouldNotBeResolved: {
        fieldId: "94b94240-0c1e-4b4f-ae94-2061b2739dd2",
      },
      verbesserungsvorschlag: {
        fieldId: "40d68baa-8e5f-480a-a311-c21f67f88fba",
        formbricksValueIncludes: "verbesserung"
      }
    }
  },
  url: {
    fieldId: "8949b727-f65a-454c-aaca-e0bc71feb5a0",
  },
  userAgent: {
    fieldId: "638fd05e-b47c-489b-9dfb-146063624aee",
  },
  userId: {
    fieldId: "86a0d9a3-718a-4c4c-82ae-4f61ddc09977",
  },
  webhookData: {
    fieldId: "c6427d9d-7ea1-42d8-b26e-29eda21896cb",
  }
} as const;

const clickupContentTaskCustomField = {
  caisyId: {
    fieldId: "910257b5-05f5-4d4e-b173-8a7016b331c2",
  },
  legalArea: {
    fieldId: "909a5da9-8873-4684-a00f-4c48ca8cf191",
    options: {
      arbeitsrecht: {
        caisyId: "583cea61-204c-414c-8ac6-da93940c6551",
        fieldId: "15f66635-e4f9-481e-b805-1bdb06a48bed"
      },
      bereicherungsrecht: {
        caisyId: "b86096da-665a-4f17-89ab-e55c89a81b69",
        fieldId: "a4d1987e-920b-4877-9216-6dfb26022188"
      },
      bgbAt: {
        caisyId: "0dc9368e-06f3-4ca8-b1ef-f9c3e4de5843",
        fieldId: "42715149-f6f6-43ad-a1a3-9c84dcd493e0"
      },
      deliktsrecht: {
        caisyId: "fad05f12-a290-40fd-b2c7-5647dd6089d6",
        fieldId: "f2e9505e-5f64-48ae-8d53-46d6a2707854"
      },
      demofall: {
        caisyId: "421268fa-b5cf-481c-b5e3-b073b9d4c8cb",
        fieldId: "d6915e48-6b82-45bb-aba2-560615929ba2"
      },
      ebv: {
        caisyId: "c290de11-367d-4bc2-ad39-397a4e9c3efd",
        fieldId: "0bb0f783-d53b-4aab-a465-dc8e889f44c9"
      },
      einfuehrungsfall: {
        caisyId: "198c5ef9-f544-4f76-973c-a5d05f24de65",
        fieldId: "df61ff5f-c10c-47d1-aca8-9bee81d438fe"
      },
      erbrecht: {
        caisyId: "f3fd94a7-fc42-4e87-ab0b-10ae173e1045",
        fieldId: "1fa3dd63-476b-4d9b-957a-f04f0c38e4cb"
      },
      examensklausur: {
        caisyId: "d4818d37-36f7-4371-b444-f777e7d74148",
        fieldId: "fa131fb3-1d3e-42e8-98c4-d5b5d4dcc3ec"
      },
      familienrecht: {
        caisyId: "7f005e78-7460-4199-a6ca-f951dda5cdfd",
        fieldId: "642a5be7-4157-48dc-a78a-24b655f7f725"
      },
      geschaeftsfuehrungOhneAuftrag: {
        caisyId: "5fb48211-4c07-4f1f-9425-de49177d292b",
        fieldId: "2f81252e-bcee-4b77-bc70-d408eb88a818"
      },
      gesellschaftsrecht: {
        caisyId: "971e7857-67db-4369-a80c-64e167554143",
        fieldId: "2bdac5e1-887e-4049-9587-6229525d6fba"
      },
      handelsrecht: {
        caisyId: "83f5305b-1836-4080-9960-f648b8258132",
        fieldId: "329f0809-3c94-4dcd-baa7-d01e098d0c50"
      },
      immobiliarsachenrecht: {
        caisyId: "bbec813c-2982-4143-8633-7791f0b932b3",
        fieldId: "1e7931c1-0d92-473f-a170-7b47ee9f240d"
      },
      kaufrecht: {
        caisyId: "d387e999-a5fb-4ceb-b2e8-4a9a0d056742",
        fieldId: "35a92a9c-acff-4ffd-af2d-215bdadf3b4a"
      },
      klagearten: {
        caisyId: "9fcfbdba-9f91-47df-bd6f-b4b02004a019",
        fieldId: "94af72c7-671d-4702-beaf-7ca92a525c83"
      },
      kreditsicherungsrecht: {
        caisyId: "6232301b-609f-42b8-8a3e-dc64e9ba3e1b",
        fieldId: "5a43bdc4-8a2c-49d5-95a2-a73b3fcac5fe"
      },
      mobiliarsachenrecht: {
        caisyId: "078936e7-cf00-46a5-ac01-29a0c9510fde",
        fieldId: "ad65c3a5-77fa-4ba4-8325-bc18a2811ee8"
      },
      rechtsschutz: {
        caisyId: "241587a8-cc09-483d-bda4-6eb1139858a0",
        fieldId: "5058c426-e175-461b-ab91-c9124823a13c"
      },
      schadensrecht: {
        caisyId: "b10b2189-e857-49b3-9d32-2c95ad8e22e0",
        fieldId: "3834cc3f-207f-4fb9-9917-3bfd93d57727"
      },
      schuldrechtAt: {
        caisyId: "bf906e5d-0596-4cc0-8f61-61c67c8b0393",
        fieldId: "9962157b-7385-4f54-bfa7-d341b72314c2"
      },
      zpo: {
        caisyId: "1d6af5ed-e936-4d32-9f64-d63bb4003535",
        fieldId: "6048361d-953f-4c0f-8d57-deb1a90ddd4d"
      }
    }
  },
  type: {
    fieldId: "8761ad79-1901-4de2-8630-6b52f7f0dc5e",
    options: {
      article: {
        fieldId: "9839f575-b48d-4627-bc9d-8b1dbf987c19"
      },
      legalCase: {
        fieldId: "29d1821c-bd97-4e9a-ac6a-129c307ab599"
      },
    }
  }
} as const;

export const clickupCrmCustomField = {
  aboStatus: {
    fieldId: "c5b525cc-e7d9-46e7-af4f-46681d072a4a",
    options: {
      active: {
        fieldId: "c4b9d5b8-4702-4475-9b3b-a7baf7b5cdda"
      },
      canceled: {
        fieldId: "be0a0a52-5136-4dbf-bed7-de3cd4cdb26e"
      },
      incomplete: {
        fieldId: "540bf2c4-96d2-40b5-870b-c98bcc067442"
      },
      incompleteExpired: {
        fieldId: "1d4c6c0d-10ce-4250-8f28-ab9240dfd410"
      },
      overdue: {
        fieldId: "aa52ca6b-e88f-4f2f-90bc-f086a474ecb1"
      },
      paused: {
        fieldId: "8faca5c5-ef14-4ae4-a90b-1a445c3f513a"
      },
      trialing: {
        fieldId: "1e861e9f-7d9d-4bc5-80f8-fe3f5efdbfa8"
      },
      unpaid: {
        fieldId: "841e35b8-03f0-4a42-aa7d-8b6a9847a439"
      }
    }
  },
  amountOfBades: {
    fieldId: "07baeb31-6f79-4612-8d67-ad92d86c8323"
  },
  amountOfCreatedDocs: {
    fieldId: "2ecde5fd-abee-4838-adaa-41b943bc65eb"
  },
  amountOfPayments: {
    fieldId: "00d77223-cfe7-4247-a5b1-460345531511"
  },
  amountOfSolvedCases: {
    fieldId: "a097b040-35d9-45f9-bb3f-ac42c8cd8a52"
  },
  amountOfUploadedFiles: {
    fieldId: "1fb36ff5-d881-41fe-ad38-7f7a6b196845"
  },
  amountOfViewedArticles: {
    fieldId: "8dae3e42-35f8-4167-9956-a34caccbd246"
  },
  amountOfViewedCases: {
    fieldId: "f2ca99c2-7302-4a35-830a-9a2cda31ba68"
  },
  category: {
    fieldId: "adebe618-2be5-4ae2-8437-0673b1f44321",
    options: {
      student: {
        fieldId: "846b2da8-2848-4ee0-96ea-18b722eb12bb"
      },
    }
  },
  email: {
    fieldId: "99d92dc5-7c51-4a8f-ade7-e0b7d64c4576"
  },
  memberUntil: {
    fieldId: "5a3ada95-dbf3-4e63-aceb-595a9a27afda"
  },
  paymentInterval: {
    fieldId: "03e3c6fd-fcd0-4219-a410-d04b5db45b76",
    options: {
      daily: {
        fieldId: "328fdb97-4e35-4eb6-b0a2-8aa43425965e"
      },
      monthly: {
        fieldId: "4acd073f-7527-4aa0-a7c7-c2ddd76e788c"
      },
      weekly: {
        fieldId: "a2d1107a-755e-4594-b191-7825021f075c"
      },
      yearly: {
        fieldId: "ac8889a3-acab-4c3a-89cd-400c551f4d03"
      }
    }
  },
  paymentMethod: {
    fieldId: "6667ace2-e8e3-414a-8272-de6b84e20d60"
  },
  semester: {
    fieldId: "37863c7b-36db-44e8-9215-e0e108b91db6"
  },
  signedUpDate: {
    fieldId: "02410e16-49aa-4a00-ab45-e07bfb7caf85"
  },
  totalMoneySpent: {
    fieldId: "dbdbc7f5-3f9f-4e7b-b593-bfc77cba9964"
  },
  university: {
    fieldId: "b8e29f58-cb77-4519-8f12-dfc8117f90e8",
  },
  userId: {
    fieldId: "86a0d9a3-718a-4c4c-82ae-4f61ddc09977",
  },
  willSubscriptionContinue: {
    fieldId: "ac9f2943-408f-44a5-9688-b2ae5d3cbc4d",
    options: {
      no: {
        fieldId: "4fe173c9-3ecf-4e35-b267-0771674ae363"
      },
      yes: {
        fieldId: "ae86c637-c0a9-45d1-9924-7bbb270ca732"
      }
    }
  }
} as const;

export const getUsersWithActivityStats = async (query?: SQL) =>
{
  const articlesViews = db
    .select({
      itemId: contentViews.contentItemId,
      userId: contentViews.userId,
    })
    .from(contentViews)
    .where(eq(contentViews.contentItemType, "article"))
    .as("articlesViewsSubquery");

  const casesViews = db
    .select({
      itemId: contentViews.contentItemId,
      userId: contentViews.userId,
    })
    .from(contentViews)
    .where(eq(contentViews.contentItemType, "case"))
    .as("casesViewsSubquery");

  return db
    .select({
      ...getTableColumns(users),
      completedBadges: countDistinct(usersToBadges.badgeId),
      completedCases: countDistinct(casesProgress.caseId),
      createdDocuments: countDistinct(documents.id),
      uploadedFiles: countDistinct(uploadedFiles.id),
      viewedArticles: countDistinct(articlesViews.itemId),
      viewedCases: countDistinct(casesViews.itemId)
    })
    .from(users)
    .where(query)
    .leftJoin(documents, eq(users.id, documents.userId))
    .leftJoin(uploadedFiles, eq(users.id, uploadedFiles.userId))
    .leftJoin(usersToBadges, eq(users.id, usersToBadges.userId))
    .leftJoin(articlesViews, eq(users.id, articlesViews.userId))
    .leftJoin(casesViews, eq(users.id, casesViews.userId))
    .leftJoin(casesProgress,
      and(
        eq(casesProgress.progressState, "completed"),
        eq(users.id, casesProgress.userId)
      )
    )
    .groupBy(users.id);
};

export type UserWithActivityStats = Awaited<ReturnType<typeof getUsersWithActivityStats>>[number];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getCrmDataForUser = async (userIdOrData: string | UserWithActivityStats, supabaseServerClient: SupabaseClient<never, "public", never>) =>
{
  let user: UserWithActivityStats;

  if(typeof userIdOrData === "string")
  {
    const [getUserDataResult] = await getUsersWithActivityStats(eq(users.id, userIdOrData));

    if(getUserDataResult == null)
    {
      console.warn("User not found in database:", userIdOrData);
      return null;
    }

    user = getUserDataResult;
  }
  else
  {
    user = userIdOrData;
  }

  const { data: { user: supabaseUserData } } = await supabaseServerClient.auth.admin.getUserById(user.id);

  if(!supabaseUserData)
  {
    console.warn("User not found in Supabase Auth:", user.id);
    return null;
  }

  const userSubscriptionId = user.subscriptionId;
  const userStripeCustomerId = user.stripeCustomerId;
  const allInvoices: Stripe.Invoice[] = [];
  let subscriptionData: Stripe.Response<Stripe.Subscription> | null = null;
  let defaultPaymentMethod: Stripe.PaymentMethod | null = null;

  if(userSubscriptionId != null)
  {
    subscriptionData = await stripe.subscriptions.retrieve(userSubscriptionId);

    const defaultPaymentMethodIdOrObject = subscriptionData.default_payment_method;

    if(defaultPaymentMethodIdOrObject != null)
    {
      if(typeof defaultPaymentMethodIdOrObject === "string")
      {
        defaultPaymentMethod = await stripe.paymentMethods.retrieve(defaultPaymentMethodIdOrObject);
      }
      else
      {
        defaultPaymentMethod = defaultPaymentMethodIdOrObject;
      }
    }
  }

  if(userStripeCustomerId != null)
  {
    if(defaultPaymentMethod == null)
    {
      const customerData = await stripe.customers.retrieve(userStripeCustomerId);

      if(!customerData.deleted)
      {
        const defaultPaymentMethodIdOrObject = customerData.invoice_settings.default_payment_method;

        if(defaultPaymentMethodIdOrObject != null)
        {
          defaultPaymentMethod = typeof defaultPaymentMethodIdOrObject === "string" ? await stripe.paymentMethods.retrieve(defaultPaymentMethodIdOrObject) : defaultPaymentMethodIdOrObject;
        }
      }
    }

    let hasMore = true;
    let lastInvoiceId: string | undefined;

    while(hasMore)
    {
      const _invoices = await stripe.invoices.list({
        customer: userStripeCustomerId,
        limit: 100,
        starting_after: lastInvoiceId,
        status: "paid"
      });

      if(_invoices == null)
      {
        break;
      }

      allInvoices.push(..._invoices.data);
      hasMore = _invoices.has_more;

      if(hasMore)
      {
        lastInvoiceId = _invoices.data[_invoices.data.length - 1]?.id;
      }
    }
  }

  const crmData = getUserCrmData({
    allInvoices,
    defaultPaymentMethod,
    subscriptionData,
    supabaseUserData,
    user
  });

  return ({
    crmData,
    userData: user
  });
};

export const getUpdateUsersCrmDataPromises = ({
                                                existingCrmUser,
                                                userWithCrmData
                                              }: {
  existingCrmUser: ClickupTask;
  userWithCrmData: NonNullable<Awaited<ReturnType<typeof getCrmDataForUser>>>;
}) =>
{
  const updateUsersPromises: Array<Promise<AxiosResponse>> = [];

  const { crmData, userData } = userWithCrmData;

  if(existingCrmUser.name !== (userData.firstName + " " + userData.lastName))
  {
    updateUsersPromises.push(updateClickupTask(existingCrmUser.id!, { name: userData.firstName + " " + userData.lastName }));
  }

  crmData.custom_fields.forEach((field) =>
  {
    if(field.id === clickupCrmCustomField.category.fieldId)
    {
      // Skip category field because it's not supposed to be updated automatically after creation
      return;
    }

    const existingCrmField = existingCrmUser.custom_fields?.find((existingField) => existingField.id === field.id);

    if(!existingCrmField)
    {
      updateUsersPromises.push(updateClickupCustomField({
        taskId: existingCrmUser.id,
        updatedCustomField: field
      }));
      return;
    }

    switch (existingCrmField.type)
    {
      case "drop_down":
      {
        const currentlySelectedOption = existingCrmField.value != null ? existingCrmField.type_config.options[existingCrmField.value] : null;
        const currentlySelectedOptionId = currentlySelectedOption?.id;

        if(field.value == null && currentlySelectedOptionId != null)
        {
          updateUsersPromises.push(deleteClickupCustomFieldValue({
            fieldId: field.id,
            taskId: existingCrmUser.id
          }));
        }
        else if(currentlySelectedOptionId !== field.value)
        {
          updateUsersPromises.push(updateClickupCustomField({
            taskId: existingCrmUser.id,
            updatedCustomField: field
          }));
        }
        break;
      }
      case "labels":
      {
        throw new Error("Updating labels is not supported yet");
      }
      case "number":
      case "date":
      case "currency":
      {
        if(field.value == null && existingCrmField.value != null)
        {
          updateUsersPromises.push(deleteClickupCustomFieldValue({
            fieldId: field.id,
            taskId: existingCrmUser.id
          }));
        }
        else if(field.value != null && Number(existingCrmField.value) !== field.value)
        {
          updateUsersPromises.push(updateClickupCustomField({
            taskId: existingCrmUser.id,
            updatedCustomField: field
          }));
        }
        break;
      }
      case "email":
      case "text":
      case "short_text":
      {
        if(existingCrmField.value !== field.value)
        {
          updateUsersPromises.push(updateClickupCustomField({
            taskId: existingCrmUser.id,
            updatedCustomField: field
          }));
        }
        break;
      }
    }
  });

  return updateUsersPromises;
};

type CalculateMembershipEndDateProps = (subscriptionData: Stripe.Response<Stripe.Subscription>) => {
  isCanceled: true;
  subscriptionEndDate: Date;
} | {
  isCanceled: false;
};

const calculateSubscriptionFuture: CalculateMembershipEndDateProps = (subscriptionData) =>
{
  const {
    cancel_at,
    cancel_at_period_end,
    current_period_end,
    default_payment_method,
    ended_at,
    status,
    trial_end
  } = subscriptionData;

  switch (status)
  {
    case "active":
      if(cancel_at_period_end)
      {
        return ({
          isCanceled: true,
          subscriptionEndDate: new Date(cancel_at! * 1000)
        });
      }
      else
      {
        return { isCanceled: false };
      }
    case "canceled":
      return ({
        isCanceled: true,
        subscriptionEndDate: new Date((ended_at || cancel_at)! * 1000)
      });
    case "trialing":
      if(cancel_at)
      {
        return ({
          isCanceled: true,
          subscriptionEndDate: new Date(cancel_at * 1000)
        });
      }
      else if(!default_payment_method)
      {
        return ({
          isCanceled: true,
          subscriptionEndDate: new Date(trial_end! * 1000)
        });
      }
      else
      {
        return { isCanceled: false };
      }
    case "incomplete":
    case "incomplete_expired":
    case "unpaid":
    case "past_due":
      return ({
        isCanceled: true,
        subscriptionEndDate: new Date(current_period_end! * 1000)
      });
    case "paused":
    default:
      return { isCanceled: false };
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getClickupCrmUserByUserId = async (userId: Nullable<string>): Promise<ClickupTask[]> =>
{
  if(!userId)
  {
    return [];
  }

  return findClickupTask(env.CLICKUP_CRM_LIST_ID, {
    custom_fields: [{
      field_id: clickupCrmCustomField.userId.fieldId,
      operator: "=",
      value: userId,
    }],
    include_closed: true,
  });
};

type GetUserFeedbackTaskCrmData = (
  webhookBody: FormbricksFeedbackWebhook["data"],
  user: Nullable<User>,
  linksToTaskId: Nullable<string>
) => Required<Pick<ClickupTaskCreate, "name" | "due_date" | "custom_fields" | "links_to" | "description">>;

export const getUserFeedbackTaskCrmData: GetUserFeedbackTaskCrmData = (webhookBody, user, linksToTaskId) =>
{
  const feedbackType = webhookBody.data[clickupUserFeedbackTaskCustomField.type.formbricksId]?.toLocaleLowerCase();

  let typeCustomFieldValue: string;

  if(feedbackType?.includes(clickupUserFeedbackTaskCustomField.type.options.bug.formbricksValueIncludes))
  {
    typeCustomFieldValue = clickupUserFeedbackTaskCustomField.type.options.bug.fieldId;
  }
  else if(feedbackType?.includes(clickupUserFeedbackTaskCustomField.type.options.inhaltlicherFehler.formbricksValueIncludes))
  {
    typeCustomFieldValue = clickupUserFeedbackTaskCustomField.type.options.inhaltlicherFehler.fieldId;
  }
  else if(feedbackType?.includes(clickupUserFeedbackTaskCustomField.type.options.verbesserungsvorschlag.formbricksValueIncludes))
  {
    typeCustomFieldValue = clickupUserFeedbackTaskCustomField.type.options.verbesserungsvorschlag.fieldId;
  }
  else
  {
    console.error("Unknown feedback type", feedbackType, webhookBody);
    typeCustomFieldValue = clickupUserFeedbackTaskCustomField.type.options.internalErrorCouldNotBeResolved.fieldId;
  }

  const typeCustomFieldData: DropDownCustomFieldInsertProps = {
    id: clickupUserFeedbackTaskCustomField.type.fieldId,
    value: typeCustomFieldValue
  };

  const doesUserWantFeedbackResponse = webhookBody.data[clickupUserFeedbackTaskCustomField.doesUserWantToGetFeedback.formbricksId]?.toLocaleLowerCase();

  const doesUserWantFeedbackCustomFieldData: DropDownCustomFieldInsertProps = {
    id: clickupUserFeedbackTaskCustomField.doesUserWantToGetFeedback.fieldId,
    value: doesUserWantFeedbackResponse?.includes(clickupUserFeedbackTaskCustomField.doesUserWantToGetFeedback.options.yes.formbricksValueIncludes) ?
      clickupUserFeedbackTaskCustomField.doesUserWantToGetFeedback.options.yes.fieldId :
      clickupUserFeedbackTaskCustomField.doesUserWantToGetFeedback.options.no.fieldId
  };

  const userIdCustomFieldData: ShortTextCustomFieldInsertProps = {
    id: clickupUserFeedbackTaskCustomField.userId.fieldId,
    value: webhookBody.person.userId
  };

  const userAgentCustomFieldData: TextCustomFieldInsertProps = {
    id: clickupUserFeedbackTaskCustomField.userAgent.fieldId,
    value: Object.entries(webhookBody.meta.userAgent).map(([key, value]) => `${key}: ${value}`).join("\n")
  };

  const urlCustomFieldData: ShortTextCustomFieldInsertProps = {
    id: clickupUserFeedbackTaskCustomField.url.fieldId,
    value: webhookBody.meta.url
  };

  const webhookDataCustomFieldData: TextCustomFieldInsertProps = {
    id: clickupUserFeedbackTaskCustomField.webhookData.fieldId,
    value: `JSON: ${JSON.stringify(webhookBody, null, 2)}`
  };

  const userName = user ? `${user.firstName} ${user.lastName}` : "unbekannter User";

  const feedback = Object.entries(webhookBody.data)
    .filter(Boolean)
    .filter(([_key, value]) => value !== "")
    .filter(([key]) => key !== clickupUserFeedbackTaskCustomField.doesUserWantToGetFeedback.formbricksId)
    .filter(([key]) => key !== clickupUserFeedbackTaskCustomField.type.formbricksId)
    .map(([_key, value]) => `- ${value}`)
    .join("\n");

  return ({
    // We don't need to assign a user here since this can be done via clickup automations
    // assignees: [clickupUserIds.sven],
    custom_fields: [
      doesUserWantFeedbackCustomFieldData,
      userIdCustomFieldData,
      urlCustomFieldData,
      userAgentCustomFieldData,
      typeCustomFieldData,
      webhookDataCustomFieldData
    ],
    description: `${userName} hat folgendes Feedback gegeben:\n${feedback}`,
    due_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).getTime(),
    links_to: linksToTaskId ?? null,
    name: `Feedback von ${userName}`,
  });
};

type GetContentTaskCrmData = (content: AllCases[number] | allArticles[number]) => Required<Pick<ClickupTaskCreate, "name" | "due_date" | "custom_fields">>;

export const getContentTaskCrmData: GetContentTaskCrmData = (content) =>
{
  const caisyIdCustomFieldData: ShortTextCustomFieldInsertProps = {
    id: clickupContentTaskCustomField.caisyId.fieldId,
    value: content.id
  };

  const typeCustomFieldData: DropDownCustomFieldInsertProps = {
    id: clickupContentTaskCustomField.type.fieldId,
    value: content.__typename === "Case" ? clickupContentTaskCustomField.type.options.legalCase.fieldId : clickupContentTaskCustomField.type.options.article.fieldId
  };

  const legalAreaId = Object.values(clickupContentTaskCustomField.legalArea.options).find((legalArea) => legalArea.caisyId === content.legalArea?.id)?.fieldId;

  const legalAreaCustomFieldData: LabelCustomFieldInsertProps = {
    id: clickupContentTaskCustomField.legalArea.fieldId,
    value: legalAreaId == null ? [] : [legalAreaId]
  };

  return ({
    custom_fields: [
      caisyIdCustomFieldData,
      typeCustomFieldData,
      legalAreaCustomFieldData
    ],
    due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).getTime(),
    name: content.title ?? "Error: No title",
  });
};

type GetUserCrmData = (props: {
  allInvoices: Stripe.Invoice[];
  defaultPaymentMethod: Stripe.PaymentMethod | null;
  subscriptionData: Stripe.Response<Stripe.Subscription> | null;
  supabaseUserData: SupabaseUser;
  user: UserWithActivityStats;
}) => {
  custom_fields: CustomFieldInsert[];
  name: string;
};

export const getUserCrmData: GetUserCrmData = ({
  allInvoices,
  defaultPaymentMethod,
  subscriptionData,
  supabaseUserData,
  user
}): Required<Pick<ClickupTaskCreate, "name" | "custom_fields">> =>
{
  let stripeSubscriptionStatusCustomFieldId: string | undefined;

  if(subscriptionData?.status != null)
  {
    switch (subscriptionData.status)
    {
      case "active":
        stripeSubscriptionStatusCustomFieldId = clickupCrmCustomField.aboStatus.options.active.fieldId;
        break;
      case "past_due":
        stripeSubscriptionStatusCustomFieldId = clickupCrmCustomField.aboStatus.options.overdue.fieldId;
        break;
      case "incomplete":
        stripeSubscriptionStatusCustomFieldId = clickupCrmCustomField.aboStatus.options.incomplete.fieldId;
        break;
      case "trialing":
        stripeSubscriptionStatusCustomFieldId = clickupCrmCustomField.aboStatus.options.trialing.fieldId;
        break;
      case "canceled":
        stripeSubscriptionStatusCustomFieldId = clickupCrmCustomField.aboStatus.options.canceled.fieldId;
        break;
      case "incomplete_expired":
        stripeSubscriptionStatusCustomFieldId = clickupCrmCustomField.aboStatus.options.incompleteExpired.fieldId;
        break;
      case "paused":
        stripeSubscriptionStatusCustomFieldId = clickupCrmCustomField.aboStatus.options.paused.fieldId;
        break;
      case "unpaid":
        stripeSubscriptionStatusCustomFieldId = clickupCrmCustomField.aboStatus.options.unpaid.fieldId;
        break;
    }
  }

  const subscriptionFuture = subscriptionData ? calculateSubscriptionFuture(subscriptionData) : null;

  const userIdCustomFieldData: ShortTextCustomFieldInsertProps = {
    id: clickupCrmCustomField.userId.fieldId,
    value: user.id
  };

  const universityCustomFieldData: DropDownCustomFieldInsertProps = {
    id: clickupCrmCustomField.university.fieldId,
    value: allUniversities.find(u => u.name === user.university)?.clickupId
  };

  const semesterCustomFieldData: NumberCustomFieldInsertProps = {
    id: clickupCrmCustomField.semester.fieldId,
    value: user.semester
  };

  const emailCustomFieldData: EmailCustomFieldInsertProps = {
    id: clickupCrmCustomField.email.fieldId,
    value: user.email
  };

  const signedUpDateCustomFieldData: DateCustomFieldInsertProps = {
    id: clickupCrmCustomField.signedUpDate.fieldId,
    value: new Date(supabaseUserData!.created_at).getTime(),
    value_options: { time: true }
  };

  const categoryCustomFieldData: DropDownCustomFieldInsertProps = {
    id: clickupCrmCustomField.category.fieldId,
    value: (user.university || user.semester) ? clickupCrmCustomField.category.options.student.fieldId : undefined
  };

  const aboStatusCustomFieldData: DropDownCustomFieldInsertProps = {
    id: clickupCrmCustomField.aboStatus.fieldId,
    value: stripeSubscriptionStatusCustomFieldId
  };

  const memberUntilCustomFieldData: DateCustomFieldInsertProps = {
    id: clickupCrmCustomField.memberUntil.fieldId,
    value: subscriptionFuture?.isCanceled ? subscriptionFuture.subscriptionEndDate.getTime() : undefined,
    value_options: { time: true }
  };

  const willSubscriptionContinueCustomFieldData: DropDownCustomFieldInsertProps = {
    id: clickupCrmCustomField.willSubscriptionContinue.fieldId,
    value: subscriptionFuture?.isCanceled ? clickupCrmCustomField.willSubscriptionContinue.options.no.fieldId : clickupCrmCustomField.willSubscriptionContinue.options.yes.fieldId
  };

  const subscriptionItems = subscriptionData?.items.data;
  const plan = subscriptionItems?.[0]?.plan;

  if(subscriptionItems && subscriptionItems.length > 1)
  {
    console.error(`User ${user.id} has more than one subscription item. This is not supported and must be investigated.`);
  }

  const paymentIntervalOptions = clickupCrmCustomField.paymentInterval.options;

  let paymentIntervalFieldValue: typeof paymentIntervalOptions[keyof typeof paymentIntervalOptions]["fieldId"] | undefined;

  if(plan?.interval != null)
  {
    switch (plan.interval)
    {
      case "day":
        paymentIntervalFieldValue = paymentIntervalOptions.daily.fieldId;
        break;
      case "month":
        paymentIntervalFieldValue = paymentIntervalOptions.monthly.fieldId;
        break;
      case "week":
        paymentIntervalFieldValue = paymentIntervalOptions.weekly.fieldId;
        break;
      case "year":
        paymentIntervalFieldValue = paymentIntervalOptions.yearly.fieldId;
        break;
    }
  }

  const paymentIntervalCustomFieldData: DropDownCustomFieldInsertProps = {
    id: clickupCrmCustomField.paymentInterval.fieldId,
    value: paymentIntervalFieldValue
  };

  const allInvoicesWithMoneySpent = allInvoices.filter(invoice => invoice.total > 0);
  const totalMoneySpent = allInvoicesWithMoneySpent.reduce((acc, invoice) => acc + invoice.total, 0) / 100;

  const totalMoneySpentCustomFieldData: CurrencyCustomFieldInsertProps = {
    id: clickupCrmCustomField.totalMoneySpent.fieldId,
    value: totalMoneySpent
  };

  const amountOfPaymentsCustomFieldData: NumberCustomFieldInsertProps = {
    id: clickupCrmCustomField.amountOfPayments.fieldId,
    value: allInvoicesWithMoneySpent.length
  };

  const amountOfUploadedFilesCustomFieldData: NumberCustomFieldInsertProps = {
    id: clickupCrmCustomField.amountOfUploadedFiles.fieldId,
    value: user.uploadedFiles
  };

  const amountOfViewedArticlesCustomFieldData: NumberCustomFieldInsertProps = {
    id: clickupCrmCustomField.amountOfViewedArticles.fieldId,
    value: user.viewedArticles
  };

  const amountOfViewedCasesCustomFieldData: NumberCustomFieldInsertProps = {
    id: clickupCrmCustomField.amountOfViewedCases.fieldId,
    value: user.viewedCases
  };

  const amountOfCreatedDocsCustomFieldData: NumberCustomFieldInsertProps = {
    id: clickupCrmCustomField.amountOfCreatedDocs.fieldId,
    value: user.createdDocuments
  };

  const amountOfSolvedCasesCustomFieldData: NumberCustomFieldInsertProps = {
    id: clickupCrmCustomField.amountOfSolvedCases.fieldId,
    value: user.completedCases
  };

  const amountOfBadesCustomFieldData: NumberCustomFieldInsertProps = {
    id: clickupCrmCustomField.amountOfBades.fieldId,
    value: user.completedBadges
  };

  const defaultPaymentMethodCustomFieldData: ShortTextCustomFieldInsertProps = {
    id: clickupCrmCustomField.paymentMethod.fieldId,
    value: defaultPaymentMethod?.type
  };

  return ({
    custom_fields: [
      userIdCustomFieldData,
      categoryCustomFieldData,
      emailCustomFieldData,
      universityCustomFieldData,
      semesterCustomFieldData,
      signedUpDateCustomFieldData,
      memberUntilCustomFieldData,
      aboStatusCustomFieldData,
      willSubscriptionContinueCustomFieldData,
      paymentIntervalCustomFieldData,
      totalMoneySpentCustomFieldData,
      amountOfPaymentsCustomFieldData,
      amountOfUploadedFilesCustomFieldData,
      amountOfViewedArticlesCustomFieldData,
      amountOfViewedCasesCustomFieldData,
      amountOfCreatedDocsCustomFieldData,
      amountOfSolvedCasesCustomFieldData,
      amountOfBadesCustomFieldData,
      defaultPaymentMethodCustomFieldData
    ],
    name: user.firstName + " " + user.lastName,
  });
};

const updateUserCrmData = async (userId: string, supabaseServerClient: SupabaseClient) =>
{
  const userWithCrmData = await getCrmDataForUser(userId, supabaseServerClient);

  if(!userWithCrmData)
  {
    throw new InternalServerError(new Error("userWithCrmData was null after getCrmDataForUser. This should not happen and must be investigated."));
  }

  const findCrmUserResult = await getClickupCrmUserByUserId(userId);

  if(findCrmUserResult.length > 1)
  {
    throw new InternalServerError(new Error("found more than one task in CRM list with the same user id. This should not happen and must be investigated."));
  }

  const existingCrmUser = findCrmUserResult[0];

  if(!existingCrmUser)
  {
    console.log(`User ${userId} not found in CRM. Creating new task...`);
    await createClickupTask(env.CLICKUP_CRM_LIST_ID, userWithCrmData.crmData);
    return;
  }

  await Promise.all(getUpdateUsersCrmDataPromises({ existingCrmUser, userWithCrmData }));
};

type SyncUserToCrm = (params: {
  eventType: "userCreated" | "userUpdated";
  supabase: {
    isServerClientInitialized: true;
    supabaseServerClient: SupabaseClient;
  } | {
    isServerClientInitialized: false;
    req: NextApiRequest;
    res: NextApiResponse;
  };
  userId: string;
}) => Promise<void>;

export const syncUserToCrm: SyncUserToCrm = async ({ eventType, supabase, userId }) =>
{
  if(!env.SYNC_USERS_TO_CRM)
  {
    return;
  }

  let supabaseServerClient: SupabaseClient;

  if(supabase.isServerClientInitialized)
  {
    supabaseServerClient = supabase.supabaseServerClient;
  }
  else
  {
    supabaseServerClient = createPagesServerClient({ req: supabase.req, res: supabase.res }, {
      supabaseKey: env.SUPABASE_SERVICE_ROLE_KEY,
      supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL
    });
  }

  switch (eventType)
  {
    case "userCreated":
    {
      const userCrmData = await getCrmDataForUser(userId, supabaseServerClient);

      if(!userCrmData)
      {
        console.error("userCrmData was null after getCrmDataForUser. This should not happen and must be investigated.");
        return;
      }

      await createClickupTask(env.CLICKUP_CRM_LIST_ID, userCrmData.crmData);
      break;
    }
    case "userUpdated":
    {
      await updateUserCrmData(userId, supabaseServerClient);
      break;
    }
  }
};

export const addUserToCrmUpdateQueue = async (userId: Nullable<string>) =>
{
  if(!env.SYNC_USERS_TO_CRM)
  {
    return;
  }

  if(userId == null)
  {
    return;
  }

  // TODO
  // It would be better to pass the custom field that needs to be updated instead of the whole user.
  // ALso, manually calling this function is not a good idea. It should be called automatically, e.g. with a webhook.

  await db.insert(updateUserInCrmQueue).values({ userId }).onConflictDoNothing();
};

export const createContentTaskIfNotExists = async (documentId: string, documentType: "case" | "article"): Promise<void> =>
{
  if(env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT !== "production")
  {
    return;
  }

  if(!documentId)
  {
    console.error("[createContentTaskIfNotExists] document id is null");
    return;
  }

  const [existingContentTask] = await findClickupTask(env.CLICKUP_CONTENT_TASKS_LIST_ID, {
    custom_fields: [{
      field_id: clickupContentTaskCustomField.caisyId.fieldId,
      operator: "=",
      value: documentId
    }],
    include_closed: true,
  });

  if(existingContentTask)
  {
    return;
  }

  let document: Nullable<IGenFullArticleFragment | IGenFullCaseFragment>;

  if(documentType === "article")
  {
    const { Article } = await caisySDK.getArticleById({ id: documentId });
    document = Article;
  }
  else if(documentType === "case")
  {
    const { Case } = await caisySDK.getCaseById({ id: documentId });
    document = Case;
  }
  else
  {
    console.error("invalid document type", documentType);
    return;
  }

  if(!document)
  {
    console.error(`no document found for document id ${documentId}`);
    return;
  }

  await createClickupTask(env.CLICKUP_CONTENT_TASKS_LIST_ID, getContentTaskCrmData(document));

  console.log(`created content task for document id ${documentId}`);
};
