import { z } from "zod";

import { createEntity } from "@coltorapps/builder";
import { labelAttribute } from "./labelAttribute";
import { requiredAttribute } from "./requiredAttribute";
import { instructionsAttribute } from "./instructionsAttribute";

export const checkBoxFieldEntity = createEntity({
  name: "checkBoxField",
  attributes: [labelAttribute, requiredAttribute, instructionsAttribute],
  validate(value, context) {
    const schema = z.boolean();

    if (!context.entity.attributes.required) {
      return schema.optional().parse(value);
    }

    return schema.parse(value);
  },
});