import Label from "@/components/atoms/label/Label";

import { type PropsOf } from "@emotion/react";
import { type FunctionComponent, type ReactNode } from "react";

type SuggestionSectionProps = {
  readonly children: ReactNode;
  readonly label: string;
  readonly labelVariant: PropsOf<typeof Label>["variant"];
};

const SuggestionSection: FunctionComponent<SuggestionSectionProps> = ({ children, label, labelVariant }) => 
{
  return (
    <div className="suggestion__section">
      {label && <Label variant={labelVariant} title={label}/>}
      {children}
    </div>
  );
};

export default SuggestionSection;
