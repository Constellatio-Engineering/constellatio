/* eslint-disable import/no-unused-modules */
import { v4 as uuidV4 } from "uuid";

export const sleep = async (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export const getFileNameWithoutExtension = (filename: string): string =>
{
  return filename.split(".").slice(0, -1).join(".");
};

export const getIndicesOfSucceededPromises = (promiseResults: Array<PromiseSettledResult<unknown>>): number[] =>
{
  const indicesOfSuccessfulUploads: number[] = [];

  promiseResults.forEach((result, index) =>
  {
    if(result.status === "fulfilled")
    {
      indicesOfSuccessfulUploads.push(index);
    }
  });

  return indicesOfSuccessfulUploads;
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

export const getItemsByIndices = <T>(arrayToGetItemsFrom: T[], indices: number[]): T[] =>
{
  const resultArray: T[] = [];

  for(const index of indices)
  {
    if(index >= 0 && index < arrayToGetItemsFrom.length)
    {
      resultArray.push(arrayToGetItemsFrom[index]!);
    }
  }

  return resultArray;
};

export const getRandomUuid = (): string => uuidV4();

export const downloadFileFromUrl = async (url: string, filename: string): Promise<void> =>
{
  const response = await fetch(url);
  const blob = await response.blob();
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = filename;
  downloadLink.click();
  URL.revokeObjectURL(downloadLink.href);
  downloadLink.remove();
};

export const slugFormatter = (name: string): string => name
  .toLowerCase()
  .replace(/\s+/g, "-")
  .replace(/[^a-z0-9-]/g, "")
  .replace(/-+/g, "-");

export const removeHtmlTagsFromString = (htmlString: string): string =>
{
  return htmlString.replace(/<\/?[^>]+(>|$)/g, "");
};
