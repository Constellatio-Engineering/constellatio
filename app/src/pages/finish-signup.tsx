import { Footer } from "@/components/organisms/Footer/Footer";
import { Header } from "@/components/organisms/Header/Header";
import PageHead from "@/components/organisms/pageHead/PageHead";

import { type NextPage } from "next";

const FinishSignup: NextPage = () => (
  <>
    <PageHead pageTitle="Registrierung abschließen"/>
    <Header variant="simple"/>
    <h1 style={{ margin: 100 }}>Registrierung abschließen</h1>
    <Footer variant="simpleWhiteBg"/> 
  </>
);

export default FinishSignup;
