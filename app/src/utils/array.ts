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
