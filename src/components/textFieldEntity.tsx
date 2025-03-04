import { ZodError } from "zod";

import { createEntityComponent } from "@coltorapps/builder-react";
import { textFieldEntity } from "@/app/types/textField";



export const TextFieldEntity = createEntityComponent(
  textFieldEntity,
  (props) => {
    return (
      <div className="space-x-2">
        <label htmlFor={props.entity.id}>{props.entity.attributes.label}</label>
        <input
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
  },
);