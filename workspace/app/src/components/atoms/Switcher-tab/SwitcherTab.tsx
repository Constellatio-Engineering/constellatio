import { type TabProps, Tabs } from "@mantine/core";
import { forwardRef } from "react";

type TSwitcherTab = TabProps;

const SwitcherTabComponent = forwardRef<HTMLButtonElement, TSwitcherTab>(({
  children,
  ...props
}, ref) => 
{
  return (
    <Tabs.Tab ref={ref} {...props}>
      {children}
    </Tabs.Tab>
  );
});

SwitcherTabComponent.displayName = "SwitcherTab";

export const SwitcherTab = SwitcherTabComponent;
