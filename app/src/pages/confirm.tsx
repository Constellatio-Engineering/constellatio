import ConfirmEmailPage from "@/components/confirmPages/ConfirmEmailPage";
import { Footer } from "@/components/organisms/Footer/Footer";
import { Header } from "@/components/organisms/Header/Header";
import PageHead from "@/components/pageHead/PageHead";

import { type NextPage } from "next";

const Confirm: NextPage = () => (
  <>
    <PageHead pageTitle="E-Mail bestätigen"/>
    <Header variant="simple"/>
    <ConfirmEmailPage/>
    <Footer variant="simpleWhiteBg"/> 
  </>
);

export default Confirm;
