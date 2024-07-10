/* eslint-disable max-lines */
// Note: All types in this file are not necessarily exhaustive or correct. For an accurate list of types, please refer to the ClickUp API documentation.

import { type User } from "@/db/schema";
import { env } from "@/env.mjs";
import { allUniversities } from "@/schemas/auth/userData.validation";
import { getFutureSubscriptionStatus, getHasSubscription } from "@/utils/subscription";
import { type Nullable } from "@/utils/types";

import { type User as SupabaseUser } from "@supabase/auth-helpers-nextjs";
import { type UserResponse } from "@supabase/gotrue-js";
import axios from "axios";
import type Stripe from "stripe";

type CustomFieldBaseProperties = {
  date_created: number;
  hide_from_guests: boolean;
  id: string;
  name: string;
};

type DropDownCustomFieldConfig = CustomFieldBaseProperties & {
  type: "drop_down";
  type_config: {
    options: Array<{
      color: string;
      id: string;
      name: string;
    }>;
  };
  value?: Nullable<string>;
};

type CurrencyCustomFieldConfig = CustomFieldBaseProperties & {
  type: "currency";
  type_config: {
    currency_type: string;
    precision: number;
  };
  value?: Nullable<number>;
};

type EmojiCustomFieldConfig = CustomFieldBaseProperties & {
  type: "emoji";
  type_config: {
    code_point: string;
    count: number;
  };
  value?: Nullable<number>;
};

type LabelCustomFieldConfig = CustomFieldBaseProperties & {
  type: "labels";
  type_config: {
    options: Array<{
      color: string;
      id: string;
      name: string;
    }>;
  };
  value?: Nullable<string[]>;
};

type AutomaticProgressCustomFieldConfig = CustomFieldBaseProperties & {
  type: "progress";
  type_config: {
    method: "automatic";
    tracking: {
      assigned_comments: boolean;
      checklists: boolean;
      subtasks: boolean;
    };
  };
  value?: Nullable<number>;
};

type ManualProgressCustomFieldConfig = CustomFieldBaseProperties & {
  type: "progress";
  type_config: {
    end: number;
    method: "manual";
    start: number;
  };
  value?: Nullable<{
    current: number;
  }>;
};

type UrlCustomFieldConfig = CustomFieldBaseProperties & {
  type: "url";
  value?: Nullable<string>;
};

type EmailCustomFieldConfig = CustomFieldBaseProperties & {
  type: "email";
  value?: Nullable<string>;
};

type PhoneNumberCustomFieldConfig = CustomFieldBaseProperties & {
  type: "phone";
  value?: Nullable<string>;
};

type DateCustomFieldConfig = CustomFieldBaseProperties & {
  type: "date";
  value?: Nullable<number>;
  value_options: {
    time: boolean;
  };
};

type ShortTextCustomFieldConfig = CustomFieldBaseProperties & {
  type: "short_text";
  value?: Nullable<string>;
};

type TextCustomFieldConfig = CustomFieldBaseProperties & {
  type: "text";
  value?: Nullable<string>;
};

type CheckBoxCustomFieldConfig = CustomFieldBaseProperties & {
  type: "checkbox";
  value?: Nullable<boolean>;
};

type NumberCustomFieldConfig = CustomFieldBaseProperties & {
  type: "number";
  value?: Nullable<number>;
};

type LocationCustomFieldConfig = CustomFieldBaseProperties & {
  type: "location";
  value?: Nullable<{
    formatted_address: string;
    location: {
      lat: number;
      lng: number;
    };
  }>;
};

type CustomField =
  | DropDownCustomFieldConfig
  | CurrencyCustomFieldConfig
  | EmojiCustomFieldConfig
  | LabelCustomFieldConfig
  | AutomaticProgressCustomFieldConfig
  | ManualProgressCustomFieldConfig
  | UrlCustomFieldConfig
  | EmailCustomFieldConfig
  | PhoneNumberCustomFieldConfig
  | DateCustomFieldConfig
  | ShortTextCustomFieldConfig
  | TextCustomFieldConfig
  | CheckBoxCustomFieldConfig
  | NumberCustomFieldConfig
  | LocationCustomFieldConfig;

const clickupCrmCustomField = {
  aboStatus: {
    fieldId: "c5b525cc-e7d9-46e7-af4f-46681d072a4a",
    options: {
      active: {
        fieldId: "c4b9d5b8-4702-4475-9b3b-a7baf7b5cdda"
      },
      canceled: {
        fieldId: "be0a0a52-5136-4dbf-bed7-de3cd4cdb26e"
      },
      trialing: {
        fieldId: "1e861e9f-7d9d-4bc5-80f8-fe3f5efdbfa8"
      }
    }
  },
  email: {
    fieldId: "99d92dc5-7c51-4a8f-ade7-e0b7d64c4576"
  },
  memberSince: {
    fieldId: "02410e16-49aa-4a00-ab45-e07bfb7caf85"
  },
  memberUntil: {
    fieldId: "5a3ada95-dbf3-4e63-aceb-595a9a27afda"
  },
  semester: {
    fieldId: "37863c7b-36db-44e8-9215-e0e108b91db6"
  },
  university: {
    fieldId: "b8e29f58-cb77-4519-8f12-dfc8117f90e8",
  }
} as const;

