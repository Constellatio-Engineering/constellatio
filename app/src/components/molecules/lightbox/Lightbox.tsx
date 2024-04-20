import React, { type FunctionComponent } from "react";

import * as styles from "./Lightbox.styles";

const Lightbox: FunctionComponent = () => (
  <div css={styles.wrapper}>
    <div css={styles.imageWrapper}>
      <img
        css={styles.image}
        src="https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=260&h=750&dpr=2"
        alt="Placeholder"
      />
    </div>
  </div>
);

export default Lightbox;
