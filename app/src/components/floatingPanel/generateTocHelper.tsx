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

const numericalStyles = ["upper-alpha", "lower-roman", "decimal", "lower-alpha"];

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
    case 0:
      return String.fromCharCode(65 + index) + ".";
    case 1:
      return ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"][index] + ".";
    case 2:
      return (index + 1) + ".";
    case 3:
      return String.fromCharCode(97 + index) + ")";
    case 4:
      return String.fromCharCode(97 + index) + String.fromCharCode(97 + index) + ")";
    case 5:
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

export const renderTOC = (toc: TOCItem[], depth: number = 0): JSX.Element => 
{
  return (
    <ul>
      {toc.map((item, index) => item && item?.text && (
        <li key={index} style={{ listStyleType: "none" }}>
          <TOCItemComponent
            depth={depth}
            item={item}
            itemNumber={index + 1}
            total={toc?.length}
          />
        </li>
      ))}
    </ul>
  );
};
