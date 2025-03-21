import { ZodError } from "zod";

import { createAttributeComponent } from "@coltorapps/builder-react";
import { contentAttribute } from "@/types/formBuilder";

export const ContentAttribute = createAttributeComponent(
  contentAttribute,
  (props) => {
    const id = `${props.entity.id}-${props.attribute.name}`;

    return (
      <div className="rendevu-field-attribute">
        <label className="rendevu-label" htmlFor={props.entity.id}>
          Content
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
