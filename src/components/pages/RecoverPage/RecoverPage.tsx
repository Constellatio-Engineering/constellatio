import { Box, Stack } from "@mantine/core";

import { Header } from "@/components/organisms/Header/Header";
import { Footer } from "@/components/organisms/Footer/Footer";
import { UpdatePasswordForm } from "@/components/organisms/UpdatePasswordForm/UpdatePasswordForm";

export function RecoverPage() {
  return (
    <Stack align="center" h={"100vh"} justify="space-between">
      <Header variant="simple" />
      <Box w={440}>
        <UpdatePasswordForm />
      </Box>
      <Footer variant="simpleWhiteBg" />
    </Stack>
  );
}
