import { type NextPage } from "next";
import { useRouter } from "next/router";

const Confirm: NextPage = () =>
{
  const router = useRouter();
  const urlSearchParams = new URLSearchParams(router.asPath.split("#")[1]);
  const params = Object.fromEntries(urlSearchParams.entries());

  return (
    <div style={{ padding: 100 }}>
      {params.error ? (
        <>
          <h1>E-Mail Bestätigung nicht erfolgreich</h1>
          <p>{params.error_description}</p>
        </>
      ) : (
        <>
          <h1>Bestätigung erfolgreich</h1>
          <p>Du kannst diesen Tab jetzt schließen und in deinem ursprünglichen Tab fortfahren</p>
        </>
      )}
    </div>
  );
};

export default Confirm;
