const React = {
  forwardRef: (
    props: any,
    ref?: any
  ) => <any>(props, ref) => ({}),
};
const React$1 = React.forwardRef;
React$1.displayName = "React$1";
export { React$1 as React }; const TabsPrimitive =
  import("@radix-ui/react-tabs").default;

import * as React from "react";

function cn(...args) {
  return args.join(" ");
}

TabsPrimitive.Root.displayName = "TabsPrimitive.Root";

function forwardRef(fn, ref) {
  // @ts-ignore
  fn.displayName || (fn.displayName = `ForwardRef(${fn.type.name})`);
  return React.forwardRef(ref);
}

const Tabs$1 = forwardRef(TabsPrimitive.List);

export { cn as c };
Tabs$1.displayName = "Tabs";

function forwardRef(fn, ref) {
  // @ts-ignore
  fn.displayName || (fn.displayName = `ForwardRef(${fn.type.name})`);
  return React.forwardRef(ref);
}

const TabsTrigger$1 = forwardRef(TabsPrimitive.Trigger);

export { cn as c };
TabsTrigger$1.displayName = "Tabs";

function forwardRef(fn, ref) {
  // @ts-ignore
  fn.displayName || (fn.displayName = `ForwardRef(${fn.type.name})`);
  return React.forwardRef(ref);
}

const TabsContent$1 = forwardRef(TabsPrimitive.Content);

export { cn as c };
TabsContent$1.displayName = "Tabs";

function forwardRef(fn, ref) {
  // @ts-ignore
  fn.displayName || (fn.displayName = `ForwardRef(${fn.type.name})`);
  return React.forwardRef(ref);
}

const TabsList$1 = forwardRef(TabsPrimitive.List);

export { cn as c };
TabsList$1.displayName = "Tabs";

function forwardRef(fn, ref) {
  // @ts-ignore
  fn.displayName || (fn.displayName = `ForwardRef(${fn.type.name})`);
  return React.forwardRef(ref);
}

const TabsContent$2 = forwardRef(TabsPrimitive.Content);

export { cn as c };
TabsContent$2.displayName = "Tabs";

function forwardRef(fn, ref) {
  // @ts-ignore
  fn.displayName || (fn.displayName = `ForwardRef(${fn.type.name})`);
  return React.forwardRef(ref);
}

const TabsTrigger$2 = forwardRef(TabsPrimitive.Trigger);

export { cn as c };
TabsTrigger$2.displayName = "Tabs";import * as React from "react";