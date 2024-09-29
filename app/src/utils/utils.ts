/* eslint-disable import/no-unused-modules */
import { type Nullable } from "@/utils/types";

import { AxiosError, type AxiosResponse } from "axios";
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

export const removeHtmlTagsFromString = (htmlString: string, replaceWithBlankCharacter: boolean): string =>
{
  const stingWithoutHtmlTags = htmlString.replace(/<\/?[^>]+(>|$)/g, replaceWithBlankCharacter ? " " : "");
  const stringWithoutEntities = stingWithoutHtmlTags.replace(/&[^\s;]+;/g, replaceWithBlankCharacter ? " " : "");
  const stringWithoutMultipleSpaces = stringWithoutEntities.replace(/\s\s+/g, " ");

  return stringWithoutMultipleSpaces;
};

export const formatDate = (inputDate: Date): string =>
{
  const date = new Date(inputDate);
  const day = date.getDate();

  const months = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${monthName}, ${year}`;
};

export const scrollTo = (element: HTMLElement, offset = 100): void =>
{
  const y = element.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ behavior: "smooth", top: y });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const printAllSettledPromisesSummary = (settledPromises: Array<PromiseSettledResult<unknown>>, actionName: string): void =>
{
  const failedPromises = settledPromises.filter((result): result is PromiseRejectedResult => result.status === "rejected");
  const successfulPromises = settledPromises.filter((result): result is PromiseFulfilledResult<AxiosResponse> => result.status === "fulfilled");

  const errors = failedPromises.map((failedPromise) =>
  {
    const error = failedPromise.reason;

    if(error instanceof AxiosError)
    {
      console.error(`Error while task'${actionName}' - ${error.response?.status} (${error.response?.statusText}). Response:`, error.response?.data);
      return error.response;
    }
    else
    {
      console.error(`Error while task '${actionName}':`, error);
      return error;
    }
  });

  console.info(`Task '${actionName}' finished. Results: ${successfulPromises.length} successful promises, ${failedPromises.length} failed promises`);

  if(failedPromises.length > 0)
  {
    console.error(`At least task of action '${actionName}' failed`, errors);
  }
};

export type ObjectKeys<T extends object> = `${Exclude<keyof T, symbol>}`;

export const objectKeys = Object.keys as <Type extends object>(value: Type) => Array<ObjectKeys<Type>>;

export function getIsPrimitive(value: unknown): value is string | number | boolean
{
  return typeof value === "string" || typeof value === "number" || typeof value === "boolean";
}

export function getIsObjectWithId(value: unknown): value is { id: unknown } 
{
  return value != null && typeof value === "object" && "id" in value;
}

export function getDistinctItemsById<T extends Nullable<{ id?: Nullable<string | number> }>>(items: T[]): T[]
{
  return [
    ...new Map(items
      .filter(Boolean)
      .filter(item => item.id != null)
      .map(item => [item.id, item])
    ).values()
  ];
}
