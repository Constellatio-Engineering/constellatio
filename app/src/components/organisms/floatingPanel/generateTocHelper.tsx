/* eslint-disable sort-keys-fix/sort-keys-fix */
import { type IHeadingNode } from "types/richtext";

import { TOCItemComponent } from "./tocItem";

type ContentType = {
  text: string;
  type: string;
};
  
export type DataType = {
  attrs: {
    level: number;
    textAlign: string;
  };
  content: ContentType[];
  type: string;
};
  
export type TOCItem = {
  children: TOCItem[];
  level: number;
  text: string;
};

function decimalToRoman(decimal: number): string 
{
  if(decimal <= 0 || decimal >= 4000) 
  {
    throw new Error("Input out of range (1-3999)");
  }

  const romanNumerals: Array<[string, number]> = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];

  let result = "";
  let remaining = decimal;

  for(const [roman, value] of romanNumerals) 
  {
    while(remaining >= value) 
    {
      result += roman;
      remaining -= value;
    }
  }

  return result;
}

export const generateTOC = (data: DataType[]): TOCItem[] => 
{
  const stack: TOCItem[] = [];
  const toc: TOCItem[] = [];

  data?.forEach((item) => 
  {
    const level = item?.attrs.level || 1;
    const text = item?.content?.[0]?.text || "";
    const newItem: TOCItem = { children: [], level, text };
    let lastItem = stack.length > 0 ? stack[stack.length - 1] : undefined;

    while(lastItem && lastItem.level >= level) 
    {
      stack.pop();
      lastItem = stack.length > 0 ? stack[stack.length - 1] : undefined;
    }
  
    if(lastItem) 
    {
      lastItem.children.push(newItem);
    }
    
    else 
    {
      toc.push(newItem);
    }
  
    stack.push(newItem);
  });

  return toc;
};

export function getNumericalLabel(depth: number, index: number): string 
{
  switch (depth) 
  {
    case 1:
      return String.fromCharCode(65 + index) + ".";
    case 2:
      return String(decimalToRoman(index + 1) + ".");
    case 3:
      return (index + 1) + ".";
    case 4:
      return String.fromCharCode(97 + index) + ")";
    case 5:
      return String.fromCharCode(97 + index) + String.fromCharCode(97 + index) + ")";
    case 6:
      return (
        String.fromCharCode(97 + index) +
        String.fromCharCode(97 + index) +
        String.fromCharCode(97 + index) +
        ")"
      );
    default:
      return (index + 1) + ")";
  }
}

// eslint-disable-next-line import/no-unused-modules, @typescript-eslint/no-explicit-any
export function getNestedHeadingIndex(item: IHeadingNode, allHeadings: any): number | null 
{
  const level = item.attrs?.level;
  if(level === undefined) 
  {

    return null;
  }

  let currentIndex = -1;
  for(const currentItem of allHeadings) 
  {
    if(currentItem.attrs?.level === level) 
    {
      currentIndex = currentIndex + 1;
      if(JSON.stringify(item) === JSON.stringify(currentItem)) 
      {
        return currentIndex;
      }
    }
    else if(currentItem.attrs?.level < level) 
    {
      currentIndex = -1;
    }
  }
  return null;
}

export const renderTOC = (toc: TOCItem[], _: number = 0): JSX.Element => 
{
  return (
    <ul style={{ paddingBottom: "20px" }}>
      {toc.map((item, index) => item && item?.text && (
        <li key={`toc-ul-listItem-${index}`} style={{ listStyleType: "none" }}>
          <TOCItemComponent
            depth={item?.level ?? 1}
            item={item}
            itemNumber={index + 1}
            total={toc?.length}
          />
        </li>
      ))}
    </ul>
  );
};
