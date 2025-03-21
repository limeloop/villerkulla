import { ZodError } from "zod";

import { createEntityComponent } from "@coltorapps/builder-react";
import { textFieldEntity } from "@/types/formBuilder/textField";

export const TextFieldEntity = createEntityComponent(
  textFieldEntity,
  (props) => {
    return (
      <div className="rendevu-field-entity">
        <label className="rendevu-label" htmlFor={props.entity.id}>
          {props.entity.attributes.label}
        </label>
        <input
          id={props.entity.id}
          className="rendevu-input"
          name={props.entity.id}
          value={props.entity.value ?? ""}
          onChange={(e) => props.setValue(e.target.value)}
          placeholder={props.entity.attributes.placeholder}
        />
        {props.entity.attributes.instructions && (
          <span className="rendevu-instructions">
            {props.entity.attributes.instructions}
          </span>
        )}
        {props.entity.error instanceof ZodError
          ? props.entity.error.format()._errors[0]
          : null}
      </div>
    );
  }
);