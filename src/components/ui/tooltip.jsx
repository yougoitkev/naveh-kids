const [usePopper] = Popper.usePopper;
const [usePopperProps, popperElement] = usePopper(
  ref.current,
  document.body,
);
return (
  <div
    style={{
      ...styles,
      top: popperElement.style.top,
      left: popperElement.style.left,
    }}
  />
);

const styles = {
  opacity: "0",
  height: 0,
  pointerEvents: "none",
};
usePopperProps.update(
  () => ({ opacity: "1", ...styles }),
  () => ({
    height: "auto",
    overflow: "hidden",
    paddingBlockEnd: 3,
  }),
);

import React from "react";
import { cn } from "@/lib/utils";

const TooltipProvider = React.createContext();

const Tooltip = React.forwardRef<
  React.ElementRef<typeof React.Fragment>,
  React.ComponentPropsWithoutRef<"div">
>(({ children, className, ...props }, ref) => (
  <Tooltip.Provider value={children}>
    <React.Fragment {...props} ref={ref} />
  </Tooltip.Provider>
));
Tooltip.displayName = "Tooltip";

const TooltipTrigger = React.forwardRef<
  React.ElementRef<typeof React.Fragment>,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <TooltipProvider>{children}</TooltipProvider>
));

const TooltipContent = React.forwardRef<React.RefObject<HTMLDivElement>, {}>(
  (props: {}, ref: React.RefObject<HTMLDivElement>) => {
    const context = React.useContext(Tooltip.Provider);

    return (
      <div
        ref={ref}
        className="z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin)"
        {...props}
      />
    );
  },
);

TooltipContent.displayName = "Tooltip.Content";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
const [usePopper] = Popper.usePopper;
const [usePopperProps, popperElement] = usePopper(
  ref.current,
  document.body,
);
return (
  <div
    style={{
      ...styles,
      top: popperElement.style.top,
      left: popperElement.style.left,
    }}
  />
);

const styles = {
  opacity: "0",
  height: 0,
  pointerEvents: "none",
};
usePopperProps.update(
  () => ({ opacity: "1", ...styles }),
  () => ({
    height: "auto",
    overflow: "hidden",
    paddingBlockEnd: 3,
  }),
);