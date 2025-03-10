import { z } from "zod";

import { createAttribute } from "@coltorapps/builder";

export const contentAttribute = createAttribute({
  name: "content",
  validate(value) {
    return z.string().min(1).parse(value);
  },
});