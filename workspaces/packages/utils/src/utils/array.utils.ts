/* eslint-disable import/no-unused-modules */

// function that shuffles an array with the Fisher-Yates algorithm
import { type Nullable, Primitive } from "@constellatio/utility-types";

export const shuffleArray = <T>(array: T[]): T[] =>
{
  if(!Array.isArray(array) || array.length === 0)
  {
    return [];
  }

  const shuffledArray = [...array];

  for(let i = shuffledArray.length - 1; i > 0; i--)
  {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j] as T, shuffledArray[i] as T];
  }

  return shuffledArray;
};

// function that checks if 2 arrays are equal sets (ignoring order)
export const areArraysEqualSets = <T extends string | number | boolean | null | undefined>(arrayA: T[], arrayB: T[]): boolean =>
{
  const superSet: {
    [key: string]: number;
  } = {};

  for(const i of arrayA)
  {
    const e = i + typeof i;
    superSet[e] = 1;
  }

  for(const i of arrayB)
  {
    const e = i + typeof i;
    if(!superSet[e])
    {
      return false;
    }
    superSet[e] = 2;
  }

  for(const e in superSet)
  {
    if(superSet[e] === 1)
    {
      return false;
    }
  }

  return true;
};

/**
 * Generically compares two arrays of objects based on a specified identifierKey.
 *
 * @param arr1 The first array to compare
 * @param arr2 The second array to compare
 * @param identifierKey The key to use for comparison
 * @returns boolean indicating whether the arrays are equal based on the specified identifierKey
 */
export function areArraysEqualByKey<T>(arr1: T[], arr2: T[], identifierKey: keyof T): boolean
{
  if(arr1.length !== arr2.length) { return false; }

  const countMap = new Map<T[keyof T], number>();

  for(const item of arr1) 
  {
    const value = item[identifierKey];
    countMap.set(value, (countMap.get(value) || 0) + 1);
  }

  for(const item of arr2) 
  {
    const value = item[identifierKey];
    const count = countMap.get(value);
    if(count === undefined) { return false; }
    if(count === 1) { countMap.delete(value); }
    else { countMap.set(value, count - 1); }
  }

  return countMap.size === 0;
}

export function getDoesAnyItemMatch<T extends Record<string, unknown>>(values: T[], key: keyof T, value: NonNullable<T[keyof T]>): boolean
{
  return values.some(v => v[key] === value);
}

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

export function getDistinctItemsByKey<T>(items: Array<Nullable<T>>, key: keyof T): T[]
{
  return [
    ...new Map(
      items
        .filter(Boolean)
        .filter(item => item[key] != null)
        .map(item => [item[key], item])
    ).values()
  ];
}

export function removeConsecutiveDuplicates<T extends Record<K, Primitive>, K extends keyof T>(
  arr: T[],
  key: K
): T[] 
{
  return arr.filter((obj, index, array) => 
  {
    // If it's the first element, keep it
    if(index === 0) { return true; }

    // Compare the current object's specified property with the previous object's
    return obj[key] !== array[index - 1]![key];
  });
}

/**
 * This function takes an array of arrays and returns an array that contains all elements that are present in all arrays.
 * It uses the identifierKey to identify the elements, this could for example be the id of an object.
 *
 * @param sets - An array of arrays
 * @param identifierKey - The key of the object that should be used to identify the elements.
 * @returns An array that contains all elements that are present in all arrays
 */
export function findIntersection<T extends object>(
  sets: Array<T[] | null>,
  identifierKey: keyof T,
): T[]
{
  const filteredSets = sets.filter(Boolean) as T[][];

  if(filteredSets.length === 0)
  {
    return [];
  }

  if(filteredSets.length === 1)
  {
    return filteredSets[0]!;
  }

  // Sort sets by length, so we can get the shortest set first
  filteredSets.sort((a, b) => a.length - b.length);

  // make sure the shortest set is actually a set and only contains unique elements
  const shortestSet = getDistinctItemsByKey(filteredSets[0]!, identifierKey);

  const result: T[] = [];

  for(const item of shortestSet)
  {
    // check if the item is present in all sets
    const isPresentInAllSets = filteredSets.every((set, index) =>
    {
      if(index === 0)
      {
        return true;
      }

      const doesAnySetElementMatch = set.some(element =>
      {
        return element[identifierKey] === item[identifierKey];
      });

      return doesAnySetElementMatch;
    });

    if(isPresentInAllSets)
    {
      result.push(item);
    }
  }

  return result;
}

/* export function findIntersectionOld<T extends Identifiable>(sets: T[][]): T[]
{
  const resultMap = new Map<string, { count: number; item: T }>();

  for(const set of sets)
  {
    for(const item of set)
    {
      if(resultMap.has(item.id))
      {
        const existingEntry = resultMap.get(item.id)!;
        resultMap.set(item.id, {
          count: existingEntry.count + 1,
          item
        });
      }
      else
      {
        resultMap.set(item.id, {
          count: 1,
          item
        });
      }
    }
  }

  const resultArray: T[] = [];

  resultMap.forEach((value) =>
  {
    if(value.count === sets.length)
    {
      resultArray.push(value.item);
    }
  });

  return resultArray;
}*/
