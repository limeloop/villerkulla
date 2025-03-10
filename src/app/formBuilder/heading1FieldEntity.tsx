import { ZodError } from "zod";

import { createEntityComponent } from "@coltorapps/builder-react";
import { heading1FieldEntity } from "./types/heading1Field";


export const Heading1FieldEntity = createEntityComponent(heading1FieldEntity, (props) => {
  return (
    <div>
      <h1 className="text-lg">{props.entity.attributes.content}</h1>
      {props.entity.error instanceof ZodError
        ? props.entity.error.format()._errors[0]
        : null}
    </div>
  );});