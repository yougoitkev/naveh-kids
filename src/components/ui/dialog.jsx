"use client";

import * as React from "react";
import { X } from "lucide-react";

const Dialog = ({ children }) => (
  <DialogPrimitive.Root>
    <DialogOverlay />
    <DialogContent>{children}</DialogContent>
  </DialogPrimitive.Root>
);

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn("fixed inset-0 z-50 bg-black/80", className)}
      {...props}
    />
  )
);

const DialogContent = ({
  children,
  className,
}) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={null}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className,
      )}
    >
      {children}
      <DialogPrimitive.Close
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
);

const DialogHeader = ({ children }) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left",)}
    {...props}
  />
);

const DialogFooter = ({
  children,
}) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Close>
  </>
);

const DialogTitle = ({ children }) => (
  <DialogPrimitive.Title
    className={cn("text-lg font-semibold leading-none tracking-tight",)}
    {...props}
  />
);

const DialogDescription = ({ children }) => (
  <DialogPrimitive.Description
    className={cn("text-sm text-muted-foreground",)}
    {...props}
  />
);