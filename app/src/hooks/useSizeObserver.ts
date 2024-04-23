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
    setHeight(Math.round(domRect.height));
    setWidth(Math.round(domRect.width));
  };

  useLayoutEffect(() =>
  {
    if(target.current)
    {
      setSize(target.current.getBoundingClientRect());
    }
  }, [target]);

  useResizeObserver(target, (entry) =>
  {
    setSize(entry.contentRect);
  });

  return { height, width };
};
