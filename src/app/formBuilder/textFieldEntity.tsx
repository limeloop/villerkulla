import { ZodError } from "zod";

import { createEntityComponent } from "@coltorapps/builder-react";
import { textFieldEntity } from "./types/textField";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export const TextFieldEntity = createEntityComponent(textFieldEntity, (props) => {
  return (
    <div className="">
      <Label htmlFor={props.entity.id}>{props.entity.attributes.label}</Label>
      <Input
        id={props.entity.id}
        name={props.entity.id}
        value={props.entity.value ?? ""}
        onChange={(e) => props.setValue(e.target.value)}
      />
      {props.entity.error instanceof ZodError
        ? props.entity.error.format()._errors[0]
        : null}
    </div>
  );
});