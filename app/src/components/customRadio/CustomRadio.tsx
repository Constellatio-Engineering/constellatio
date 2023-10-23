import { Radio } from "@mantine/core";
import React, { type FunctionComponent } from "react";

// import * as styles from "./CustomRadio.styles";

const CustomRadio: FunctionComponent<{readonly checked?: boolean; readonly name?: string; readonly value?: string}> = ({
  checked,
  name,
  value
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
              height: "13px",
              left: "20%",
              position: "absolute",
              top: "20%",
              width: "13px",
              zIndex: 3,
            },
            background: "white",
            border: "2px solid black",
            borderRadius: "50%",
            height: "25px",
            left: "0",
            position: "relative",
            svg: {
              display: "none"
            },
            top: "0",
            width: "25px"
          },
        },
      }}
      name={name}
      value={value}
      id={value}
      defaultChecked={checked}
    />
  );
};

export default CustomRadio;
