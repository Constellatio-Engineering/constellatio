import { type Maybe } from "graphql/jsutils/Maybe";
import React, { useEffect, useRef } from "react";

const updateHTML = (ref: React.MutableRefObject<any>, html: string): void => 
{
  if(ref.current) 
  {
    ref.current.innerHTML = html;
  }
};

export const Svg: React.FC<{ readonly className?: string;readonly src: Maybe<string> | undefined }> = ({ className, src }) => 
{
  const svgRef = useRef(null);

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
