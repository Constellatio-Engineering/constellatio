import CaisyImg from "@/basic-components/CaisyImg";
import { paths } from "@/utils/paths";

import { Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import React, { type FunctionComponent } from "react";

import * as styles from "./DashboardPage.styles";
import ModalFlag from "../../../public/images/placeholder-flag.png";
import { BodyText } from "../atoms/BodyText/BodyText";
import { Button } from "../atoms/Button/Button";
import DashboardCasesBlock from "../dashboardCasesBlock/DashboardCasesBlock";
import DashboardHeader from "../dashboardHeader/DashboardHeader";
import DashboardPersonalSpaceBlock from "../dashboardPersonalSpaceBlock/DashboardPersonalSpaceBlock";
import { Modal } from "../molecules/Modal/Modal";

const DashboardPage: FunctionComponent = () => 
{
  const [opened, { close, open }] = useDisclosure(false);
  const today: Date = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const endingDate: Date = tomorrow;
  today.setHours(0, 0, 0, 0);
  endingDate.setHours(0, 0, 0, 0);
  const diffTime = endingDate.getTime() - today.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  React.useEffect(() => 
  {
    console.log("Subscription ending in", diffDays);
    if(diffDays <= 1)
    {
      open();
    }
  }, [diffDays, open]);

  return (
    <div css={styles.wrapper}>
      <DashboardHeader/>
      <div css={styles.sections}>
        <DashboardPersonalSpaceBlock/>
        <DashboardCasesBlock/>
      </div>
      {/* <Modal
        opened={opened}
        centered
        lockScroll={diffDays <= 0 ? true : false}
        onClose={close}
        closeOnClickOutside={diffDays <= 0 ? false : true}
        closeOnEscape={diffDays <= 0 ? false : true}
        withCloseButton={diffDays <= 0 ? false : true}
        title="">
        <CaisyImg src={ModalFlag.src}/>
        <Title order={2} ta="center">
          {diffDays === 1 && "Deine Testphase läuft nur noch 1 Tag"}
          {diffDays <= 0 && "Deine Testphase läuft nur noch 1 Tag"}
        </Title>
        <BodyText ta="center" styleType="body-01-regular" component="p">Jetzt Constellatio abonnieren, um weiterhin alle Vorteile digitalen Lernens zu genießen</BodyText>
        <Link href={`${paths.profile}?tab=subscription`} style={{ width: "100%" }}><Button<"button"> size="large" miw="100%" styleType="primary">Jetzt abonnieren</Button></Link> 
      </Modal> */}
    </div>
  );
};

export default DashboardPage;
