import useResizeObserver from "@react-hook/resize-observer";
import { type RefObject, useLayoutEffect, useState } from "react";

interface IElementSize
{
  height: number | null;
  width: number | null;
}

export const useSizeObserver = (target: RefObject<HTMLElement>): IElementSize =>
{
  const [height, setHeight] = useState<number | null>(null);
  const [width, setWidth] = useState<number | null>(null);

  const setSize = (domRect: DOMRect): void =>
  {
    console.log("setSize");
    setHeight(Math.round(domRect.height));
    setWidth(Math.round(domRect.width));
  };

  useLayoutEffect(() =>
  {
    console.log("useLayoutEffect");

    if(target.current)
    {
      console.log("useLayoutEffect target.current");
      setSize(target.current.getBoundingClientRect());
    }
    else
    {
      console.log("useLayoutEffect !target.current");
    }
  }, [target]);

  useResizeObserver(target, (entry) =>
  {
    console.log("useResizeObserver callback");
    setSize(entry.contentRect);
  });

  return { height, width };
};
