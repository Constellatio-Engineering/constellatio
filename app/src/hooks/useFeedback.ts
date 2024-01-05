import { env } from "@/env.mjs";
import { supabase } from "@/lib/supabase";
import { isProduction } from "@/utils/env";

import formbricks, { type FormbricksType } from "@formbricks/js";
import { type AuthChangeEvent, type Session } from "@supabase/gotrue-js";
import { useEffect, useRef } from "react";

export const useFeedback = (): void => 
{
  const formBricksRef = useRef<FormbricksType | null>(null);
   
  useEffect(() => 
  {    
    const handleAuthStateChange = async (
      event: AuthChangeEvent,
      session: Session | null
    ): Promise<void> => 
    {
      switch (event) 
      {
        case "INITIAL_SESSION":
        case "SIGNED_IN":
          const { email, id } = session?.user || {};
  
          if(!id || !email || formBricksRef.current)
          {
            break;
          } 

          try 
          {
            await formbricks.init({
              apiHost: env.NEXT_PUBLIC_FORMBRICKS_HOST,
              debug: false, // !isProduction,
              environmentId: isProduction
                ? env.NEXT_PUBLIC_FORMBRICKS_KEY_PRODUCTION
                : env.NEXT_PUBLIC_FORMBRICKS_KEY_TESTINGS,
              userId: id,
            });

            await formbricks.setEmail(email);
            formBricksRef.current = formbricks;
          }
          catch (error) 
          {
            console.info("Fehler beim initalisieren von Formbricks");
            console.error(error); 
          }
          break;
  
        case "SIGNED_OUT":
          if(formBricksRef.current)
          {            
            formBricksRef.current = null;
          }
          break;
  
        default:
          break;
      }
    };
  
    supabase.auth.onAuthStateChange(handleAuthStateChange);

    return () => { formBricksRef.current = null; };
  }, []);
};
