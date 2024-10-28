import { useLegalFields } from "@/hooks/useLegalFields";
import { useSubfields } from "@/hooks/useSubfields";
import { useTopics } from "@/hooks/useTopics";

export const useLegalFieldsAndTopics = () =>
{
  const { data: allSubfields = [], isLoading: areSubfieldsLoading = [] } = useSubfields();
  const { data: allLegalFields = [], isLoading: areLegalFieldsLoading = [] } = useLegalFields();
  const { data: allTopics = [], isLoading: areTopicsLoading = [] } = useTopics();

  return ({
    allLegalFields,
    allSubfields,
    allTopics, 
    isLoading: areSubfieldsLoading || areLegalFieldsLoading || areTopicsLoading,
  });
};
