import formbricks from "@formbricks/js";

interface TInitFormbricks 
{
  readonly apiHost: string;
  readonly debug: boolean;
  readonly email: string;
  readonly environmentId: string;
  readonly userId: string;
}

const logoutFormbricks = (): void => 
{
  void formbricks.logout();
};

// TODO:: add it later if necessary currently not in use
/* const registerRouteChangeFormbricks = (): void => 
{
  void formbricks?.registerRouteChange();
}; */

const initFormbricks = (initialData: TInitFormbricks): void => 
{
  const {
    apiHost,
    debug,
    email,
    environmentId,
    userId
  } = initialData;

  void formbricks.init({
    apiHost,
    debug,
    environmentId,
    userId,
  });

  void formbricks.setEmail(email);
};

export { initFormbricks, logoutFormbricks /* , registerRouteChangeFormbricks */ };
