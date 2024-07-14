/* eslint-disable max-lines */
// Note: All types in this file are not necessarily exhaustive or correct. For an accurate list of types, please refer to the ClickUp API documentation.

import { type User } from "@/db/schema";
import { env } from "@/env.mjs";
import { allUniversities } from "@/schemas/auth/userData.validation";
import { type Nullable } from "@/utils/types";

import { type User as SupabaseUser } from "@supabase/auth-helpers-nextjs";
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

type DropDownCustomFieldInsertProps = Pick<DropDownCustomFieldConfig, "id" | "value">;

type CurrencyCustomFieldConfig = CustomFieldBaseProperties & {
  type: "currency";
  type_config: {
    currency_type: string;
    precision: number;
  };
  value?: Nullable<number>;
};

type CurrencyCustomFieldInsertProps = Pick<CurrencyCustomFieldConfig, "id" | "value">;

type EmojiCustomFieldConfig = CustomFieldBaseProperties & {
  type: "emoji";
  type_config: {
    code_point: string;
    count: number;
  };
  value?: Nullable<number>;
};

type EmojiCustomFieldInsertProps = Pick<EmojiCustomFieldConfig, "id" | "value">;

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

type LabelCustomFieldInsertProps = Pick<LabelCustomFieldConfig, "id" | "value">;

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

type AutomaticProgressCustomFieldInsertProps = Pick<AutomaticProgressCustomFieldConfig, "id" | "value">;

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

type ManualProgressCustomFieldInsertProps = Pick<ManualProgressCustomFieldConfig, "id" | "value">;

type UrlCustomFieldConfig = CustomFieldBaseProperties & {
  type: "url";
  value?: Nullable<string>;
};

type UrlCustomFieldInsertProps = Pick<UrlCustomFieldConfig, "id" | "value">;

type EmailCustomFieldConfig = CustomFieldBaseProperties & {
  type: "email";
  value?: Nullable<string>;
};

type EmailCustomFieldInsertProps = Pick<EmailCustomFieldConfig, "id" | "value">;

type PhoneNumberCustomFieldConfig = CustomFieldBaseProperties & {
  type: "phone";
  value?: Nullable<string>;
};

type PhoneNumberCustomFieldInsertProps = Pick<PhoneNumberCustomFieldConfig, "id" | "value">;

type DateCustomFieldConfig = CustomFieldBaseProperties & {
  type: "date";
  value?: Nullable<number>;
  value_options: {
    time: boolean;
  };
};

type DateCustomFieldInsertProps = Pick<DateCustomFieldConfig, "id" | "value" | "value_options">;

type ShortTextCustomFieldConfig = CustomFieldBaseProperties & {
  type: "short_text";
  value?: Nullable<string>;
};

type ShortTextCustomFieldInsertProps = Pick<ShortTextCustomFieldConfig, "id" | "value">;

type TextCustomFieldConfig = CustomFieldBaseProperties & {
  type: "text";
  value?: Nullable<string>;
};

type TextCustomFieldInsertProps = Pick<TextCustomFieldConfig, "id" | "value">;

type CheckBoxCustomFieldConfig = CustomFieldBaseProperties & {
  type: "checkbox";
  value?: Nullable<boolean>;
};

type CheckBoxCustomFieldInsertProps = Pick<CheckBoxCustomFieldConfig, "id" | "value">;

type NumberCustomFieldConfig = CustomFieldBaseProperties & {
  type: "number";
  value?: Nullable<number>;
};

type NumberCustomFieldInsertProps = Pick<NumberCustomFieldConfig, "id" | "value">;

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

type LocationCustomFieldInsertProps = Pick<LocationCustomFieldConfig, "id" | "value">;

/* type CustomField =
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
  | LocationCustomFieldConfig;*/

type CustomFieldInsert =
  | DropDownCustomFieldInsertProps
  | CurrencyCustomFieldInsertProps
  | EmojiCustomFieldInsertProps
  | LabelCustomFieldInsertProps
  | AutomaticProgressCustomFieldInsertProps
  | ManualProgressCustomFieldInsertProps
  | UrlCustomFieldInsertProps
  | EmailCustomFieldInsertProps
  | PhoneNumberCustomFieldInsertProps
  | DateCustomFieldInsertProps
  | ShortTextCustomFieldInsertProps
  | TextCustomFieldInsertProps
  | CheckBoxCustomFieldInsertProps
  | NumberCustomFieldInsertProps
  | LocationCustomFieldInsertProps;

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

export type ClickupTask = {
  archived?: boolean;
  assignees?: number[];
  check_required_custom_fields?: boolean;
  custom_fields?: CustomFieldInsert[];
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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createClickupTask = async (body: ClickupTask) =>
{
  return axios.post(`${env.CLICKUP_API_ENDPOINT}/list/${env.CLICKUP_CRM_LIST_ID}/task`, body, {
    headers: {
      Authorization: env.CLICKUP_API_TOKEN,
      "Content-Type": "application/json"
    }
  });
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
