import { useEffect } from "react";

export const useDataLossProtection = (hasUnsavedChanges: boolean): void =>
{
  useEffect(() =>
  {
    if(hasUnsavedChanges)
    {
      // the actual value of the string does not matter since this is not editable in modern browsers
      window.onbeforeunload = (): string => "Seite verlassen? Deine Änderungen werden nicht gespeichert";
    }
    else
    {
      window.onbeforeunload = null;
    }
  }, [hasUnsavedChanges]);
};
