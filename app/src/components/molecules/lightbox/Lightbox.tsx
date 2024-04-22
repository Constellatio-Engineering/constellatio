import { useSizeObserver } from "@/hooks/useSizeObserver";

import React, { type FunctionComponent, useRef } from "react";

import * as styles from "./Lightbox.styles";

const Lightbox: FunctionComponent = () =>
{
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const { height: wrapperHeight, width: wrapperWidth } = useSizeObserver(imageWrapperRef);

  return (
    <div css={styles.wrapper}>
      <div style={{
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        color: "white",
        left: 0,
        padding: "1rem",
        position: "absolute",
        top: 0
      }}>
        {wrapperWidth} x {wrapperHeight}
      </div>
      <div css={styles.imageWrapper} ref={imageWrapperRef}>
        {wrapperHeight !== null && wrapperWidth !== null && (
          <img
            css={styles.image}
            style={{
              height: wrapperWidth >= wrapperHeight ? "auto" : "100%",
              width: wrapperWidth >= wrapperHeight ? "100%" : "auto",
            }}
            src="https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=260&h=750&dpr=2"
            alt="Placeholder"
          />
        )}
      </div>
    </div>
  );
};

export default Lightbox;
