import { z } from "zod";

import { createEntity } from "@coltorapps/builder";
import { contentAttribute } from "./contentAttribute";


export const paragraphFieldEntity = createEntity({
  name: "paragraphField",
  attributes: [contentAttribute],
  validate(value) {
    return z.string().optional().parse(value);
  },
});