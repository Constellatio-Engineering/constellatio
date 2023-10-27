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
  return (
    <Popover
      width={430}
      defaultOpened
      withArrow
      position={floatingPosition ?? "bottom"}
      closeOnClickOutside={false}
      closeOnEscape={false}
      opened={opened}
      styles={(theme) => ({
        arrow: {
          backgroundColor: theme.colors["neutrals-02"][1],
          border: `1px solid ${theme.colors["neutrals-02"][1]}`,
        },
      })}>
      <Popover.Target>{popoverTarget}</Popover.Target>
      {popoverMenu}
    </Popover>
  );
};

export default OnboardingTutorialPopover;
