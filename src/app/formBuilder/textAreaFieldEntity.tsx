import { ZodError } from "zod";

import { createEntityComponent } from "@coltorapps/builder-react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { textAreaFieldEntity } from "./types";

export const TextAreaFieldEntity = createEntityComponent(textAreaFieldEntity, (props) => {
  return (
    <div className="">
      <Label htmlFor={props.entity.id}>{props.entity.attributes.label}</Label>
      <Textarea
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