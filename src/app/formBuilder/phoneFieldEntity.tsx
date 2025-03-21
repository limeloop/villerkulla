import { ZodError } from "zod";

import { createEntityComponent } from "@coltorapps/builder-react";
import { phoneFieldEntity } from "@/types/formBuilder/phoneField";

export const PhoneFieldEntity = createEntityComponent(
  phoneFieldEntity,
  (props) => {
    return (
      <div className="rendevu-field-entity">
        <label className="rendevu-label" htmlFor={props.entity.id}>
          {props.entity.attributes.label}
        </label>
        <input
          className="rendevu-input"
          id={props.entity.id}
          name={props.entity.id}
          value={props.entity.value ?? ""}
          type="phone"
          onChange={(e) => props.setValue(e.target.value)}
          placeholder={props.entity.attributes.placeholder}
        />
        {props.entity.attributes.instructions && (
          <span className="text-sm italic">
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
