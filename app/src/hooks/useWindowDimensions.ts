import { useEffect, useState } from "react";

interface IWindowDimensions
{
  height: number;
  width: number;
}

const getWindowDimensions = (): IWindowDimensions => ({
  height: window.innerHeight,
  width: window.innerWidth,
});

export const useWindowDimensions = (): IWindowDimensions | null =>
{
  const [windowDimensions, setWindowDimensions] = useState<IWindowDimensions | null>(null);
  const handleResize = (): void => setWindowDimensions(getWindowDimensions());

  useEffect(() =>
  {
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};
