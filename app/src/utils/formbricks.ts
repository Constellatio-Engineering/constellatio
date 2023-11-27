import formbricks from "@formbricks/js";

interface TInitFormbricks 
{
  readonly apiHost: string;
  readonly debug: boolean;
  readonly email: string;
  readonly environmentId: string;
  readonly userId: string;
}

const resetFormbricks = async (): Promise<void> => 
{
  await formbricks.reset();  
};

// TODO:: add it later if necessary currently not in use
/* const registerRouteChangeFormbricks = (): void => 
{
  void formbricks?.registerRouteChange();
}; */

const initFormbricks = async (initialData: TInitFormbricks): Promise<void> => 
{
  const {
    apiHost,
    debug,
    email,
    environmentId,
    userId
  } = initialData;

  await formbricks.init({
    apiHost,
    debug,
    environmentId,
    userId,
  });

  await formbricks.setEmail(email);
};

export { initFormbricks, resetFormbricks /* , registerRouteChangeFormbricks */ };
