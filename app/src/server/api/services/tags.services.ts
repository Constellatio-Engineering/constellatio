import { meiliSearchAdmin } from "@/lib/meilisearch";
import { type TagSearchIndexItem } from "@/utils/search/caisy/tag";
import { searchIndices } from "@/utils/search/search";
import { type NullableProperties } from "@/utils/types";

type AddTags = <T>(
  objects: Array<T & {
    tags: Array<{
      tagId: string;
    }>;
  }>
) => Promise<Array<Omit<T, "tags"> & {
  tags: Array<NullableProperties<{
    id: string;
    tagName: string;
  }>>;
}>>;

export const addTags: AddTags = async (objects) =>
{
  const tagIds = objects.flatMap(({ tags }) => tags.map(({ tagId }) => tagId));
  const filter = `id IN [${tagIds.join(", ")}]`;
  const { results } = await meiliSearchAdmin.index(searchIndices.tags).getDocuments<TagSearchIndexItem>({ filter, limit: tagIds.length });

  if(results.length !== tagIds.length)
  {
    console.warn("not all tags found in meilisearch", results.length, tagIds.length, tagIds);
  }

  return objects.map((object) => ({
    ...object,
    tags: object.tags
      .map(({ tagId }) => results.find(({ id }) => id === tagId))
      .filter(Boolean)
  }));
};