const clickupCrmStatuses = {
  activeUser: {
    statusId: "subcat901506039191_sc901500143981_BDqEZUPw"
  },
  didNotSubscribeAfterTrial: {
    statusId: "subcat901506039191_sc901500143981_JSQqQk6V"
  },
  trialing: {
    statusId: "subcat901506039191_sc901500143981_rfkBdkuf"
  },
} as const;

type CreateTaskBody = {
  archived?: boolean;
  assignees?: number[];
  check_required_custom_fields?: boolean;
  custom_fields?: Array<Pick<CustomField, "id" | "value">>;
  custom_item_id?: number;
  description?: string;
  due_date?: number;
  due_date_time?: boolean;
  group_assignees?: number[];
  links_to?: string | null;
  name: string;
  notify_all?: boolean;
  parent?: string | null;
  points?: number;
  priority?: number | null;
  start_date?: number;
  start_date_time?: boolean;
  status?: string;
  tags?: string[];
  time_estimate?: number;
};

const createTask = async (body: CreateTaskBody): Promise<void> =>
{
  const result = await axios.post(`${env.CLICKUP_API_ENDPOINT}/list/${env.CLICKUP_CRM_LIST_ID}/task`, body, {
    headers: {
      Authorization: env.CLICKUP_API_TOKEN,
      "Content-Type": "application/json"
    }
  });

  console.log(result.data);

  return result.data;
};

type CustomFieldInsertProps<T extends CustomField> = Pick<T, "id" | "value">;

type createClickupCrmUserProps = {
  subscriptionData: Stripe.Response<Stripe.Subscription> | null;
  supabaseUserData: SupabaseUser;
  user: User;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createClickupCrmUser = async ({ subscriptionData, supabaseUserData, user }: createClickupCrmUserProps) =>
{
  const universityCustomFieldData: CustomFieldInsertProps<DropDownCustomFieldConfig> = {
    id: clickupCrmCustomField.university.fieldId,
    value: allUniversities.find(u => u.name === user.university)?.clickupId
  };

  const semesterCustomFieldData: CustomFieldInsertProps<NumberCustomFieldConfig> = {
    id: clickupCrmCustomField.semester.fieldId,
    value: user.semester
  };

  const emailCustomFieldData: CustomFieldInsertProps<EmailCustomFieldConfig> = {
    id: clickupCrmCustomField.email.fieldId,
    value: user.email
  };

  const memberSinceCustomFieldData: CustomFieldInsertProps<DateCustomFieldConfig> = {
    id: clickupCrmCustomField.memberSince.fieldId,
    value: new Date(supabaseUserData!.created_at).getTime()
  };

  let stripeSubscriptionStatusCustomFieldId: string = clickupCrmCustomField.aboStatus.options.canceled.fieldId;
  // let subscriptionStatus: "trialing" | "active" | "canceled" = "canceled";

  if(subscriptionData?.status != null)
  {
    switch (subscriptionData.status)
    {
      case "active":
      case "past_due":
      case "incomplete":
        stripeSubscriptionStatusCustomFieldId = clickupCrmCustomField.aboStatus.options.active.fieldId;
        break;
      case "trialing":
        stripeSubscriptionStatusCustomFieldId = clickupCrmCustomField.aboStatus.options.trialing.fieldId;
        break;
      case "canceled":
      case "incomplete_expired":
      case "paused":
      case "unpaid":
        stripeSubscriptionStatusCustomFieldId = clickupCrmCustomField.aboStatus.options.canceled.fieldId;
        break;
    }
  }

  const aboStatusCustomFieldData: CustomFieldInsertProps<DropDownCustomFieldConfig> = {
    id: clickupCrmCustomField.aboStatus.fieldId,
    value: stripeSubscriptionStatusCustomFieldId
  };

  let subscriptionEndDate: Date | null = null;

  if(subscriptionData != null)
  {
    const futureSubscriptionStatus = getFutureSubscriptionStatus(subscriptionData);
    const { cancel_at: cancelAt, trial_end: trialEnd } = subscriptionData;
    let stripeSubscriptionEnd: Nullable<number> = null;

    switch (futureSubscriptionStatus)
    {
      case "willBeCanceled":
      {
        stripeSubscriptionEnd = cancelAt;
        break;
      }
      case "trialWillExpire":
      {
        stripeSubscriptionEnd = trialEnd;
        break;
      }
      case "trialWillBecomeSubscription":
      case "willContinue":
      case null:
      {
        stripeSubscriptionEnd = null;
      }
    }

    subscriptionEndDate = stripeSubscriptionEnd != null ? new Date(stripeSubscriptionEnd * 1000) : null;
  }

  console.log("subscriptionEndDate", subscriptionEndDate);

  const memberUntilCustomFieldData: CustomFieldInsertProps<DateCustomFieldConfig> = {
    id: clickupCrmCustomField.memberUntil.fieldId,
    value: subscriptionEndDate ? subscriptionEndDate.getTime() : undefined
  };

  return;

  return createTask({
    custom_fields: [
      emailCustomFieldData,
      universityCustomFieldData,
      semesterCustomFieldData,
      memberSinceCustomFieldData,
      memberUntilCustomFieldData
    ],
    name: user.firstName + " " + user.lastName,
  });
};
