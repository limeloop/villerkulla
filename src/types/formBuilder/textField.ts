import { z } from "zod";

import { createEntity } from "@coltorapps/builder";
import { labelAttribute } from "./labelAttribute";
import { requiredAttribute } from "./requiredAttribute";
import { placeholderAttribute } from "./placeholderAttribute";
import { instructionsAttribute } from "./instructionsAttribute";

export const textFieldEntity = createEntity({
  name: "textField",
  attributes: [
    labelAttribute,
    requiredAttribute,
    placeholderAttribute,
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