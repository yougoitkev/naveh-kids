"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

function Collapsible() {
  return <CollapsiblePrimitive.Root />;
}

function CollapsibleTrigger(props) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger {...props} />
  );
}

function CollapsibleContent(props) {
  return <CollapsiblePrimitive.CollapsibleContent {...props} />;
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };