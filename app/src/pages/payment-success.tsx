import { Footer } from "@/components/organisms/Footer/Footer";
import { Header } from "@/components/organisms/Header/Header";
import PageHead from "@/components/pageHead/PageHead";
import PaymentConfirmPage from "@/components/pages/paymentConfirmPage/PaymentConfirmPage";

import { type NextPage } from "next";

const Page: NextPage = () => 
{
  return (
    <>
      <PageHead pageTitle="Willkommen!"/>
      <Header variant="simple"/>
      <PaymentConfirmPage/>
      <Footer variant="simpleWhiteBg"/> 
    </>
  );
};

export default Page;
