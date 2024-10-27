import type React from "react";

export const updateHTML = (ref: React.RefObject<HTMLElement>, html: string): void =>
{
  if(ref.current)
  {
    ref.current.innerHTML = html;
  }
};
