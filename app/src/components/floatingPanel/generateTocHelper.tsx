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

export const renderTOC = (toc: TOCItem[], depth: number = 0): JSX.Element => 
{
  return (
    <ul>
      {toc.map((item, index) => (
        <li key={index}>
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
