import { api } from "@/utils/api";

import { type FunctionComponent } from "react";

const Trpc: FunctionComponent = () =>
{
  const { data: helloData } = api.example.hello.useQuery({ text: "from tRPC" });

  console.log("helloData", helloData);

  return (
    <div>
      {helloData ? <h1>{helloData.greeting}</h1> : <h1>Loading...</h1>}
      <p>Does this work?</p>
    </div>
  );
};

export default Trpc;
