import { ZodError } from "zod";

import { createEntityComponent } from "@coltorapps/builder-react";
import { paragraphFieldEntity } from "@/types/formBuilder";


export const ParagraphFieldEntity = createEntityComponent(paragraphFieldEntity, (props) => {
  return (
    <div className="rendevu-field-entity">
      <p className="">{props.entity.attributes.content}</p>
      {props.entity.error instanceof ZodError
        ? props.entity.error.format()._errors[0]
        : null}
    </div>
  );});