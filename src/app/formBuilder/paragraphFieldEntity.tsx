import { ZodError } from "zod";

import { createEntityComponent } from "@coltorapps/builder-react";
import { paragraphFieldEntity } from "./types";


export const ParagraphFieldEntity = createEntityComponent(paragraphFieldEntity, (props) => {
  return (
    <div>
      <p className="text-base">
        {props.entity.attributes.content}
      </p>
      {props.entity.error instanceof ZodError
        ? props.entity.error.format()._errors[0]
        : null}
    </div>
)});