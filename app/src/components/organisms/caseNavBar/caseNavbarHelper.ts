export function calculateScrollProgress(elementId?: string): number 
{
  const element = document.getElementById(elementId ?? "");
  if(!element) 
  {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    const scrollProgress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    return scrollProgress;
  }
  const elementOffsetTop = element.offsetTop;
  const elementHeight = element.offsetHeight;
  const elementBottomOffset = elementOffsetTop + elementHeight;
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
  const scrollableHeight = elementBottomOffset - elementOffsetTop;
  const currentScrollPosition = Math.min(Math.max(scrollTop - elementOffsetTop, 0), scrollableHeight - clientHeight);
  const scrollProgress = (currentScrollPosition / (scrollableHeight - clientHeight)) * 100;
  return scrollProgress;
}
