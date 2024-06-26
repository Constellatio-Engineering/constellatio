import { meiliSearchAdmin } from "@/lib/meilisearch";
import { type AllTags } from "@/services/content/getAllTags";
import { type IGenTags } from "@/services/graphql/__generated/sdk";
import { searchIndices, type TagSearchIndexItem } from "@/utils/search";
import { type NullableProperties } from "@/utils/types";

type AddTags = <T>(
  objects: Array<T & {
    tags: Array<{
      tagId: string;
    }>;
  }>,
  allTags?: AllTags
) => Promise<Array<Omit<T, "tags"> & {
  tags: Array<NullableProperties<{
    id: string;
    tagName: string;
  }>>;
}>>;

export const addTags: AddTags = async (objects, allTags) =>
{
  const tagIds = objects.flatMap(({ tags }) => tags.map(({ tagId }) => tagId));
  let tags: IGenTags[];

  if(allTags == null)
  {
    const filter = `id IN [${tagIds.join(", ")}]`;
    const { results } = await meiliSearchAdmin.index(searchIndices.tags).getDocuments<TagSearchIndexItem>({ filter, limit: tagIds.length });
    tags = results;
  }
  else
  {
    tags = allTags.filter(({ id }) => id != null && tagIds.includes(id));
  }

  if(tags.length < tagIds.length)
  {
    console.warn("not all tags found", tags.length, tagIds.length, tagIds);
  }

  return objects.map((object) => ({
    ...object,
    tags: object.tags
      .map(({ tagId }) => tags.find(({ id }) => id === tagId))
      .filter(Boolean)
      .map(({ id, tagName }) => ({ id: id!, tagName })),
  }));
};
