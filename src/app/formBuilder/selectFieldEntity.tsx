import { ZodError } from "zod";

import { createEntityComponent } from "@coltorapps/builder-react";
import { selectFieldEntity } from "@/types/formBuilder/selectField";

export const SelectFieldEntity = createEntityComponent(
  selectFieldEntity,
  (props) => {
    return (
      <div className="rendevu-field-entity">
        <label className="rendevu-label" htmlFor={props.entity.id}>
          {props.entity.attributes.label}
        </label>
        <select
          id={props.entity.id}
          name={props.entity.id}
          value={props.entity.value}
          onChange={(e) => {
            props.setValue(e.target.value);
          }}
          className="rendevu-input"
        >
          <option className="rendevu-select-option" value="">
            {props.entity.attributes.placeholder}
          </option>
          {props.entity.attributes.options.map((option) => (
            <option
              className="rendevu-select-option"
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
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