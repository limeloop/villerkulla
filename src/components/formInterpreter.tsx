"use client";

import { type Schema } from "@coltorapps/builder";
import {
  InterpreterEntities,
  useInterpreterStore,
} from "@coltorapps/builder-react";
import { TextFieldEntity } from "./textFieldEntity";
import { FormEvent, use, useEffect, useState } from "react";
import { EmailFieldEntity } from "./emailFieldEntity";
import { formBuilder } from "@/app/types/formBuilder";
import { fetchSubmission, saveSubmission } from "@/actions/formBuilder";
import { useParams } from "next/navigation";

type FormBuilderSchema = Schema<typeof formBuilder>;

export function FormInterpreter(props: {
  form: any;
  schema: FormBuilderSchema;
  submission?: any;
}) {
  /*
  | We utilize the `useInterpreterStore` hook, which creates
  | an interpreter store for us. This store is used for filling
  | entities values based on a schema and builder definition.
  */
  const [data, setData] = useState<any | null>(null);
  const params = useParams();
  const submissionId = params.submission_id as string;

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSubmission(submissionId);
      if (data) {
        setData(data);
      }
    };
    fetchData();
  }, [params, submissionId]);
  console.log("data", data);

  const interpreterStore = useInterpreterStore(formBuilder, props.schema, {
    initialData: props.submission,
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
      await saveSubmission(validationResult.data, props.form, props.schema);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        void submitForm(e);
      }}
    >
      {/*
      | We use the `InterpreterEntities` component to render the entities tree
      | of the schema of our interpreter store. We pass the entity
      | components for each defined entity type in our form builder
      | (currently, it's only the text field).
      */}
      <InterpreterEntities
        interpreterStore={interpreterStore}
        components={{
          textField: TextFieldEntity,
          emailField: EmailFieldEntity,
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
}