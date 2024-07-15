/* eslint-disable max-lines,import/no-unused-modules */
import type { Nullable } from "@/utils/types";

// Note: All types in this file are not necessarily exhaustive or correct. For an accurate list of types, please refer to the ClickUp API documentation.

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
  value?: Nullable<number>;
};

export type DropDownCustomFieldInsertProps = Pick<DropDownCustomFieldConfig, "id"> & {
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

export type CurrencyCustomFieldInsertProps = Pick<CurrencyCustomFieldConfig, "id" | "value">;

type EmojiCustomFieldConfig = CustomFieldBaseProperties & {
  type: "emoji";
  type_config: {
    code_point: string;
    count: number;
  };
  value?: Nullable<number>;
};

export type EmojiCustomFieldInsertProps = Pick<EmojiCustomFieldConfig, "id" | "value">;

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

export type LabelCustomFieldInsertProps = Pick<LabelCustomFieldConfig, "id" | "value">;

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

export type AutomaticProgressCustomFieldInsertProps = Pick<AutomaticProgressCustomFieldConfig, "id" | "value">;

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

export type ManualProgressCustomFieldInsertProps = Pick<ManualProgressCustomFieldConfig, "id" | "value">;

type UrlCustomFieldConfig = CustomFieldBaseProperties & {
  type: "url";
  value?: Nullable<string>;
};

export type UrlCustomFieldInsertProps = Pick<UrlCustomFieldConfig, "id" | "value">;

type EmailCustomFieldConfig = CustomFieldBaseProperties & {
  type: "email";
  value?: Nullable<string>;
};

export type EmailCustomFieldInsertProps = Pick<EmailCustomFieldConfig, "id" | "value">;

type PhoneNumberCustomFieldConfig = CustomFieldBaseProperties & {
  type: "phone";
  value?: Nullable<string>;
};

export type PhoneNumberCustomFieldInsertProps = Pick<PhoneNumberCustomFieldConfig, "id" | "value">;

type DateCustomFieldConfig = CustomFieldBaseProperties & {
  type: "date";
  value?: Nullable<number>;
  value_options: {
    time: boolean;
  };
};

export type DateCustomFieldInsertProps = Pick<DateCustomFieldConfig, "id" | "value" | "value_options">;

type ShortTextCustomFieldConfig = CustomFieldBaseProperties & {
  type: "short_text";
  value?: Nullable<string>;
};

export type ShortTextCustomFieldInsertProps = Pick<ShortTextCustomFieldConfig, "id" | "value">;

type TextCustomFieldConfig = CustomFieldBaseProperties & {
  type: "text";
  value?: Nullable<string>;
};

export type TextCustomFieldInsertProps = Pick<TextCustomFieldConfig, "id" | "value">;

type CheckBoxCustomFieldConfig = CustomFieldBaseProperties & {
  type: "checkbox";
  value?: Nullable<boolean>;
};

export type CheckBoxCustomFieldInsertProps = Pick<CheckBoxCustomFieldConfig, "id" | "value">;

type NumberCustomFieldConfig = CustomFieldBaseProperties & {
  type: "number";
  value?: Nullable<number>;
};

export type NumberCustomFieldInsertProps = Pick<NumberCustomFieldConfig, "id" | "value">;

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

export type LocationCustomFieldInsertProps = Pick<LocationCustomFieldConfig, "id" | "value">;

type CustomField =
  | DropDownCustomFieldConfig
  | EmailCustomFieldConfig
  | DateCustomFieldConfig
  | NumberCustomFieldConfig
  // | CurrencyCustomFieldConfig
  // | EmojiCustomFieldConfig
  // | LabelCustomFieldConfig
  // | AutomaticProgressCustomFieldConfig
  // | ManualProgressCustomFieldConfig
  // | UrlCustomFieldConfig
  // | PhoneNumberCustomFieldConfig
  // | ShortTextCustomFieldConfig
  // | TextCustomFieldConfig
  // | CheckBoxCustomFieldConfig
  // | LocationCustomFieldConfig
;

export type CustomFieldInsert =
  | DropDownCustomFieldInsertProps
  | EmailCustomFieldInsertProps
  | DateCustomFieldInsertProps
  | NumberCustomFieldInsertProps
  // | CurrencyCustomFieldInsertProps
  // | EmojiCustomFieldInsertProps
  // | LabelCustomFieldInsertProps
  // | AutomaticProgressCustomFieldInsertProps
  // | ManualProgressCustomFieldInsertProps
  // | UrlCustomFieldInsertProps
  // | PhoneNumberCustomFieldInsertProps
  // | ShortTextCustomFieldInsertProps
  // | TextCustomFieldInsertProps
  // | CheckBoxCustomFieldInsertProps
  // | LocationCustomFieldInsertProps
;

export type ClickupTaskCreate = {
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

export type ClickupTask = Omit<ClickupTaskCreate, "custom_fields"> & {
  custom_fields?: CustomField[];
  id: string;
};

export type ClickUpFindTaskParams = {
  archived?: boolean;
  assignees?: string[];
  custom_field?: CustomFilterField;
  custom_fields?: CustomFilterField[];
  custom_items?: "0";
  date_created_gt?: string;
  date_created_lt?: string;
  date_done_gt?: string;
  date_done_lt?: string;
  date_updated_gt?: string;
  date_updated_lt?: string;
  due_date_gt?: string;
  due_date_lt?: string;
  include_closed?: boolean;
  include_markdown_description?: boolean;
  order_by?: string;
  page?: number;
  reverse?: boolean;
  statuses?: string[];
  subtasks?: boolean;
  tags?: string[];
  watchers?: string[];
};

type CustomFilterField = {
  field_id: string;
  operator: "=" | "!=" | ">" | "<" | ">=" | "<=" | "IS NULL" | "IS NOT NULL" | "RANGE" | "ANY" | "ALL" | "NOT ANY" | "NOT ALL";
  value: string;
};
