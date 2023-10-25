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
      <Modal
        opened={opened}
        centered
        lockScroll={diffDays <= 0 ? true : false}
        onClose={close}
        closeOnClickOutside={diffDays <= 0 ? false : true}
        closeOnEscape={diffDays <= 0 ? false : true}
        withCloseButton={diffDays <= 0 ? false : true}
        title="">
        <CaisyImg src={ModalFlag.src}/>
        <Title order={2}>
          {diffDays === 1 && "Trial period is ending in 1 day"}
          {diffDays <= 0 && "Your trial has ended"}
        </Title>
        <BodyText ta="center" styleType="body-01-regular" component="p">Don&lsquo;t miss out on the legal universe that awaits, continue your journey through the realms of knowledge</BodyText>
        <Link href={`${paths.profile}?tab=subscription`} style={{ width: "100%" }}><Button<"button"> size="large" miw="100%" styleType="primary">Buy subscription</Button></Link> 
      </Modal>
    </div>
  );
};

export default DashboardPage;
