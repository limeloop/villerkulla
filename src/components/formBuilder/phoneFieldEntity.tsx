import { ZodError } from "zod";

import { createEntityComponent } from "@coltorapps/builder-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { phoneFieldEntity } from "@/types/formBuilder/phoneField";

export const PhoneFieldEntity = createEntityComponent(
  phoneFieldEntity,
  (props) => {
    return (
      <div className="space-y-2">
        <Label htmlFor={props.entity.id}>{props.entity.attributes.label}</Label>
        <Input
          id={props.entity.id}
          name={props.entity.id}
          value={props.entity.value ?? ""}
          type="phone"
          onChange={(e) => props.setValue(e.target.value)}
        />
        {props.entity.error instanceof ZodError
          ? props.entity.error.format()._errors[0]
          : null}
      </div>
    );
  }
);
