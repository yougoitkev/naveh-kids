const sheetVariants = (side: any) => ({
  top: `inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top`,
  bottom: `inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom`,
  left: `inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm`,
  right: `inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm`,
});
const SheetContent = ({
  side = "right",
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <SheetPortal>
    <SheetOverlay />
    <div
      className={cn(sheetVariants(side), "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out")}
    >
      <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetClose>
      {children}
    </div>
  </SheetPortal>
);
const SheetHeader = ({ className }: { className?: string }) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} />
);
const SheetFooter = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
  />
);
const SheetTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn("text-lg font-semibold text-foreground", className)}
    {...(children as any)}
  />
);
const SheetDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn("text-sm text-muted-foreground", className)}
    {...(children as any)}
  />
);