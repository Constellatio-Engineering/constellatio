import { Footer } from "@/components/organisms/Footer/Footer";
import { Header } from "@/components/organisms/Header/Header";
import { UpdatePasswordForm } from "@/components/organisms/UpdatePasswordForm/UpdatePasswordForm";
import { paths } from "@/utils/paths";

import { Box, Stack } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { type FunctionComponent, useEffect, useState } from "react";

type RecoverPagePropsContent = "unknownError" | "linkExpired" | "updatePasswordForm";

const RecoverPage: FunctionComponent = () =>
{
  const router = useRouter();
  const { error, error_description: errorDescription } = router.query;
  const [renderedContent, setRenderedContent] = useState<RecoverPagePropsContent | null>(null);

  useEffect(() =>
  {
    if(error)
    {
      if(errorDescription === "Email link is invalid or has expired")
      {
        setRenderedContent("linkExpired");
      }
      else
      {
        setRenderedContent("unknownError");
      }
    }
    else
    {
      setRenderedContent("updatePasswordForm");
    }
  }, [error, errorDescription]);

  if(renderedContent == null)
  {
    return null;
  }

  return (
    <Stack align="center" h="100vh" justify="center">
      <Header variant="simple"/>
      <Box w={440}>
        {renderedContent === "updatePasswordForm" ? (
          <UpdatePasswordForm/>
        ) : (
          <div>
            <h1>{renderedContent === "linkExpired" ? "Link expired" : "Something went wrong"}</h1>
            <p>Please go back to Login and reset your password again</p>
            <Link href={paths.login}>
              <button type="button">Back to Login</button>
            </Link>
            <p>Note from Kotti: This button should be a link that looks like a button</p>
          </div>
        )}
      </Box>
      <div style={{ height: 50 }}/>
      <Footer variant="simpleWhiteBg"/>
    </Stack>
  );
};

export default RecoverPage;
