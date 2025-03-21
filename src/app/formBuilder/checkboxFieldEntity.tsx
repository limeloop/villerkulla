import { ZodError } from "zod";

import { createEntityComponent } from "@coltorapps/builder-react";
import { checkBoxFieldEntity } from "@/types/formBuilder/checkBoxField";

export const CheckboxFieldEntity = createEntityComponent(
  checkBoxFieldEntity,
  (props) => {
    return (
      <div className="rendevu-field-entity">
        <div>
          <input
            type="checkbox"
            className="mr-2"
            id={props.entity.id}
            name={props.entity.id}
            checked={props.entity.value ?? false}
            onChange={() => props.setValue(!props.entity.value)}
          />
          <label className="rendevu-label" htmlFor={props.entity.id}>
            {props.entity.attributes.label}
          </label>
        </div>
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
