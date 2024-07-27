/* eslint-disable max-lines */
import type { User } from "@/db/schema";
import { env } from "@/env.mjs";
import { createClickupTask } from "@/lib/clickup/tasks/create-task";
import { findClickupTask } from "@/lib/clickup/tasks/find-task";
import {
  type ClickupTask,
  type CustomFieldInsert,
  type DateCustomFieldInsertProps,
  type DropDownCustomFieldInsertProps,
  type EmailCustomFieldInsertProps,
  type NumberCustomFieldInsertProps, type ShortTextCustomFieldInsertProps,
} from "@/lib/clickup/types";
import { getCrmDataForUser, getUpdateUsersCrmDataPromises } from "@/pages/api/cron/sync-users-to-clickup";
import { allUniversities } from "@/schemas/auth/userData.validation";
import { isProduction } from "@/utils/env";
import { InternalServerError } from "@/utils/serverError";

import { createPagesServerClient, type SupabaseClient, type User as SupabaseUser } from "@supabase/auth-helpers-nextjs";
import { type AxiosRequestConfig } from "axios";
import { type NextApiRequest, type NextApiResponse } from "next";
import type Stripe from "stripe";

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
  semester: {
    fieldId: "37863c7b-36db-44e8-9215-e0e108b91db6"
  },
  signedUpDate: {
    fieldId: "02410e16-49aa-4a00-ab45-e07bfb7caf85"
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
type GetUserCrmData = (props: {
  subscriptionData: Stripe.Response<Stripe.Subscription> | null;
  supabaseUserData: SupabaseUser;
  user: User;
}) => {
  custom_fields: CustomFieldInsert[];
  name: string;
};

export const getUserCrmData: GetUserCrmData = ({ subscriptionData, supabaseUserData, user }) =>
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
    ],
    name: user.firstName + " " + user.lastName,
  });
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const updateUserCrmData = async (user: User | undefined, supabaseServerClient: SupabaseClient) =>
{
  if(!user)
  {
    throw new InternalServerError(new Error("user was null when trying to update his crm data. This should not happen and must be investigated."));
  }

  const userWithCrmData = await getCrmDataForUser(user, supabaseServerClient);

  if(!userWithCrmData)
  {
    throw new InternalServerError(new Error("userWithCrmData was null after getCrmDataForUser. This should not happen and must be investigated."));
  }

  const findCrmUserResult = await findClickupTask(env.CLICKUP_CRM_LIST_ID, {
    custom_field: {
      field_id: clickupCrmCustomField.userId.fieldId,
      operator: "=",
      value: user.id,
    },
  });

  const existingCrmUser = findCrmUserResult.data?.tasks[0] as ClickupTask | undefined;

  if(!existingCrmUser)
  {
    await createClickupTask(env.CLICKUP_CRM_LIST_ID, userWithCrmData.crmData);
    return;
  }

  await Promise.allSettled(getUpdateUsersCrmDataPromises({ existingCrmUser, userWithCrmData }));
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
  user: User | undefined;
}) => Promise<void>;

export const syncUserToCrm: SyncUserToCrm = async ({ eventType, supabase, user }) =>
{
  if(!env.SYNC_USERS_TO_CRM)
  {
    return;
  }

  if(!user)
  {
    console.error("user was null when trying to sync user to crm. This should not happen and must be investigated.");
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

  try
  {
    const userCrmData = await getCrmDataForUser(user, supabaseServerClient);

    if(!userCrmData)
    {
      console.error("userCrmData was null after getCrmDataForUser. This should not happen and must be investigated.");
      return;
    }

    switch (eventType)
    {
      case "userCreated":
        await createClickupTask(env.CLICKUP_CRM_LIST_ID, userCrmData.crmData);
        break;
      case "userUpdated":
        await updateUserCrmData(user, supabaseServerClient);
        break;
    }
  }
  catch (e: unknown)
  {
    console.log("Something went wrong while syncing user to crm", e);
  }
};
