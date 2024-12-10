import Label from "@/components/atoms/label/Label";
import DashboardLearningPathHeader from "@/components/molecules/dashboardLearningPathBlockHeader/DashboardLearningPathBlockHeader";
import LearningPathCarousel from "@/components/molecules/learningPathCarousel/LearningPathCarousel";
import LearningPathCarouselHead from "@/components/molecules/learningPathCarouselHead/LearningPathCarouselHead";

import type { IGenLearningPath } from "@constellatio/cms/generated-types";
import { Title } from "@mantine/core";
import { type FunctionComponent, useEffect, useState } from "react";

import * as styles from "./DashboardLearningPathBlock.styles";

export const calculateTimeLeft = (targetDate: Date) => 
{
  const difference = targetDate.getTime() - new Date().getTime();

  if(difference <= 0) 
  {
    return {
      days: 0, hours: 0, minutes: 0, seconds: 0 
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

export const padNumber = (num: number): string => 
{
  return num.toString().padStart(2, "0");
};

interface TimeUnitProps 
{
  label: string;
  value: number;
}

export const TimeUnit: React.FC<TimeUnitProps> = ({ label, value }) => 
{
  return (
    <div className="time-unit">
      <div className="time-unit-value">
        <span className="time-unit-number">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="time-unit-label">
        {label}
      </span>
    </div>
  );
};

const targetDate = new Date("2024-12-10T20:00:00.000Z");

export const CountdownTimer: React.FC = () => 
{
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => 
  {
    const timer = setInterval(() => 
    {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="timer-container">
      <div className="timer-units">
        <TimeUnit value={timeLeft.days} label="Tage"/>
        <TimeUnit value={timeLeft.hours} label="Stunden"/>
        <TimeUnit value={timeLeft.minutes} label="Minuten"/>
        <TimeUnit value={timeLeft.seconds} label="Sekunden"/>
      </div>
    </div>
  );
};

type Props = IGenLearningPath;

const DashboardLearningPathBlock: FunctionComponent<Props> = (learningPath) => (
  <div css={styles.wrapper}>
    <div css={styles.overlay}>
      <div css={styles.labelWrapper}>
        <Label variant="learning-path"/>
      </div>
      <Title order={2}>Lernpfad Kreditsicherungsrecht</Title>
      <p css={styles.comingSoon}>Coming soon</p>
      <div css={styles.countdownWrapper}>
        <CountdownTimer/>
      </div>
    </div>
    <div css={styles.innerWrapper}>
      <DashboardLearningPathHeader {...learningPath}/>
      <div css={styles.carouselWrapper}>
        <LearningPathCarouselHead isLoading={false} completedCount={0} totalCount={learningPath.units?.length ?? 0}/>
        <LearningPathCarousel isLoading={false} {...learningPath}/>
      </div>
    </div>
  </div>
);

export default DashboardLearningPathBlock;
