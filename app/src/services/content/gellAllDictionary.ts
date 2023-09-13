/* eslint-disable @typescript-eslint/naming-convention */
import { type IGenGetAllDictionaryQuery } from "../graphql/__generated/sdk";
import { caisySDK } from "../graphql/getSdk";

const getAllDictionary = async (): Promise<IGenGetAllDictionaryQuery> => {
	try {
		const allDictionaryRes = await caisySDK.getAllDictionary();
		return allDictionaryRes;
	} catch (error) {
		console.error("error at getting all Dictionary", error);
		throw error;
	}
};

export default getAllDictionary;
