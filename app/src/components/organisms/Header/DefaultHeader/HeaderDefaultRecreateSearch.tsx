import { Button } from "@/components/atoms/Button/Button";

import { Loader } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { type FunctionComponent } from "react";

const HeaderDefaultRecreateSearch: FunctionComponent = () => 
{
  const { isPending: isRecreatingSearchIndices, mutate: recreateSearchIndices } = useMutation({
    mutationFn: async () => axios.post("/api/search/recreate-search-indices"),
    onError: (e: unknown) =>
      console.log(
        "error while recreating search indices",
        e instanceof AxiosError ? e.response?.data : e
      ),
    onSuccess: () => console.log("successfully recreated search indices"),
  });

  return (
    <div style={{ alignItems: "center", display: "flex" }}>
      <Button<"button">
        styleType="secondarySubtle"
        disabled={isRecreatingSearchIndices}
        type="button"
        onClick={() => recreateSearchIndices()}
        style={{ marginRight: 10 }}>
        Recreate Search Indices
      </Button>
      {isRecreatingSearchIndices && <Loader size={22}/>}
    </div>
  
  );
};

export default HeaderDefaultRecreateSearch;
