import { z } from "zod";

import { createAttribute } from "@coltorapps/builder";

export const instructionsAttribute = createAttribute({
  name: "instructions",
  validate(value) {
    return z.string().optional().parse(value);
  },
});