import ConfirmEmailChangePage from "@/components/confirmPages/ConfirmEmailChangePage";
import { Footer } from "@/components/organisms/Footer/Footer";
import { Header } from "@/components/organisms/Header/Header";
import PageHead from "@/components/pageHead/PageHead";

import { type NextPage } from "next";

const Confirm: NextPage = () => (
  <>
    <PageHead pageTitle="Änderung der E-Mail bestätigen"/>
    <Header variant="simple"/>
    <ConfirmEmailChangePage/>
    <Footer variant="simpleWhiteBg"/> 
  </>
);

export default Confirm;
