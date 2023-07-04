import { AuthLayout } from "@/components/layouts/AuthLayout";
import { AuthPage } from "@/components/pages/AuthPage";

export default function Recover() {
  return (
    <AuthLayout>
      <AuthPage tab="login" />
    </AuthLayout>
  );
}
