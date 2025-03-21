import { createBuilder } from "@coltorapps/builder";
import {
  checkBoxFieldEntity,
  emailFieldEntity,
  heading1FieldEntity,
  multiSelectFieldEntity,
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
    multiSelectFieldEntity,
    radioButtonFieldEntity,
    textAreaFieldEntity,
    heading1FieldEntity,
    paragraphFieldEntity,
  ],
});
