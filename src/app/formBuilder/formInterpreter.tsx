"use client";

import { type Schema } from "@coltorapps/builder";
import {
  InterpreterEntities,
  useInterpreterStore,
} from "@coltorapps/builder-react";
import { useState } from "react";
import { formBuilder } from "@/types/formBuilder/formBuilder";
import { saveSubmission, cancelSubmission } from "@/actions/formBuilder";

import {
  CheckboxFieldEntity,
  EmailFieldEntity,
  Heading1FieldEntity,
  ParagraphFieldEntity,
  PhoneFieldEntity,
  RadioButtonFieldEntity,
  SelectFieldEntity,
  TextAreaFieldEntity,
  TextFieldEntity,
} from "./index";
import { MultiSelectFieldEntity } from "./multiSelectFieldEntity";

export type FormBuilderSchema = Schema<typeof formBuilder>;

export function FormInterpreter(props: {
  form: {id: number};
  submissionId?: number;
  schema: FormBuilderSchema;
  initialData?: { [key: string]: string };
}) {
  const { form, initialData, schema, submissionId } = props;
  console.log(form, initialData, schema, submissionId);
  const [success, setSuccess] = useState<boolean>(false);

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

  async function cancel() {
    if (submissionId) {
      const params = new URLSearchParams(window.location.search);
      const publicKey = params.get("publicKey");
      const submit = await cancelSubmission(submissionId, publicKey);
      setSuccess(submit);
    } else {
      console.error("Cancel failed");
      setSuccess(false);
    }
  }

  async function submitForm() {
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

      const params = new URLSearchParams(window.location.search);
      const publicKey = params.get("publicKey");
      const url = `${process.env.WEBSITE_URL}/api/submission/${
        submissionId ? "update" : "create"
      }`;
      console.log('send submission request to', url);
      const submit = await saveSubmission(
        // @ts-expect-error - `validationResult.data` is a Record<string, string> 
        validationResult.data,
        form,
        schema,
        submissionId,
        publicKey,
      );
      setSuccess(submit);
    } else {
      console.error("Validation failed");
      setSuccess(false);
      /*
      | If the validation fails, you can handle the error
      | and provide feedback to the user.
      */
      console.error(validationResult.entitiesErrors);
    }
  }

  if (success) {
    return <div>Success</div>;
  }

  return (
    <form action="#" onSubmit={() => null} method="post" data-form-id={form.id}>
      <InterpreterEntities
        interpreterStore={interpreterStore}
        components={{
        textField: TextFieldEntity,
        emailField: EmailFieldEntity,
        phoneField: PhoneFieldEntity,
        checkBoxField: CheckboxFieldEntity,
        selectField: SelectFieldEntity,
        multiSelectField: MultiSelectFieldEntity,
        radioButtonField: RadioButtonFieldEntity,
        textAreaField: TextAreaFieldEntity,
        heading1Field: Heading1FieldEntity,
        paragraphField: ParagraphFieldEntity,
        }}
      />
      <div className="flex justify-between space-x-4 mt-4">
        <button
          key='submit'
          type="button"
          onClick={() => submitForm()}
          className="rendevu-submit-button"
        >
          Submit
        </button>
        {(submissionId && initialData) && (
        <button
          key='cancel'
          className="rendevu-cancel-button"
          type="button"
          onClick={() => cancel()}
        >
          Cancel
        </button>)}
      </div>
    </form>
  );
}
