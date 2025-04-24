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

  const [error, setError] = useState<boolean|string>(false);
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(true);
    if (submissionId) {
      
      const params = new URLSearchParams(window.location.search);
      const publicKey = params.get("publicKey");
      const submit = await cancelSubmission(submissionId, publicKey);
      setSuccess(submit);
    } else {
      console.error("Cancel failed");
      setSuccess(false);
    }
    setLoading(false);
  }

  async function submitForm() {
    setLoading(true);

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
      console.error("Validation failed", validationResult);
      setSuccess(false);
      /*
      | If the validation fails, you can handle the error
      | and provide feedback to the user.
      */
      console.error(validationResult.entitiesErrors);

      setError('Fom validation failed');
    }
    setLoading(true);

  }

  if(loading) {
    return (
      <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-100 border border-blue-300">
        <svg
          className="inline mr-2 w-4 h-4 text-blue-500 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" />
          <path
            className="opacity-75"
            d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12zm2.5-1h11a2.5 2.5 0 1 1-5 0h-6a2.5 2.5 0 0 1-5 0z"
          />
        </svg>
        Loading...
      </div>
    );
  }

  if (success) {
    return (
      <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100 border border-green-300">
        ✅ Success! Your action was completed.
      </div>
    );
  } else if (error) {
    return (
      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 border border-red-300">
        ❌ Error! Something went wrong. Please try again.
      </div>
    );
  }
  

  return (
    <form action="#" onSubmit={() => null} method="post" data-form-id={form.id}>
      <InterpreterEntities
        interpreterStore={interpreterStore}
        components={{
          textField:  TextFieldEntity,
          emailField: EmailFieldEntity,
          phoneField: PhoneFieldEntity,
          checkBoxField: CheckboxFieldEntity,
          selectField:   SelectFieldEntity,
          multiSelectField: MultiSelectFieldEntity,
          radioButtonField: RadioButtonFieldEntity,
          textAreaField:  TextAreaFieldEntity,
          heading1Field:  Heading1FieldEntity,
          paragraphField: ParagraphFieldEntity
        }}
      />
      <div className="flex justify-between space-x-4 mt-4">
        <button
          key='submit'
          type="button"
          onClick={() => submitForm()}
          className="rendevu-submit-button"
        >
          {submissionId ? 'Update' : 'Submit'}
        </button>
        {(submissionId && initialData) && (
        <button
          key='cancel'
          className="rendevu-cancel-button"
          type="button"
          onClick={() => cancel()}
        >
          Cancel submission
        </button>)}
      </div>
    </form>
  );
}
