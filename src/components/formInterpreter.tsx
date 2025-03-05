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
  initialData?: any;
}) {
  const { initialData } = props;
  /*
  | We utilize the `useInterpreterStore` hook, which creates
  | an interpreter store for us. This store is used for filling
  | entities values based on a schema and builder definition.
  */
  // const [initialData, setInitialData] = useState<any>();
  const params = useParams();

  // useEffect(() => {
  //   // if(initialData) return;

  //   const fetchData = async () => {
  //     const fetchedData = await fetchSubmission(submissionId, props.form.id);
  //     console.log("Fetched data", fetchedData);
  //     if (fetchedData) {
  //       setInitialData(fetchedData);
  //       interpreterStore.setData(fetchedData as any);
  //     }

  //   };
  //   fetchData();
  // }, [submissionId, props.form.id, setInitialData]);

  // const initialData = {
  //   entitiesValues: {
  //     "4ad5212e-444e-446f-ba3f-20048115b482": "Rodriguez",
  //     "61e072ac-4d5d-4909-9576-dc5ab179c826": "Samuel",
  //     "d5dfb78e-eb4a-4fea-ba62-ddee840d5e1a": "sam@mail.com",
  //   },
  // };
  const interpreterStore = useInterpreterStore(formBuilder, props.schema, {
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
      await saveSubmission(validationResult.data, props.form, props.schema);
    }
  }
  console.log('initialData', initialData)
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
      {initialData ? (
        <InterpreterEntities
          interpreterStore={interpreterStore}
          components={{
            textField: TextFieldEntity,
            emailField: EmailFieldEntity,
          }}
        />
      ) : (
        <div>Loading...</div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
}