import { tags } from "@/components/organisms/materialTagsDrawer/MaterialTagsDrawer";
import { colors } from "@/constants/styles/colors";

import { ActionIcon, Badge, Input, rem } from "@mantine/core";
import { IconX, IconSearch } from "@tabler/icons-react";
import React, { type FunctionComponent } from "react";

import * as styles from "./TagsSelector.styles";

type CustomBadgeProps = {
  readonly deleteButtonAction?: () => void;
  readonly isSelected?: boolean;
  readonly selectAction?: () => void;
  readonly title: string;
};

const CustomBadge: FunctionComponent<CustomBadgeProps> = ({
  deleteButtonAction,
  isSelected,
  selectAction,
  title
}) => (
  <Badge
    variant="light"
    onClick={selectAction}
    component={selectAction != null ? "button" : "div"}
    sx={{
      "&:active": {
        backgroundColor: "#f7f7f7 !important",
      },
      "&:hover": {
        backgroundColor: "#fafafa",
      },
      backgroundColor: "#ffffff",
      borderColor: isSelected ? "#000000" : "#e9e9e9",
      borderStyle: "solid",
      borderWidth: 1,
      color: "#000000",
      cursor: selectAction != null ? "pointer" : "default",
      fontSize: 15,
      fontWeight: isSelected ? 700 : 500,
      padding: 16,
      paddingRight: deleteButtonAction == null ? undefined : 4,
      textTransform: "none"
    }}
    rightSection={deleteButtonAction != null && (
      <ActionIcon
        size="xs"
        onClick={deleteButtonAction}
        sx={{
          color: colors["neutrals-01"][7],
        }}
        radius="xl"
        variant="transparent">
        <IconX size={rem(20)}/>
      </ActionIcon>
    )}>
    {title}
  </Badge>
);

const TagsSelector: FunctionComponent = () => (
  <>
    <div css={styles.selectedTagsWrapper}>
      <div css={styles.headWrapper}>
        <p css={styles.appliedTags}>5 Tags zugewiesen</p>
        <p css={styles.amountOfApplieableTags}>Du kannst bis zu 10 Tags zuweisen</p>
      </div>
      <div css={styles.badgesWrapper}>
        {tags.map((tag) => (
          <CustomBadge
            key={tag.id}
            title={tag.name}
            deleteButtonAction={() => console.log("delete")}
          />
        ))}
      </div>
    </div>
    <div css={styles.selectionAreaWrapper}>
      <Input
        icon={<IconSearch size={20}/>}
        placeholder="Suche nach Tags"
        styles={{
          icon: {
            color: colors["neutrals-01"][7],
          },
          input: {
            "&::placeholder": {
              color: colors["neutrals-01"][7],
            },
            "&:focus-within": {
              borderColor: colors["neutrals-01"][7],
            },
            border: "1px solid ##D6D6D6",
          },
          wrapper: {}
        }}
        size={"md"}
        radius="md"
      />
      <div css={styles.selectableBadgesWrapper}>
        {tags.map((tag) => (
          <CustomBadge
            key={tag.id}
            title={tag.name}
            isSelected={tag.id === "2"}
            selectAction={() => console.log("select")}
          />
        ))}
      </div>
    </div>
  </>
);

export default TagsSelector;
