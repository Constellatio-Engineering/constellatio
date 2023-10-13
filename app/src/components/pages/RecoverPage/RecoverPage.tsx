import { Footer } from "@/components/organisms/Footer/Footer";
import { Header } from "@/components/organisms/Header/Header";
import { UpdatePasswordForm } from "@/components/organisms/UpdatePasswordForm/UpdatePasswordForm";

import { Box, Stack } from "@mantine/core";
import { type FunctionComponent } from "react";

const RecoverPage: FunctionComponent = () => (
  <Stack align="center" h="100vh" justify="center">
    <Header variant="simple"/>
    <Box w={440}>
      <UpdatePasswordForm/>
    </Box>
    <Footer variant="simpleWhiteBg"/>
  </Stack>
);

export default RecoverPage;
