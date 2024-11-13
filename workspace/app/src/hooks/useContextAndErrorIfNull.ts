import { type Context, useContext } from "react";

const useContextAndErrorIfNull = <T>(context: Context<T>): NonNullable<T> =>
{
  const contextValue = useContext(context); 

  if(contextValue == null)
  {
    throw Error("Context has not been Provided!");
  }

  return contextValue;
};

export default useContextAndErrorIfNull;
