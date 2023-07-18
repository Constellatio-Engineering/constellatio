import { Header } from "@/components/organisms/Header/Header";
import { AuthPage } from "@/components/pages/AuthPage/AuthPage";

export default function Login() {
  return (
    <>
      <Header variant="simple" />
      <AuthPage tab="register" />
    </>
  );
}
