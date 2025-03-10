import { ZodError } from "zod";

import { createEntityComponent } from "@coltorapps/builder-react";
import { emailFieldEntity } from "./types/emailField";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export const EmailFieldEntity = createEntityComponent(
  emailFieldEntity,
  (props) => {
    return (
      <div className="space-y-2">
        <Label htmlFor={props.entity.id}>{props.entity.attributes.label}</Label>
        <Input
          id={props.entity.id}
          name={props.entity.id}
          value={props.entity.value ?? ""}
          onChange={(e) => props.setValue(e.target.value)}
          type="email"
        />
        {props.entity.error instanceof ZodError
          ? props.entity.error.format()._errors[0]
          : null}
      </div>
    );
  }
);
