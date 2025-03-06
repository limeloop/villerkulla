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
): Promise<boolean> {
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
      const data = {
        formId: form.id,
        ...validationResult.data,
      };
      console.log("data", data);
      await fetch(process.env.SITE_URL+"/api/submission/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return true;

    } catch (err) {
      console.log(err);
      return false;
      // setError(err.message);
    } finally {
      // setLoading(false);
      return true;
    }
  } else {
    console.error("Validation failed");
    console.error(validationResult.entitiesErrors);
    console.log({
        formId: form.id,
      })
    /*
    | The `validationResult.entitiesErrors` object contains
    | validation errors corresponding to invalid
    | entities values.
    */
   return false;
  }
  return false;
}

export async function fetchSubmission(id: number, formId: number) {

  try {

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
