import { createEntity } from "@coltorapps/builder";
import { z } from "zod";
import { labelAttribute } from "./labelAttribute";

export const phoneFieldEntity = createEntity({
  name: "phoneField",
  attributes: [labelAttribute],
  validate(value) {
    const validatedValue = z.string().parse(value);
  
    return validatedValue;
  },
});
