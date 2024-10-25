import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import { AdminPage } from "@/components/pages/AdminPage/AdminPage";
import type { NextPageWithLayout } from "@/pages/_app";

const Admin: NextPageWithLayout = () =>
{
  return (
    <>
      <PageHead pageTitle={"Admin"}/>
      <AdminPage/>
    </>
  );
};

Admin.getLayout = Layout;

export default Admin;
