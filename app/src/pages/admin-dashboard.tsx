import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
/* import DashboardPage from "@/components/pages/dashboardPage/DashboardPage"; */
import { type NextPageWithLayout } from "@/pages/_app";
import { api } from "@/utils/api";

const AdminDashboard: NextPageWithLayout = () =>
{
  const { data: casesAverageObject, error, isLoading } = api.internTrackingFromPosthog.getCasesSolveTimeAverage.useQuery();

  /* TODO:: aulagern in component wenn die Zeit dafür da ist */

  if(error)
  {
    return "Fehler beim Laden der Daten";
  }

  if(isLoading)
  {
    return "Daten werden noch geladen";
  }

  return (
    <>
      <PageHead pageTitle="AdminDashboard"/>
      {/* <DashboardPage/> */}
  
      <table>
        <thead>
          <tr>
            <td>Case Url</td>
            <td>Average Time to solve</td>
          </tr>
        </thead>
        <tbody>
          {Object.entries(casesAverageObject).map(([key, value]) => (
            <tr key={key}>
              <td style={{ paddingBlock: 6, paddingInline: 8, }}>{key}</td>
              <td style={{ paddingBlock: 6, paddingInline: 8, }}>{`${Math.floor(value / 60000)} Minuten`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );  
};

AdminDashboard.getLayout = Layout;

export default AdminDashboard;
