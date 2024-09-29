// function that shuffles an array with the Fisher-Yates algorithm
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

type Identifiable ={
  id: string | number;
};

/**
 * This function takes an array of arrays and returns an array that contains all elements that are present in all arrays.
 * It uses the identifierKey to identify the elements, this could for example be the id of an object.
 * @param sets - An array of arrays
 * @param identifierKey - The key of the object that should be used to identify the elements
 * @returns An array that contains all elements that are present in all arrays
 */
export function findIntersection<T extends object>(
  sets: Array<T[] | null>,
  identifierKey: keyof T & (string | number)
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

  const shortestSet = new Set(filteredSets[0]!.map(item => item[identifierKey]));
  const result: T[] = [];

  for(const item of filteredSets[0]!)
  {
    if(filteredSets.every((set, index) => index === 0 || set.some(element => shortestSet.has(element[identifierKey]))))
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
