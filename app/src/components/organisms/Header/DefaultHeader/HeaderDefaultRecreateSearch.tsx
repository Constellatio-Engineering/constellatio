import { Loader, Menu } from "@mantine/core";
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
    <Menu.Item
      disabled={isRecreatingSearchIndices}
      closeMenuOnClick={false}
      onClick={() => recreateSearchIndices()}
      icon={null}>
      <div style={{ alignItems: "center", display: "flex" }}>
        Recreate Search Indices
        {isRecreatingSearchIndices && <Loader size={22} ml={6}/>}
      </div>
    </Menu.Item>
  );
};

export default HeaderDefaultRecreateSearch;
