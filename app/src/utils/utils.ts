// eslint-disable-next-line import/no-unused-modules
export const sleep = async (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
