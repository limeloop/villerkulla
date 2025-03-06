"use client";

import { type Schema } from "@coltorapps/builder";
import {
  InterpreterEntities,
  useInterpreterStore,
} from "@coltorapps/builder-react";
import { TextFieldEntity } from "./textFieldEntity";
import { FormEvent, useState } from "react";
import { EmailFieldEntity } from "./emailFieldEntity";
import { formBuilder } from "@/app/types/formBuilder";
import { saveSubmission } from "@/actions/formBuilder";
import { PhoneFieldEntity } from "./phoneFieldEntity";
import { CheckboxFieldEntity } from "./checkboxFieldEntity";
import { SelectFieldEntity } from "./selectFieldEntity";

type FormBuilderSchema = Schema<typeof formBuilder>;

export function FormInterpreter(props: {
  form: any;
  schema: FormBuilderSchema;
  initialData?: any;
}) {
  const { form, initialData, schema } = props;

  const [success, setSuccess] = useState<any>(null);

  const interpreterStore = useInterpreterStore(formBuilder, schema, {
    initialData: initialData ? initialData : undefined,
    events: {
      /*
      | We use the `onEntityValueUpdated` event callback
      | to trigger an arbitrary entity validation every time
      | its value is updated.
      */
      onEntityValueUpdated(payload) {
        void interpreterStore.validateEntityValue(payload.entityId);
      },
    },
  });

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    /*
    | We validate the values once again on the client
    | to trigger all the validations and provide the user
    | with feedback on what needs to be corrected.
    */
    const validationResult = await interpreterStore.validateEntitiesValues();

    if (validationResult.success) {
      /*
      | The schema is valid and can be sent to the server.
      | Alternatively you can use `validationResult.data`
      | instead of sending `FormData`.
      */
      const submit = await saveSubmission(validationResult.data, form, schema);
      setSuccess(submit);
    } else {
      console.error("Validation failed");
      setSuccess(false)
      /*
      | If the validation fails, you can handle the error
      | and provide feedback to the user.
      */
      console.error(validationResult.entitiesErrors);
    }
  }

  if(success) {
    return <div>Success</div>
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        void submitForm(e);
      }}
    >
       <InterpreterEntities
          interpreterStore={interpreterStore}
          components={{
            textField: TextFieldEntity,
            emailField: EmailFieldEntity,
            phoneField: PhoneFieldEntity,
            checkBoxField: CheckboxFieldEntity,
            selectField: SelectFieldEntity,
          }}
        />
      <button type="submit">Submit</button>
    </form>
  );
}