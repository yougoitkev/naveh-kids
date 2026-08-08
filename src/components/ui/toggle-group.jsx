`use client`;

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";

import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";

const ToggleGroupContext = React.createContext({
  size: "default",
  variant: "default",
});

const ToggleGroup = (props) => {
  const [size, setSize] = React.useState(props.size);
  const [variant, setVariant] = React.useState(props.variant);

  return (
    <ToggleGroupPrimitive.Root
      ref={props.ref}
      className={cn("flex items-center justify-center gap-1", props.className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {props.children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
};

const ToggleGroupItem = (props) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={props.ref}
      className={cn(
        toggleVariants({
          variant: context.variant || props.variant,
          size: context.size || props.size,
        }),
        props.className,
      )}
      {...props}
    >
      {props.children}
    </ToggleGroupPrimitive.Item>
  );
};

export { ToggleGroup, ToggleGroupItem };