import { ZodError } from "zod";

import { createEntityComponent } from "@coltorapps/builder-react";
import { Label } from "./ui/label";
import { checkBoxFieldEntity } from "./types/checkBoxField";

export const CheckboxFieldEntity = createEntityComponent(
  checkBoxFieldEntity,
  (props) => {
    return (
      <div className="space-y-2">
        <input
          type="checkbox"
          className="mr-2"
          id={props.entity.id}
          name={props.entity.id}
          checked={props.entity.value ?? false}
          onChange={() => props.setValue(!props.entity.value)}
        />
        <Label htmlFor={props.entity.id}>{props.entity.attributes.label}</Label>
        {props.entity.error instanceof ZodError
          ? props.entity.error.format()._errors[0]
          : null}
      </div>
    );
  }
);
