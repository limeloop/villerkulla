import { ZodError } from "zod";

import { createAttributeComponent } from "@coltorapps/builder-react";
import { requiredAttribute } from "@/types/formBuilder/requiredAttribute";

export const RequiredAttribute = createAttributeComponent(
  requiredAttribute,
  (props) => {
    const id = `${props.entity.id}-${props.attribute.name}`;

    return (
      <div className="rendevu-field-attribute">
        <label htmlFor={id} className="rendevu-required-label">
          <input
            className="rendevu-required-input"
            id={id}
            name={id}
            type="checkbox"
            checked={props.attribute.value ?? false}
            onChange={(e) => props.setValue(e.target.checked)}
          />
          <span className="rendevu-required-span">Required</span>
        </label>
        {props.attribute.error instanceof ZodError
          ? props.attribute.error.format()._errors[0]
          : null}
      </div>
    );
  }
);
