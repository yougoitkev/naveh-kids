const Form = FormProvider;

const FormFieldContext = React.createContext(null);

const FormField = ({
  ...props
}) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  if (!itemContext) {
    throw new Error("useFormField should be used within <FormItem>");
  }

  const fieldState = getFieldState(fieldContext.name, formState);

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

const FormItemContext = React.createContext(null);

const FormItem = ({
  className,
  ...props
}) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
};

FormItem.displayName = "FormItem";

const FormLabel = ({
  className,
  ...props
}) => {
  const { error, formItemId } = useFormField();

  return (
    <Label className={cn(error && "text-destructive", className)}
      id={formItemId}
      htmlFor={formItemId}
      {...props} />
  );
};

FormLabel.displayName = "FormLabel";

const FormControl = ({
  className,
  ...props
}) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot id={formItemId}
          aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
          aria-invalid={!!error} {...props} />
  );
};

FormControl.displayName = "FormControl";

const FormDescription = ({
  className,
  children,
  ...props
}) => {
  const { formDescriptionId } = useFormField();

  return (
    <p id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props} />
  );
};

FormDescription.displayName = "FormDescription";

const FormMessage = ({
  className,
  children,
  ...props
}) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : children;

  if (!body) {
    return null;
  }

  return (
    <p id={formMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props} />
  );
};

FormMessage.displayName = "FormMessage";

export { useFormField, Form as default, FormItem, FormLabel, FormControl, FormDescription, FormMessage};