import { createBuilder } from "@coltorapps/builder";
import {
  checkBoxFieldEntity,
  emailFieldEntity,
  heading1FieldEntity,
  paragraphFieldEntity,
  phoneFieldEntity,
  radioButtonFieldEntity,
  selectFieldEntity,
  textAreaFieldEntity,
  textFieldEntity,
} from "./index";

export const formBuilder = createBuilder({
  entities: [
    textFieldEntity,
    emailFieldEntity,
    phoneFieldEntity,
    checkBoxFieldEntity,
    selectFieldEntity,
    radioButtonFieldEntity,
    textAreaFieldEntity,
    heading1FieldEntity,
    paragraphFieldEntity,
  ],
});
