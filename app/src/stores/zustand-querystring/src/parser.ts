export function stringify(input: unknown) 
{
  console.log("stringify", input);
  return encodeURIComponent(JSON.stringify(input));
} 

export function parse(str: string) 
{
  console.log("parse", str);
  return JSON.parse(decodeURIComponent(str));
}
