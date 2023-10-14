import { type IGenSearch } from "../graphql/__generated/sdk";
import { caisySDK } from "../graphql/getSdk";

const getPopularSearches = async (): Promise<IGenSearch> => 
{
  try 
  {
    const { Search } = await caisySDK.getPopularSearches(); 

    if(!Search) 
    {
      throw new Error("No popular searches found");
    }

    return Search;
  }
  
  catch (error) 
  {
    console.error("error at getting popular searches", error);
    throw error;
  }
};

export default getPopularSearches;
