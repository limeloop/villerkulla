import { createEntity } from "@coltorapps/builder";
import { z } from "zod";
import { labelAttribute } from "./labelAttribute";

export const emailFieldEntity = createEntity({
  name: "emailField",
  attributes: [labelAttribute],
  validate(value) {
    const validatedValue = z.string().email().parse(value);

    // if (options?.validateEmailField) {
    //   await options.validateEmailField(validatedValue);
    // }

    return validatedValue;
  },
});
