import { dummyTags } from "@/components/organisms/materialTagsDrawer/MaterialTagsDrawer";
import { colors } from "@/constants/styles/colors";
import { useTagsSearchResults } from "@/hooks/useTagsSearchResults";
import { type IGenTags } from "@/services/graphql/__generated/sdk";
import { type EditorOpened, useTagsEditorStore } from "@/stores/tagsEditor.store";
import { useTagsSearchBarStore } from "@/stores/tagsSearchBar.store";
import { type TagSearchIndexItem } from "@/utils/search";

import { ActionIcon, Badge, Input, rem } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
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

type Props = {
  readonly editorState: EditorOpened;
};

const TagsSelector: FunctionComponent<Props> = ({ editorState }) =>
{
  const { searchValue, setSearchValue } = useTagsSearchBarStore();
  const { tagsSearchResults } = useTagsSearchResults(searchValue);
  const selectTag = useTagsEditorStore(s => s.selectTag);
  const deselectTag = useTagsEditorStore(s => s.deselectTag);

  let displayedTags: Array<TagSearchIndexItem | IGenTags> | "noResults";

  if(searchValue.length === 0)
  {
    displayedTags = dummyTags;
  }
  else
  {
    if(tagsSearchResults.length === 0)
    {
      displayedTags = "noResults";
    }
    else
    {
      displayedTags = tagsSearchResults;
    }
  }

  return (
    <>
      <div css={styles.selectedTagsWrapper}>
        <div css={styles.headWrapper}>
          <p css={styles.appliedTags}>{editorState.editedTags.length} Tags zugewiesen</p>
          <p css={styles.amountOfApplieableTags}>Du kannst bis zu 10 Tags zuweisen</p>
        </div>
        <div css={styles.badgesWrapper}>
          {editorState.editedTags.map(tagId =>
          {
            const tag = dummyTags.find(({ id }) => id === tagId);

            if(tag == null)
            {
              return null;
            }

            return (
              <CustomBadge
                key={tag.id}
                title={tag.tagName}
                deleteButtonAction={() => deselectTag(tag.id)}
              />
            );
          })}
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
          value={searchValue}
          onChange={(event) => setSearchValue(event.currentTarget.value)}
          size={"md"}
          radius="md"
        />
        <div css={styles.selectableBadgesWrapper}>
          {displayedTags === "noResults" ? (
            <p>Keine Tags gefunden</p>
          ) : displayedTags.map((tag) =>
          {
            const { id, tagName } = tag;

            if(!id || !tagName)
            {
              return null;
            }

            const isSelected = editorState.editedTags.some(({ id: tagId }) => tagId === id);

            return (
              <CustomBadge
                key={id}
                title={tagName}
                isSelected={isSelected}
                selectAction={() =>
                {
                  if(isSelected)
                  {
                    console.log("deselecting tag", id);
                    deselectTag(id);
                  }
                  else
                  {
                    console.log("selecting tag", id);
                    selectTag(id);
                  }
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TagsSelector;
