"use server";

import { validateEntitiesValues } from "@coltorapps/builder";
import { formBuilder } from "@/app/types/formBuilder";
import { supabase } from "@/supabaseClient";

export async function getFormSchema(id: number) {
  const { data: schema } = await supabase
    .from("schemas")
    .select("data")
    .eq("id", id)
    .single();

  return schema;
}

export async function saveSubmission(
  values: Record<string, any>,
  form: any,
  schema: any
) {
  // Retrieve the form schema from your storage of choice.
  // const form = await getFormSchema(1);

  /*
  | We validate the incoming form values based
  | on the desired form schema.
  */
  const validationResult = await validateEntitiesValues(
    values,
    formBuilder,
    schema
  );

  if (validationResult.success) {
    /*
    | The `validationResult.data` contains valid values
    | that can be stored in the database.
    */

    // setLoading(true);
    // setError(null);
    // setSuccess(false);
    try {
      // Insert into "participants" table
      console.log("Form in saving", form);
      const { data: participantData, error: participantError } = await supabase
        .from("participants")
        .insert({
          website_id: process.env.NEXT_PUBLIC_WEBSITE_ID,
          project_id: form.project_id,
          form_id: form.id,
        })
        .select();
      console.log(participantData);
      console.log(participantError);
      if (
        participantError ||
        !participantData ||
        participantData.length === 0
      ) {
        throw new Error(
          participantError?.message || "Error inserting participant"
        );
      }
      // // Get the inserted participant id
      const participantId = participantData[0].id;
      const entities = form.data.schema.entities;
      // Prepare meta rows for each field
      const metaRows = Object.entries(validationResult.data).map((value) => {
        const key = value[0];
        const val = value[1];
        return {
          participant_id: participantId,
          field_id: key,
          name: entities[key].attributes.label,
          value: val,
        };
      });

      // Insert into "participants_meta" table
      // console.log("inserting meta rows", metaRows);
      const { error: metaError } = await supabase
        .from("participants_meta")
        .insert(metaRows);
      if (metaError) {
        throw new Error(metaError.message);
      }
      // setSuccess(true);
      // Optionally, reset the form fields
    } catch (err) {
      console.log(err);
      // @ts-expect-error: Should expect error obj
      // setError(err.message || "Unknown error");
    } finally {
      // setLoading(false);
    }
  } else {
    /*
    | The `validationResult.entitiesErrors` object contains
    | validation errors corresponding to invalid
    | entities values.
    */
  }
}
