import { ZodError } from "zod";
import { createEntityComponent } from "@coltorapps/builder-react";
import { radioButtonFieldEntity } from "@/types/formBuilder/radioButtonField";

export const RadioButtonFieldEntity = createEntityComponent(
  radioButtonFieldEntity,
  (props) => {
    return (
      <div className="rendevu-field-entity">
        <div>
          <label className="rendevu-label" htmlFor={props.entity.id}>
            {props.entity.attributes.label}
          </label>
          {props.entity.attributes.options.map((option) => (
            <div key={option.value} className="rendevu-radio-container">
              <input
                type="radio"
                value={option.value}
                name={props.entity.id}
                id={option.value}
                className="rendevu-radio-input"
                onClick={() => props.setValue(option.value)}
              />
              <label className="rendevu-radio-label" htmlFor={option.value}>
                {option.label}
              </label>
            </div>
          ))}
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