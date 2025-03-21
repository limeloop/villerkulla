import { z } from "zod";

import { createEntity } from "@coltorapps/builder";
import { labelAttribute } from "./labelAttribute";
import { optionsAttribute } from "./optionsAttribute";
import { requiredAttribute } from "./requiredAttribute";
import { placeholderAttribute } from "./placeholderAttribute";
import { instructionsAttribute } from "./instructionsAttribute";

export const selectFieldEntity = createEntity({
  name: "selectField",
  attributes: [
    labelAttribute,
    requiredAttribute,
    placeholderAttribute,
    instructionsAttribute,
    optionsAttribute,
  ],
  validate(value, context) {
    const schema = z.string();

    if (!context.entity.attributes.required) {
      return schema.optional().parse(value);
    }

    return schema.parse(value);
  },
});