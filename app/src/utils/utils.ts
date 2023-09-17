// eslint-disable-next-line import/no-unused-modules
export const sleep = async (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export const getFileNameWithoutExtension = (filename: string): string =>
{
  return filename.split(".").slice(0, -1).join(".");
};
