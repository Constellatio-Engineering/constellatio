import { useOnboardingStore } from "@/stores/onboarding.store";

import { Popover } from "@mantine/core";
import { type FloatingPosition } from "@mantine/core/lib/Floating";
import { type ReactNode, type FunctionComponent } from "react";

interface OnboardingTutorialPopoverProps 
{
  readonly floatingPosition?: FloatingPosition | undefined;
  readonly opened: boolean; 
  readonly popoverMenu: ReactNode;
  readonly popoverTarget: ReactNode;
}

const OnboardingTutorialPopover: FunctionComponent<OnboardingTutorialPopoverProps> = ({
  floatingPosition,
  opened,
  popoverMenu,
  popoverTarget
}) => 
{
  const onboardingStepsIndex = useOnboardingStore(s => s.onboardingStepsIndex);

  return (
    <Popover
      width={430}
      defaultOpened
      withArrow
      position={floatingPosition ?? "bottom"}
      offset={onboardingStepsIndex === 4 ? 5 : -10}
      closeOnClickOutside={false}
      closeOnEscape={false}
      opened={opened}
      styles={(theme) => ({
        arrow: {
          backgroundColor: colooors["neutrals-02"][1],
          border: `1px solid ${colooors["neutrals-02"][1]}`,
          transform: "rotate(45deg) scale(2) !important",
        },
      })}>
      <Popover.Target>{popoverTarget}</Popover.Target>
      {popoverMenu}
    </Popover>
  );
};

export default OnboardingTutorialPopover;
