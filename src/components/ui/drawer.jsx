const Drawer = ({
  shouldScaleBackground = true,
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} />
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = (props: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>) => (
  <DrawerPrimitive.Overlay
    {...props}
  />
);
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = (props: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
    </DrawerPrimitive.Content>
  </DrawerPortal>
);
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    {...props}
  >
    <div className="grid gap-1.5 p-4 text-center sm:text-left">
      <h2 id="drawer-title" />
      <p id="drawer-description" />
    </div>
  </div>
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    {...props}
  >
    <button className="rounded-md bg-secondary px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm ring-1 ring-gray-900/10 hover:bg-primary" />
  </div>
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = (props: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>) => (
  <DrawerPrimitive.Title
    {...props}
  >
    <h3 id="drawer-title" />
  </DrawerPrimitive.Title>
);
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = (props: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>) => (
  <DrawerPrimitive.Description
    {...props}
  >
    <p id="drawer-description" />
  </DrawerPrimitive.Description>
);
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;