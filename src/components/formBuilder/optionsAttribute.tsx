import { ZodError } from "zod";

import { createAttributeComponent } from "@coltorapps/builder-react";
import { optionsAttribute } from "@/types/formBuilder/optionsAttribute";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { SquareX } from "lucide-react";

export const OptionsAttribute = createAttributeComponent(optionsAttribute, (props) => {
  const id = `${props.entity.id}-${props.attribute.name}`;
  const [currOption, setCurrOption] = useState({ label: "", value: "" });

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && currOption.label.trim() !== "") {
      props.setValue([...props.attribute.value || [], currOption]);
      setCurrOption({ label: "", value: "" });
    }
  };

  const handleOnChange = (e) => {
    setCurrOption({ label: e.target.value, value: e.target.value.toLowerCase().replace(/\s+/g, '-') });
  };

  const handleDelete = (option) => {
    props.setValue(props.attribute.value.filter((o) => o !== option));
  };


  return (
    <div className="">
      <Label htmlFor={id}>Field options</Label>
      <Input
        id={id}
        name={id}
        value={currOption.label}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter options"
      />
      {props.attribute.value.map((option, index) => {
        return (
          <div
            key={option.label + index}
            className="flex justify-between w-full pt-2"
          >
            {option.label}
            <button
              className="text-input hover:text-primary"
              type="button"
              onClick={() => handleDelete(option)}
            >
              <SquareX strokeWidth={1} />
            </button>
          </div>
        );
      })}
      {props.attribute.error instanceof ZodError
        ? props.attribute.error.format()._errors[0]
        : null}
    </div>
  );
});
