import { ZodError } from "zod";
import { createEntityComponent } from "@coltorapps/builder-react";
import { Label } from "./ui/label";
import { radioButtonFieldEntity } from "./types/radioButtonField";
import { Input } from "./ui/input";

export const RadioButtonFieldEntity = createEntityComponent(
  radioButtonFieldEntity,
  (props) => {
    return (
      <div className="">
        <Label className="mb-2">{props.entity.attributes.label}</Label>
        {props.entity.attributes.options.map(option => (
          <div key={option.value} className="flex items-center gap-2">
            <Input 
              type="radio" 
              value={option.value} 
              name={props.entity.id}
              id={option.value} 
              className="flex flex-row gap-2 size-4" 
              onClick={() => props.setValue(option.value)}  // Set the value directly
            />
            <label className="h-8 truncate" htmlFor={option.value}>
              {option.value}
            </label>
          </div>
        ))}
        {props.entity.error instanceof ZodError
          ? props.entity.error.format()._errors[0]
          : null}
      </div>
    );
  }
);