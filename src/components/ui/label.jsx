You can use the following code:
```
"use client";

import React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

const labelVariants = `
  text-sm
  font-medium
  leading-none
`;

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({
  className,
  ...props
}) => (
  <LabelPrimitive.Root className={cn(labelVariants, className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };