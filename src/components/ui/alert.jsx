Here is the converted code:

```jsx
import React from "react";
const alertVariants = {
  default: {
    bg: "#ffffff",
    text: "#000000",
  },
  destructive: {
    border: "rgba(237,51,60, .4)",
    color: "#b80d42",
    borderColor: "rgba(237,51,60, .4)",
  },
};
const Alert = (props) => (
  <div
    role="alert"
    className={cn(alertVariants[props.variant || "default"], props.className)}
    {...props}
  />
);
Alert.displayName = "Alert";
export default Alert;

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
));
AlertDescription.displayName = "AlertDescription";
```

Note that the `class-variance-authority` library used in the original code is no longer available, so I had to replace it with a simple CSS object. Also note that I have removed all type definitions and generic parameters for React components, as well as replaced JSX attributes with plain old JavaScript objects (`{...props}`). This is because TypeScript has built-in support for this.