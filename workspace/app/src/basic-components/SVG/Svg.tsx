import { updateHTML } from "@/utils/update-html";

import { type Maybe } from "graphql/jsutils/Maybe";
import { useEffect, useRef } from "react";

export const Svg: React.FC<{ readonly className?: string;readonly src: Maybe<string> | undefined }> = ({ className, src }) => 
{
  const svgRef = useRef<HTMLDivElement>(null);

  useEffect(() => 
  {
    if(src)
    {
      fetch(src)
        .then(async (res) => res.text())
        .then((res) => 
        {
          if(svgRef.current) 
          {
            updateHTML(svgRef, res);
          }
        }).catch((err) => console.error(err));
    }
  }, [src]);

  return <div className={className} ref={svgRef}/>;
};
