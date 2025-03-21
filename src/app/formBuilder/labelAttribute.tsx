import { ZodError } from "zod";

import { createAttributeComponent } from "@coltorapps/builder-react";
import { labelAttribute } from "@/types/formBuilder/labelAttribute";

export const LabelAttribute = createAttributeComponent(
  labelAttribute,
  (props) => {
    const id = `${props.entity.id}-${props.attribute.name}`;

    return (
      <div className="rendevu-field-attribute">
        <label className="rendevu-label" htmlFor={props.entity.id}>
          Field label
        </label>
        <input
          className="rendevu-input"
          id={id}
          name={id}
          value={props.attribute.value ?? ""}
          onChange={(e) => props.setValue(e.target.value)}
          required
        />
        {props.attribute.error instanceof ZodError
          ? props.attribute.error.format()._errors[0]
          : null}
      </div>
    );
  }
);
