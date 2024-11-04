import { type ElementType, RichTextRenderer } from "@caisy/rich-text-react-renderer";
import { type Nullable } from "@constellatio/utility-types";
import { type SerializedStyles } from "@emotion/react";
import { type FC, type ReactElement, type ReactNode } from "react";

import { SRichtext } from "./Richtext.styles";

export type RichtextProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly data: any;
  readonly prefixComponent?: ReactNode;
  readonly richTextOverwrite?: Nullable<Partial<Record<ElementType, FC<{ node: ReactElement }>>>>;
  readonly stylesOverwrite?: SerializedStyles;
};

export const Richtext: FC<RichtextProps> = ({
  data,
  prefixComponent = null,
  richTextOverwrite,
  stylesOverwrite
}) =>
{
  if(!data?.json)
  {
    return null;
  }

  return (
    <SRichtext stylesOverwrite={stylesOverwrite}>
      {prefixComponent}
      <RichTextRenderer node={data.json} overwrites={richTextOverwrite}/>
    </SRichtext>
  );
};
