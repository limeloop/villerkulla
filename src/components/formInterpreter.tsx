"use client";

import { type Schema } from "@coltorapps/builder";
import {
  InterpreterEntities,
  useInterpreterStore,
} from "@coltorapps/builder-react";
import { TextFieldEntity } from "./textFieldEntity";
import { FormEvent } from "react";
import { EmailFieldEntity } from "./emailFieldEntity";
import { formBuilder } from "@/app/types/formBuilder";


type FormBuilderSchema = Schema<typeof formBuilder>;

export function FormInterpreter(props: { schema: FormBuilderSchema }) {
  /*
  | We utilize the `useInterpreterStore` hook, which creates
  | an interpreter store for us. This store is used for filling
  | entities values based on a schema and builder definition.
  */
  const interpreterStore = useInterpreterStore(formBuilder, props.schema, {
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
      console.log("Save the users submitted data", validationResult.data);
      // await saveSubmission(validationResult.data);
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