import { createBuilder } from "@coltorapps/builder";
import { textFieldEntity } from "./textField";
import { emailFieldEntity } from "./emailField";
import { phoneFieldEntity } from "./phoneField";
import { checkBoxFieldEntity } from "../checkBoxField";
import { selectFieldEntity } from "./selectField";


export const formBuilder = createBuilder({
  entities: [
    textFieldEntity,
    emailFieldEntity,
    phoneFieldEntity,
    checkBoxFieldEntity,
    selectFieldEntity,
  ],
});
