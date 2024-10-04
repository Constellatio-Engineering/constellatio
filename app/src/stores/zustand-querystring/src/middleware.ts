/* eslint-disable @typescript-eslint/no-use-before-define,max-lines */
import { cloneDeep, isEqual, mergeWith } from "lodash-es";
import { type StateCreator, type StoreMutatorIdentifier } from "zustand/vanilla";

import { parse, stringify } from "./parser";

type DeepSelect<T> = T extends object
  ? {
    [P in keyof T]?: DeepSelect<T[P]> | boolean;
  }
  : boolean;

export interface QueryStringOptions<T> 
{
  key?: string;
  select?: (pathname: string) => DeepSelect<T>;
  url?: string;
}

type QueryString = <
  T,
  Mps extends Array<[StoreMutatorIdentifier, unknown]> = [],
  Mcs extends Array<[StoreMutatorIdentifier, unknown]> = [],
>(
  initializer: StateCreator<T, Mps, Mcs>,
  options?: QueryStringOptions<T>,
) => StateCreator<T, Mps, Mcs>;

type QueryStringImpl = <T>(
  storeInitializer: StateCreator<T, [], []>,
  options?: QueryStringOptions<T>,
) => StateCreator<T, [], []>;

const compact = (newState, initialState) => 
{
  const output = newState instanceof Map ? new Map() : {};
  const keys = newState instanceof Map ? Array.from(newState.keys()) : Object.keys(newState);

  keys.forEach(key => 
  {
    const newValue = newState instanceof Map ? newState.get(key) : newState[key];
    const initialValue = initialState instanceof Map ? initialState.get(key) : initialState[key];

    if(
      newValue !== null &&
      newValue !== undefined &&
      typeof newValue !== "function" &&
      !isEqual(newValue, initialValue)
    ) 
    {
      if(typeof newValue === "object" && !Array.isArray(newValue)) 
      {
        const value = compact(newValue, initialValue);
        if(value && (value instanceof Map ? value.size > 0 : Object.keys(value).length > 0)) 
        {
          if(output instanceof Map) 
          {
            output.set(key, value);
          }
          else 
          {
            output[key] = value;
          }
        }
      }
      else 
      {
        if(output instanceof Map) 
        {
          output.set(key, newValue);
        }
        else 
        {
          output[key] = newValue;
        }
      }
    }
  });

  return output;
};

// const compact = (newState, initialState) =>
// {
//   const output = {};
//   Object.keys(newState).forEach(key =>
//   {
//     if(
//       newState[key] !== null &&
//       newState[key] !== undefined &&
//       typeof newState[key] !== "function" &&
//       !isEqual(newState[key], initialState[key])
//     )
//     {
//       if(typeof newState[key] === "object" && !Array.isArray(newState[key]))
//       {
//         const value = compact(newState[key], initialState[key]);
//         if(value && Object.keys(value).length > 0)
//         {
//           output[key] = value;
//         }
//       }
//       else
//       {
//         output[key] = newState[key];
//       }
//     }
//   });
//
//   return output;
// };

const translateSelectionToState = <T>(selection: DeepSelect<T>, state: T) => 
{
  console.log("translateSelectionToState", { selection, state });

  if(typeof state !== "object" || !state) 
  {
    console.log("state is not an object");

    return {};
  }
  return Object.keys(selection).reduce((acc, key) => 
  {
    console.log({ key, selection, state });

    if(!(key in state)) 
    {
      console.log("key not in state");
      return acc;
    }
    const value = selection[key];

    console.log("value", value);

    if(typeof value === "boolean") 
    {
      console.log("value is boolean");

      if(value) 
      {
        console.log("acc[key] = state[key] for key", key);
        acc[key] = state[key];
      }
    }
    else 
    {
      console.log("value is not boolean");
      acc[key] = translateSelectionToState(value, state[key]);
    }
    return acc;
  }, {} as T);
};

const queryStringImpl: QueryStringImpl = (fn, options?) => (set, get, api) => 
{
  const defaultedOptions = {
    key: "state",
    ...options,
  };
  const { url } = defaultedOptions;

  const getStateFromUrl = (url: URL) => 
  {
    const match = url.searchParams.get(defaultedOptions.key);
    if(match) 
    {
      return parse(match);
    }
    return null;
  };

  const getSelectedState = (state, pathname) => 
  {
    if(defaultedOptions.select) 
    {
      const selection = defaultedOptions.select(pathname);
      // translate the selection to state
      const selectedState = translateSelectionToState(selection, state);

      console.log("selectedState", selectedState);

      return selectedState;
    }
    return state ?? {};
  };

  const initialize = (url: URL, initialState) => 
  {
    try
    {
      const stateFromURl = getStateFromUrl(url);

      console.log("stateFromURl", stateFromURl);

      if(!stateFromURl) 
      {
        console.log("stateFromURl is null");
        return initialState;
      }

      const deepClonedInitialState = cloneDeep(initialState);
      const selectedState = getSelectedState(stateFromURl, url.pathname);

      console.log("deepClonedInitialState", deepClonedInitialState);
      console.log("selectedState", selectedState);

      const merged = mergeWith(
        deepClonedInitialState,
        selectedState,
      );

      console.log("merged", merged);

      set(merged, true);
      return merged;
    }
    catch (error) 
    {
      console.error(error);
      return initialState;
    }
  };

  if(typeof window !== "undefined") 
  {
    const initialState = cloneDeep(
      fn(
        (...args) => 
        {
          set(...args);
          setQuery();
        },
        get,
        api,
      ),
    );

    console.log("initialState", initialState);

    const setQuery = () => 
    {
      const url = new URL(window.location.href);
      const selectedState = getSelectedState(get(), url.pathname);
      const newCompacted = compact(selectedState, initialState);
      const previous = url.search;
      if(Object.keys(newCompacted).length) 
      {
        url.searchParams.set(defaultedOptions.key, stringify(newCompacted));
      }
      else 
      {
        url.searchParams.delete(defaultedOptions.key);
      }
      if(url.search !== previous) 
      {
        history.replaceState(history.state, "", url);
      }
    };

    // @ts-expect-error dont know why this is needed
    if(!api.__ZUSTAND_QUERYSTRING_INIT__)
    {
      // @ts-expect-error dont know why this is needed
      api.__ZUSTAND_QUERYSTRING_INIT__ = true;
      let previousPathname = "";
      const cb = () => 
      {
        if(location.pathname !== previousPathname) 
        {
          previousPathname = location.pathname;
          setTimeout(setQuery, 100);
        }
        requestAnimationFrame(cb);
      };
      requestAnimationFrame(cb);
    }

    const originalSetState = api.setState;
    api.setState = (...args) => 
    {
      originalSetState(...args);
      setQuery();
    };

    return initialize(new URL(window.location.href), initialState);
  }
  else if(url) 
  {
    return initialize(new URL(url, "http://localhost"), fn(set, get, api));
  }

  return fn(set, get, api);
};

export const querystring = queryStringImpl as unknown as QueryString;
