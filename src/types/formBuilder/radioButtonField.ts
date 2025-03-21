import { z } from "zod";

import { createEntity } from "@coltorapps/builder";
import { labelAttribute } from "./labelAttribute";
import { requiredAttribute } from "./requiredAttribute";
import { optionsAttribute } from "./optionsAttribute";
import { instructionsAttribute } from "./instructionsAttribute";


export const radioButtonFieldEntity = createEntity({
  name: "radioButtonField",
  attributes: [
    labelAttribute,
    requiredAttribute,
    optionsAttribute,
    instructionsAttribute,
  ],
  validate(value, context) {
    const schema = z.string();

    if (!context.entity.attributes.required) {
      return schema.optional().parse(value);
    }

    return schema.parse(value);
  },
});