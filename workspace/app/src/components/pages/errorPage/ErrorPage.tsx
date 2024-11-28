import { type FunctionComponent, useEffect } from "react";

import * as styles from "./ErrorPage.styles";

type Props = {
  readonly error?: string;
  readonly title?: string;
};

const ErrorPage: FunctionComponent<Props> = ({ error, title }) =>
{
  useEffect(() =>
  {
    if(error)
    {
      console.error(error);
    }
  }, [error]);

  return (
    <div css={styles.wrapper}>
      <h1>{title || "Da ist leider etwas schief gelaufen"}</h1>
    </div>
  );
};

export default ErrorPage;
