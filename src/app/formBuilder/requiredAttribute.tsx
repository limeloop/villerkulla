import { ZodError } from "zod";

import { createAttributeComponent } from "@coltorapps/builder-react";
import { requiredAttribute } from "./types/requiredAttribute";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export const RequiredAttribute = createAttributeComponent(
  requiredAttribute,
  (props) => {
    const id = `${props.entity.id}-${props.attribute.name}`;

    return (
      <div>
        <Label htmlFor={id} className="flex">
          <Input
            className="size-4 mt-2"
            id={id}
            name={id}
            type="checkbox"
            checked={props.attribute.value ?? false}
            onChange={(e) => props.setValue(e.target.checked)}
          />
          <span className="m-2">Required</span>
        </Label>
        {props.attribute.error instanceof ZodError
          ? props.attribute.error.format()._errors[0]
          : null}
      </div>
    );
  }
);
