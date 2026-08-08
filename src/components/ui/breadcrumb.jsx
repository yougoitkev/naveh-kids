const Breadcrumb = React.forwardRef(
  function Breadcrumb({ ...props }) {
    return <nav ref={props.ref} aria-label="breadcrumb" {...props} />;
  },
);

Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef(function BreadcrumbList(props) {
  return (
    <ol
      ref={props.ref}
      className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5"
      {...props}
    />
  );
});

BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef(function BreadcrumbItem(props) {
  return (
    <li ref={props.ref} className="inline-flex items-center gap-1.5" {...props} />
  );
});

const BreadcrumbLink = React.forwardRef(
  function BreadcrumbLink({ asChild, ...props }) {
    const Comp = asChild ? Slot : "a";
    return (
      <Comp
        ref={props.ref}
        className="transition-colors hover:text-foreground"
        {...props}
      />
    );
  },
);

BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef(
  function BreadcrumbPage({ ...props }) {
    return (
      <span
        role="link"
        aria-disabled="true"
        aria-current="page"
        className="font-normal text-foreground"
        {...props}
      />
    );
  },
);

BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = React.forwardRef(function BreadcrumbSeparator(props) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className="[&>svg]:w-3.5 [&>svg]:h-3.5"
      {...props}
    >
      {props.children ?? <ChevronRight />}
    </li>
  );
});

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = React.forwardRef(function BreadcrumbEllipsis(props) {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className="flex h-9 w-9 items-center justify-center"
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More</span>
    </span>
  );
});

BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};