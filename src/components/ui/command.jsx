"use client";
import { Dialog, DialogContent } from "./ui/dialog";
import { Search } from "lucide-react";
import { type DialogProps } from "@radix-ui/react-dialog";

const Command = ({ children }: { children: React.ReactNode }) => (
  <DialogContent className="overflow-hidden p-0">
    <Command>
      {children}
    </Command>
  </DialogContent>
);

const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <Command>{children}</Command>
    </Dialog>
  );
};

const CommandInput = () => (
  <div className="flex items-center border-b px-3">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <input
      className="
        flex 
        h-10 
        w-full 
        rounded-md 
        bg-transparent 
        py-3 
        text-sm 
        outline-none 
        placeholder:text-muted-foreground 
        disabled:cursor-not-allowed 
        disabled:opacity-50"
    />
  </div>
);

const CommandList = () => (
  <ul className="max-h-[300px] overflow-y-auto overflow-x-hidden">
    {children}
  </ul>
);

const CommandEmpty = ({ children }: { children?: React.ReactNode }) => (
  <li className="py-6 text-center text-sm">{children}</li>
);

const CommandGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="overflow-hidden p-1 text-foreground [&_cmdk-group-heading]:px-2 [&_cmdk-group-heading]:py-1.5 [&_cmdk-group-heading]:text-xs [&_cmdk-group-heading]:font-medium [&_cmdk-group-heading]:text-muted-foreground">
    {children}
  </div>
);

const CommandSeparator = () => (
  <hr className="mx-auto my-4 h-[2px] w-full bg-border" />
);

const CommandItem = ({ children }: { children: React.ReactNode }) => (
  <li
    className="
      relative 
      flex 
      cursor-default 
      gap-2 
      select-none 
      items-center 
      rounded-sm 
      px-2 
      py-1.5 
      text-sm 
      outline-none 
      data-[disabled=true]:pointer-events-none 
      data-[selected=true]:bg-accent 
      data-[selected=true]:text-accent-foreground 
      data-[disabled=true]:opacity-50"
  >
    {children}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="
        mr-2 
        h-4 
        w-4 
        shrink-0 
        opacity-50"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#6879ff"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="
          M3.75 21a7.5 7.5 0 0110.125-4.5A7.5 7.5 0 0115 9.75v8.67m-5.71 4.13c-.63 .62-1.213.834-1.745.844a7.25 7.25 0 006.893.72l2.11 5.66A.5.5 0 0021 16.787v-9.186z"
      />
    </svg>
  </li>
);

const CommandShortcut = ({ children }: { children: React.ReactNode }) => (
  <span className="ml-auto text-xs tracking-widest text-muted-foreground">
    {children}
  </span>
);
export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
"use client";

import * as React from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive, type CommandElementProps } from "cmdk";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "./ui/dialog";
import { CommandEmpty } from "./command-empty";
import { CommandGroup } from "./command-group";
import { CommandItem } from "./command-item";
import { CommandList } from "./command-list";
import { CommandSeparator } from "./command-separator";

const Command = React.forwardRef<
  HTMLDivElement,
  CommandElementProps & {
    children: React.ReactNode;
  }
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    {...props}
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className,
    )}
  />
));
Command.displayName = CommandPrimitive.displayName;

const CommandDialog = React.forwardRef<
  HTMLDivElement,
  DialogProps & {
    children: React.ReactNode;
  }
>(({ className, ...props }, ref) => (
  <DialogContent {...props} ref={ref}>
    <Command>{props.children}</Command>
  </DialogContent>
));

const CommandInput = React.forwardRef<HTMLDivElement, { placeholder?: string }>(
  ({ placeholder, ...props }) => (
    <div
      className="flex items-center border-b px-3"
      cmdk-input-wrapper=""
    >
      <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
      <input
        type="text"
        placeholder={placeholder}
        className="
          flex 
          h-10 
          w-full 
          rounded-md 
          bg-transparent 
          py-3 
          text-sm 
          outline-none 
          placeholder:text-muted-foreground 
          disabled:cursor-not-allowed 
          disabled:opacity-50"
      />
    </div>
  ),
);
CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<HTMLDivElement, { children?: React.ReactNode }>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.List
      ref={ref}
      className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
      {...props}
    />
  ),
);

const CommandEmpty = React.forwardRef<HTMLDivElement, {
  children?: React.ReactNode;
}>(({ className, ...props }, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
));

const CommandGroup = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_cmdk-group-heading]:px-2 [&_cmdk-group-heading]:py-1.5 [&_cmdk-group-heading]:text-xs [&_cmdk-group-heading]:font-medium [&_cmdk-group-heading]:text-muted-foreground",
      className,
    )}
    {...props}
  />
));

const CommandSeparator = React.forwardRef<HTMLDivElement, {
  children?: React.ReactNode;
}>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-[2px] w-full bg-border", className)}
    {...props}
  />
));

const CommandItem = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  ),
);

const CommandShortcut = React.forwardRef<HTMLSpanElement, {
  children: string;
}>(({ className, children }, ref) => (
  <span
    className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
    ref={ref}
  >
    {children}
  </span>
));
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};