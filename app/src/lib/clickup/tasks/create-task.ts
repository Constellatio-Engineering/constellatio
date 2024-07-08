// Note: All types in this file are not necessarily exhaustive or correct. For an accurate list of types, please refer to the ClickUp API documentation.

type CustomFieldBaseProperties = {
  date_created: number;
  hide_from_guests: boolean;
  id: string;
  name: string;
};

type DropDownCustomFieldConfig = {
  type: "drop_down";
  type_config: {
    options: Array<{
      color: string;
      id: string;
      name: string;
    }>;
  };
};

type CurrencyCustomFieldConfig = {
  type: "currency";
  type_config: {
    currency_type: string;
    precision: number;
  };
};

type EmojiCustomFieldConfig = {
  type: "emoji";
  type_config: {
    code_point: string;
    count: number;
  };
};

type LabelCustomFieldConfig = {
  type: "labels";
  type_config: {
    options: Array<{
      color: string;
      id: string;
      name: string;
    }>;
  };
};

type AutomaticProgressCustomFieldConfig = {
  type: "progress";
  type_config: {
    method: "automatic";
    tracking: {
      assigned_comments: boolean;
      checklists: boolean;
      subtasks: boolean;
    };
  };
};

type ManualProgressCustomFieldConfig = {
  type: "progress";
  type_config: {
    end: number;
    method: "manual";
    start: number;
  };
};

const clickupCrmCustomField = {
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
    options: []
  }
} as const;

type CreateTaskBody = {
  archived?: boolean;
  assignees?: number[];
  check_required_custom_fields?: boolean;
  custom_fields?: Record<string, string>;
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

};
