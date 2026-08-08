import React from "react";
import {
  cn
} from "@/lib/utils";

const Slider = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>) => (
  <SliderPrimitive.Root ref={props.ref}
    className={
      "relative flex w-full touch-none select-none items-center"
      + cn(className)
    }
    {...props}>
    <SliderPrimitive.Track>
      <SliderPrimitive.Range className="absolute h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20"/>
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={
        "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      }/>
  </SliderPrimitive.Root>
);
export { Slider };