/* eslint-disable max-lines */
import type { User } from "@/db/schema";
import { env } from "@/env.mjs";
import {
  type CustomFieldInsert, type DateCustomFieldInsertProps, type DropDownCustomFieldInsertProps, type EmailCustomFieldInsertProps, type NumberCustomFieldInsertProps 
} from "@/lib/clickup/types";
import { allUniversities } from "@/schemas/auth/userData.validation";

import type { User as SupabaseUser } from "@supabase/auth-helpers-nextjs";
import { type AxiosRequestConfig } from "axios";
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
