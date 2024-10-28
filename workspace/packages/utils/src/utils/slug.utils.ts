export const slugFormatter = (name: string): string =>
{
  // Define a mapping of German characters to English equivalents
  const germanToEnglishMap: { [key: string]: string } = {
    ß: "ss",
    ä: "ae",
    ö: "oe",
    ü: "ue",
    // Add more mappings for other German characters as needed
  };

  // Replace German characters with their English equivalents
  let modifiedName = name.toLowerCase();
  for(const germanChar in germanToEnglishMap)
  {
    if(Object.prototype.hasOwnProperty.call(germanToEnglishMap, germanChar))
    {
      modifiedName = modifiedName.replace(new RegExp(germanChar, "g"), germanToEnglishMap[germanChar]!);
    }
  }

  // Perform the slug formatting
  modifiedName = modifiedName
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");

  return modifiedName;
};
