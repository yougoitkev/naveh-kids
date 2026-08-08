function AlertDialog() {
    return (React.createElement("div", null));
}
const AlertDialogPortal = React.forwardRef((props, ref) => (
    <AlertDialogPrimitive.Portal
        {...props}
        ref={ref}
    />
));
AlertDialogPortal.displayName = "Alert";
export {
  Alert,
  AlertBody,
  AlertDescription,
  AlertDetails,
  AlertIcon,
  AlertDialog,
  AlertDetail,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPrimitive,
  AlertDialogTrigger,
  alertDialogProps,
};