import { Button } from "@/components/atoms/Button/Button";
import { ArticleIcon } from "@/components/Icons/ArticleIcon";
import { CaseIcon } from "@/components/Icons/CaseIcon";
import useDocumentEditorStore from "@/stores/documentEditor.store";

import Image from "next/image";
import Link from "next/link";
import { type FunctionComponent } from "react";

import FlagImage from "./assets/flag.png";
import * as styles from "./DashboardCallToActionBlockCard.styles";

interface Props
{
  readonly buttonText: string;
  readonly href: string;
  readonly icon?: "flag" | "upload" | "document";
  readonly subText: string;
  readonly title: string;
}

const DashboardCallToActionBlockCard: FunctionComponent<Props> = ({
  buttonText,
  href,
  icon = "flag",
  subText,
  title
}) => 
{
  const setCreateDocumentState = useDocumentEditorStore(s => s.setCreateDocumentState);
  const onCreateDocument = (): void =>
  {
    setCreateDocumentState({ folderId: null });
  };

  let image: React.ReactNode = (
    <Image
      css={styles.flag}
      src={FlagImage}
      alt="Flaggen Icon"
    />
  );
  if(icon === "document")
  {
    image = <CaseIcon size={50} strokeWidth={.5}/>;
  }
  else if(icon === "upload")
  {
    image = <ArticleIcon size={50} strokeWidth={.5}/>;
  }
  return (  
    <div css={styles.wrapper}>
      {image}
      <div css={styles.innerWrapper}>
        <div css={styles.textWrapper}>
          <p css={styles.title}>
            {title}
          </p>
          <p css={styles.subText}>
            {subText}
          </p>
        </div>
        <Link href={href}>
          <Button<"button"> size={"medium"} styleType="secondarySimple" onClick={onCreateDocument}>{buttonText} </Button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardCallToActionBlockCard;
