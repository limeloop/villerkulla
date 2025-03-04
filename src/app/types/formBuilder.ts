import { createBuilder } from "@coltorapps/builder";
import { textFieldEntity } from "./textField";
import { emailFieldEntity } from "./emailField";

export const formBuilder = createBuilder({
  entities: [textFieldEntity, emailFieldEntity],
});
