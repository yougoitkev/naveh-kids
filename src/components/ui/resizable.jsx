import React from "react";

const ResizablePanelGroup = ({ className, ...props }: {
  className?: string;
}) => (
  <React.Fragment>
    <div
      className={cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className)}
      {...props}
    />
  </React.Fragment>
);

const ResizablePanel = (props: React.ComponentProps<typeof React.Fragment>) => {
  return props;
};

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: {
  withHandle?: boolean;
} & React.ComponentProps<typeof React.Fragment>) => (
  <React.Fragment>
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <React.Fragment />
      </div>
    )}
  </React.Fragment>
);

export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
};