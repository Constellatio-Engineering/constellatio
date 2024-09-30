/* eslint-disable max-lines */
import { colooors } from "@/constants/styles/colors";
import { useInitialTags } from "@/hooks/useInitialTags";
import { useTagsSearchResults } from "@/hooks/useTagsSearchResults";
import { type IGenTags } from "@/services/graphql/__generated/sdk";
import { type EditorOpened, useTagsEditorStore } from "@/stores/tagsEditor.store";
import { useTagsSearchBarStore } from "@/stores/tagsSearchBar.store";
import { appPaths } from "@/utils/paths";
import { type TagSearchIndexItem } from "@/utils/search";

import { ActionIcon, Badge, Input, rem } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import React, { type FunctionComponent, type MouseEvent } from "react";

import * as styles from "./TagsSelector.styles";

type CustomBadgeProps = {
  readonly deleteButtonAction?: (e: MouseEvent) => void;
  readonly isSelected?: boolean;
  readonly selectAction?: (e: MouseEvent) => void;
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
        onClick={(e) =>
        {
          e.stopPropagation();
          deleteButtonAction(e);
        }}
        sx={{
          color: colooors["neutrals-01"][7],
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
  const { data: initialTags = [] } = useInitialTags();
  const selectTag = useTagsEditorStore(s => s.selectTag);
  const deselectTag = useTagsEditorStore(s => s.deselectTag);

  let displayedTags: Array<TagSearchIndexItem | IGenTags> | "noResults";

  if(searchValue.length === 0)
  {
    displayedTags = initialTags;
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
          <div css={styles.amountOfTagsWrapper}>
            <p css={styles.heading}>{editorState.editedTags.length} Tag{editorState.editedTags.length === 1 ? "" : "s"} zugewiesen</p>
            <p css={styles.amountOfApplieableTags}>Du kannst bis zu 10 Tags zuweisen</p>
          </div>
          {editorState.editedTags.length === 0 && (
            <p css={styles.noTagsApplied}>Nutze die Suche, um Tags zu finden und zuzuweisen</p>
          )}
        </div>
        <div css={styles.badgesWrapper}>
          {editorState.editedTags.map(tag =>
          {
            const { id, tagName } = tag;

            if(!id || !tagName)
            {
              return null;
            }

            return (
              <CustomBadge
                key={id}
                title={tagName}
                selectAction={(_e) => window.open(`${appPaths.search}?find=${tagName}`, "_blank")}
                deleteButtonAction={() => deselectTag(id)}
              />
            );
          })}
        </div>
      </div>
      <div css={styles.selectionAreaWrapper}>
        <p css={styles.heading}>Weitere Tags hinzufügen</p>
        <Input
          icon={<IconSearch size={20}/>}
          placeholder="Suche nach Tags"
          styles={{
            icon: {
              color: colooors["neutrals-01"][7],
            },
            input: {
              "&::placeholder": {
                color: colooors["neutrals-01"][7],
              },
              "&:focus-within": {
                borderColor: colooors["neutrals-01"][7],
              },
              border: "1px solid ##D6D6D6",
            },
            wrapper: {}
          }}
          value={searchValue}
          onChange={(event) => setSearchValue(event.currentTarget.value)}
          size={"md"}
          radius="md"
          mt={12}
          mb={20}
        />
        {searchValue.length === 0 && (
          <p css={styles.examples}>Beispiele</p>
        )}
        <div css={styles.selectableBadgesWrapper}>
          {displayedTags === "noResults" ? (
            <p css={styles.noResults}>Keine Tags gefunden</p>
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
                    deselectTag(id);
                  }
                  else
                  {
                    selectTag(tag);
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
