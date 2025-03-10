import { ZodError } from "zod";

import { createEntityComponent } from "@coltorapps/builder-react";
import { Label } from "./ui/label";
import { selectFieldEntity } from "./types/selectField";
import { Select } from "./ui/select";

export const SelectFieldEntity = createEntityComponent(selectFieldEntity, (props) => {
  return (
    <div className="">
      <Label htmlFor={props.entity.id}>{props.entity.attributes.label}</Label>
      <Select
        id={props.entity.id}
        name={props.entity.id}
        value={props.entity.value}
        options={props.entity.attributes.options}
        onValueChange={(e) => props.setValue(e)}
        triggerClass="h-8"
        placeholder="Select an option"
      />
      {props.entity.error instanceof ZodError
        ? props.entity.error.format()._errors[0]
        : null}
    </div>
  );
});