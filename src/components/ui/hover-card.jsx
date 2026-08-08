const HoverCard = React.memo(HoverCard);
const HoverCardTrigger = React.memo(HoverCardTrigger);

function HoverContent(props: {
  children: any;
  className?: string;
  id: number;
}) {
  const ref = useRef<HTMLDivElement>(null!);

  return (
    <div
      {...props}
      className={cn(
        "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-hover-card-content-transform-origin)",
        props.className
      )}
    >
      <div className="absolute right-0 top-0 inline-flex -mr-6 -mt-4" ref={ref}>
        <HoverCardTrigger asChild>
          <button className="-m-3 h-9 w-9 rounded-full p-1 focus-visible:outline-none">
            <span className="sr-only">Open</span>
          </button>
        </HoverCardTrigger>
      </div>
    </div>
  );
}

export { HoverContent }; import React, { useRef } from "react";
import "./styles.css"; // Import the styles for the component

const HoverCard = ({ children }) => {
  const ref = useRef(null);

  return (
    <div
      {...props}
      className="z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-hover-card-content-transform-origin)"
    >
      <div className="absolute right-0 top-0 inline-flex -mr-6 -mt-4">
        <button
          ref={ref}
          className="-m-3 h-9 w-9 rounded-full p-1 focus-visible:outline-none"
        />
      </div>
    </div>
  );
};

export default HoverCard;