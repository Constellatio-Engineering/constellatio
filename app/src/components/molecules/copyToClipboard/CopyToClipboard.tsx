import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { CopyIcon } from "@/components/Icons/CopyIcon";

import { notifications } from "@mantine/notifications";
import { type FunctionComponent } from "react";

import * as styles from "./CopyToClipboard.style";

type Props = {
  readonly copyText: string;
};

const CopyToClipboard: FunctionComponent<Props> = ({ copyText }) =>
{
  return (
    <div css={styles.wrapper}>
      <div css={styles.copyTextWrapper}>
        <BodyText styleType="body-01-regular" component="p">
          {copyText}
        </BodyText>
      </div>
      <Button<"button">
        styleType="secondarySimple"
        onClick={async () =>
        {
          await navigator.clipboard.writeText(copyText);
          notifications.show({
            color: "green",
            message: "Text wurde in die Zwischenablage kopiert",
            title: "Text kopiert"
          });
        }}>
        <CopyIcon/>
      </Button>
    </div>
  );
};

export default CopyToClipboard;
