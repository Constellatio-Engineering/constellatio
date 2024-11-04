export const removeHtmlTagsFromString = (htmlString: string, replaceWithBlankCharacter: boolean): string =>
{
  const stingWithoutHtmlTags = htmlString.replace(/<\/?[^>]+(>|$)/g, replaceWithBlankCharacter ? " " : "");
  const stringWithoutEntities = stingWithoutHtmlTags.replace(/&[^\s;]+;/g, replaceWithBlankCharacter ? " " : "");
  const stringWithoutMultipleSpaces = stringWithoutEntities.replace(/\s\s+/g, " ");

  return stringWithoutMultipleSpaces;
};
