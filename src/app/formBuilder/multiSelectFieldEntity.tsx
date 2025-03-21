import { ZodError } from "zod";

import { createEntityComponent } from "@coltorapps/builder-react";
import { multiSelectFieldEntity } from "@/types/formBuilder/multiSelectField";
import { useEffect, useState } from "react";

export const MultiSelectFieldEntity = createEntityComponent(
  multiSelectFieldEntity,
  (props) => {
    const [selected, setSelected] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);

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

        <button
          className="multi-dropdown-trigger"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {selected.length > 0
            ? `${selected.length} selected`
            : props.entity.attributes.placeholder}
        </button>
        {isOpen && (
          <div className="multi-dropdown-content">
            {props.entity.attributes.options.map((option) => (
              <label key={option.value} className="multi-dropdown-item">
                <input
                  type="checkbox"
                  checked={selected.includes(option.value)}
                  onChange={() => handleOptionChange(option.value)}
                />
                {option.label}
              </label>
            ))}
          </div>
        )}
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