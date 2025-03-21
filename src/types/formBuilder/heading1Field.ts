import { z } from "zod";

import { createEntity } from "@coltorapps/builder";
import { contentAttribute } from "./contentAttribute";


export const heading1FieldEntity = createEntity({
  name: "heading1Field",
  attributes: [contentAttribute],
  validate(value) {
    return z.string().parse(value);
  },
});