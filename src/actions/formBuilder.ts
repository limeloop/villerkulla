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
    // console.log("Validation result data", validationResult.data);
    /*
    | The `validationResult.data` contains valid values
    | that can be stored in the database.
    */

    // setLoading(true);
    // setError(null);
    // setSuccess(false);
    try {
      // Insert into "submissions" table
      console.log("Form in saving", form);
      const { data: submissionData, error: submissionError } = await supabase
        .from("submissions")
        .insert({
          website_id: process.env.NEXT_PUBLIC_WEBSITE_ID,
          project_id: form.project_id,
          form_id: form.id,
        })
        .select();
      // console.log(submissionData);
      // console.log(submissionError);
      if (
        submissionError ||
        !submissionData ||
        submissionData.length === 0
      ) {
        throw new Error(
          submissionError?.message || "Error inserting submission"
        );
      }
      // // Get the inserted submission id
      const submissionId = submissionData[0].id;
      const entities = form.data.schema.entities;
      // Prepare meta rows for each field
      const metaRows = Object.entries(validationResult.data).map((value) => {
        const key = value[0];
        const val = value[1];
        return {
          submission_id: submissionId,
          field_id: key,
          name: entities[key].attributes.label,
          value: val,
        };
      });

      // Insert into "submissions_meta" table
      // console.log("inserting meta rows", metaRows);
      const { error: metaError } = await supabase
        .from("submissions_meta")
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

export async function fetchSubmission(id: number, formId: number) {
  // Format to retrieve is
  // const initialData = {
  //   entitiesValues: {
  //     "4ad5212e-444e-446f-ba3f-20048115b482": "Rodriguez",
  //     "61e072ac-4d5d-4909-9576-dc5ab179c826": "Samuel",
  //     "d5dfb78e-eb4a-4fea-ba62-ddee840d5e1a": "sam@mail.com",
  //   },
  // };
  try {
    // const { data, error } = await supabase
    //   .from("submissions")
    //   .select(
    //     `
    //     *,
    //     submissions_meta(*)
    //   `
    //   )
    //   .eq("id", id)
    //   .single();

    console.log('fetching submission', id, formId)

    const { data, error } = await supabase
      .from("submissions")
      .select(
        `
        *,
        submissions_meta(*)
      `
      )
      .eq("id", id)
      .eq("form_id", formId)
      .single();
    if (error) {
      console.log("fetch submission error", error);
      // throw new Error(error.message);
      return {};
    } else {
      const entitiesValues = data.submissions_meta.reduce((acc: any, entity: any) => {
        acc[entity.field_id] = entity.value;
        return acc;
      }, {});
      return { entitiesValues };
    }
  } catch (error) {
    console.log("error", error);
  }
}
