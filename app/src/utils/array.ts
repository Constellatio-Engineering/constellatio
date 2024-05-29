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
