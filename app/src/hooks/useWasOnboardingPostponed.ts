import { useLocalStorage } from "@mantine/hooks";
import { z } from "zod";

const schema = z.discriminatedUnion("wasOnboardingPostponed", [
  z.object({
    dateOfPostponement: z.string().transform(value => new Date(value)),
    wasOnboardingPostponed: z.literal(true),
  }),
  z.object({
    wasOnboardingPostponed: z.literal(false),
  }),
]);

type WasOnboardingPostponed = z.infer<typeof schema>;

const localStorageKey = "wasOnboardingPostponed";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useWasOnboardingPostponed = () =>
{
  return useLocalStorage<WasOnboardingPostponed>({
    defaultValue: {
      wasOnboardingPostponed: false
    },
    deserialize: (localStorageValue) =>
    {
      let wasPostponed: WasOnboardingPostponed;

      try
      {
        const parsedValue = JSON.parse(localStorageValue) as unknown;
        wasPostponed = schema.parse(parsedValue);

        // check if the date from 'dateOfPostponement' is older than 24 hours
        if(wasPostponed.wasOnboardingPostponed && (new Date().getTime() - wasPostponed.dateOfPostponement.getTime()) > 24 * 60 * 60 * 1000)
        {
          throw new Error("Postponement date is older than 24 hours");
        }
      }
      catch (e: unknown)
      {
        const fallbackValue: WasOnboardingPostponed = { wasOnboardingPostponed: false };
        localStorage.setItem(localStorageKey, JSON.stringify(fallbackValue));
        wasPostponed = fallbackValue;
      }

      return wasPostponed;
    },
    key: localStorageKey,
    serialize: (value) => JSON.stringify(value),
  });
};
