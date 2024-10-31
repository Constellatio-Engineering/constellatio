import { Radio } from "@mantine/core";
import { type FunctionComponent } from "react";

// import * as styles from "./CustomRadio.styles";

type Props = {
  readonly checked?: boolean;
  readonly name?: string;
  readonly onChange: (selected: boolean) => void;
  readonly value?: string;
};

const CustomRadio: FunctionComponent<Props> = ({
  checked,
  name,
  onChange,
  value,
}) => 
{
  return (
    <Radio
      styles={{
        radio: {
          "&:checked": {
            "&::after": {
              background: "black",
              borderRadius: "50%",
              content: "''",
              height: "10px",
              left: "20%",
              position: "absolute",
              top: "20%",
              width: "10px",
              zIndex: 3,
            },
            background: "white",
            border: "2px solid black",
            borderRadius: "50%",
            left: "0",
            position: "relative",
            svg: {
              display: "none"
            },
            top: "0",
          },
        },
      }}
      onChange={(event) => onChange(event.target.checked)}
      name={name}
      value={value}
      checked={checked}
      id={value}
    />
  );
};

export default CustomRadio;
