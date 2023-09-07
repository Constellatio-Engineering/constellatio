export function calculateScrollProgress(): number 
{
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
  const scrollProgress = (scrollTop / (scrollHeight - clientHeight)) * 100;
  return scrollProgress;
}
