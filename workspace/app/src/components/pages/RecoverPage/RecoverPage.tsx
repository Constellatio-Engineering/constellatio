import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { AlertCard } from "@/components/atoms/Card/AlertCard";
import { Footer } from "@/components/organisms/Footer/Footer";
import { Header } from "@/components/organisms/Header/Header";
import { UpdatePasswordForm } from "@/components/organisms/UpdatePasswordForm/UpdatePasswordForm";

import { Box, Stack, Title } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { type FunctionComponent, useEffect, useState } from "react";

import { authPaths } from "@/utils/paths";

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
    <>
      <Header variant="simple"/>
      <Stack
        align="center"
        h="90vh"
        justify="center">
        <Box w={440}>
          {renderedContent === "updatePasswordForm" ? (
            <UpdatePasswordForm/>
          ) : (
            <>
              <Title order={3} ta="center" mb={24}>{renderedContent === "linkExpired" ? "Link expired" : "Something went wrong"}</Title>
              <AlertCard mb={24} variant="error"> {renderedContent === "linkExpired" ? "Your password reset link has expired or the link has already been used" : "Something went wrong sending the reset password link. Do not worry, you can request it again"}</AlertCard>
              <BodyText styleType="body-01-medium" ta="center" component="p">Please go back to Login and reset your password again</BodyText>
              <Link href={authPaths.login}>
                <Button<"button">
                  style={{ display: "block", width: "100%" }}
                  styleType="primary"
                  type="button"
                  size="large"
                  mt={24}>
                  Back to Login
                </Button>
              </Link>
            </>
          )}
        </Box>
      </Stack>
      <Footer variant="simpleWhiteBg"/>
    </>
  );
};

export default RecoverPage;
