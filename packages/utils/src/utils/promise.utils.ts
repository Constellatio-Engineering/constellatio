import { AxiosError, AxiosResponse } from "axios";

export const printAllSettledPromisesSummary = (settledPromises: Array<PromiseSettledResult<unknown>>, actionName: string): void =>
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