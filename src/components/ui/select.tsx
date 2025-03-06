import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(selectDefaultTriggerClass, className)}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown width={20} height={20} strokeWidth={1.5} />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      className={cn(
        selectDefaultContentClass,
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-base", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(selectDefaultItemClass, className)}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
};

const selectDefaultTriggerClass =
  "flex gap-2 h-9 w-full rounded-md justify-between bg-white items-center px-2 text-base file:border-0 file:bg-transparent file:text-base file:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200 ease-in-out file:transition-colors file:duration-200 file:ease-in-out rounded-tabs";
const selectDefaultContentClass =
  "relative z-50 min-w-[8rem] rounded-md overflow-hidden bg-white shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2";
const selectDefaultItemClass =
  "relative flex w-full rounded-md cursor-pointer select-none items-center py-1.5 pl-8 pr-2 text-base outline-hidden focus:bg-accent hover:bg-toolbar data-disabled:pointer-events-none data-disabled:opacity-50 rounded-tabs";

export type SelectOption = {
  label: string | React.JSX.Element;
  value: string;
  disable?: boolean;
};

export type SelectGroup = {
  label: string;
  options: SelectOption[];
};

type SelectProps = {
  options?: SelectOption[];
  groups?: SelectGroup[];
  id: string;
  label?: string;
  value?: string;
  selectLabel?: string;
  triggerClass?: string;
  containerClass?: string;
  placeholder?: string;
};

const Select = React.forwardRef<
  HTMLDivElement,
  SelectProps & SelectPrimitive.SelectProps
>(
  (
    {
      id,
      options,
      groups,
      triggerClass = "w-full",
      placeholder,
      containerClass,
      selectLabel,
      value,
      ...rest
    }: SelectProps & SelectPrimitive.SelectProps,
    ref
  ) => {
    if (!options && !groups) return <span>Add either options or groups</span>;
    return (
      <div
        className={cn(
          "w-full min-w-[200px] rounded-md flex flex-col gap-2 border border-input rounded-tabs",
          containerClass
        )}
        id={id}
        ref={ref}
      >
        <SelectPrimitive.Root {...rest} value={value}>
          <SelectTrigger className={triggerClass}>
            <SelectValue className="truncate" placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="rounded-tabs  max-h-96 overflow-auto">
            {options &&
              options.map((option: SelectOption, i: number) => (
                <SelectItem
                  key={`${option.value}-${i}`}
                  value={option.value}
                  disabled={option.disable}
                >
                  {option.label}
                </SelectItem>
              ))}
            {groups &&
              groups.map((groups: SelectGroup, i: number) => (
                <SelectGroup key={i}>
                  {selectLabel && <SelectLabel>{selectLabel}</SelectLabel>}
                  {groups.options &&
                    groups.options.map((option: SelectOption, i: number) => (
                      <SelectItem
                        key={`${option.value}-${i}`}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                </SelectGroup>
              ))}
          </SelectContent>
        </SelectPrimitive.Root>
      </div>
    );
  }
);
Select.displayName = SelectPrimitive.Root.displayName;

export { Select };
