// eslint-disable-next-line import/no-unused-modules
export const sleep = async (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export const getFileNameWithoutExtension = (filename: string): string =>
{
  return filename.split(".").slice(0, -1).join(".");
};

export const removeItemsByIndices = <T>(arrayToDeleteItemsFrom: T[], indices: number[]): T[] =>
{
  const resultArray = [...arrayToDeleteItemsFrom];

  // Sort the indices array in descending order to ensure proper removal
  indices.sort((a, b) => b - a);

  // Remove items from the result array using the indices
  for(const index of indices) 
  {
    if(index >= 0 && index < resultArray.length) 
    {
      resultArray.splice(index, 1);
    }
  }

  return resultArray;
};
