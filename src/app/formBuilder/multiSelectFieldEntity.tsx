import { ZodError } from "zod";

import { createEntityComponent } from "@coltorapps/builder-react";
import { multiSelectFieldEntity } from "@/types/formBuilder/multiSelectField";
import { useEffect, useState } from "react";

export const MultiSelectFieldEntity = createEntityComponent(
  multiSelectFieldEntity,
  (props) => {
    const [selected, setSelected] = useState<string[]>([]);

    const handleOptionChange = (value: string) => {
      if (selected.includes(value)) {
        setSelected(selected.filter((id) => id !== value));
      } else {
        setSelected([...selected, value]);
      }
      props.setValue(selected);
    };

    useEffect(() => {
      props.setValue(selected);
    }, [props, selected]);

    return (
      <div className="rendevu-field-entity">
        <label className="rendevu-label" htmlFor={props.entity.id}>
          {props.entity.attributes.label}
        </label>
        <select
          id={props.entity.id}
          value={selected}
          onChange={(e) => handleOptionChange(e.target.value)}
          className="h-8"
          // placeholder={props.entity.attributes.placeholder}
        >
         {props.entity.attributes.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          </select>
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