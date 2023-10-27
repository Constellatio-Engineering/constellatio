import ConfirmPage from "@/components/confirmPage/ConfirmPage";
import { Footer } from "@/components/organisms/Footer/Footer";
import { Header } from "@/components/organisms/Header/Header";

import { type NextPage } from "next";

const Confirm: NextPage = () => (
  <>
    <Header variant="simple"/>
    <ConfirmPage/>
    <Footer variant="simpleWhiteBg"/> 
  </>
);

export default Confirm;
