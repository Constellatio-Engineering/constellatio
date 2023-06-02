import { AuthLayout } from "@/components/layouts/AuthLayout";
import { AuthPage } from "@/components/pages/AuthPage/AuthPage";

export default function Login() {
  return (
    <AuthLayout>
      <AuthPage tab="register" />
    </AuthLayout>
  );
}
