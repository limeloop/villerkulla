import { z } from "zod";

import { createAttribute } from "@coltorapps/builder";

export const optionsAttribute = createAttribute({
  name: "options",
  validate(value) {
    const selectionOption = z.object({
      label: z.string(),
      value: z.string(),
    });
    return selectionOption.array().min(1).parse(value);
  },
});