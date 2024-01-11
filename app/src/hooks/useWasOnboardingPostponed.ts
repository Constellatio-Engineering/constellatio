import { useSessionStorage } from "@mantine/hooks";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useWasOnboardingPostponed = () =>
{
  return useSessionStorage<boolean>({
    defaultValue: false,
    deserialize: (localStorageValue) => Boolean(localStorageValue),
    key: "wasOnboardingPostponed",
    serialize: (value) => value.toString(),
  });
};
