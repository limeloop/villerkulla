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

export async function saveSubmission(values: Record<string, any>) {
  // Retrieve the form schema from your storage of choice.
  const form = await getFormSchema(1);

  /*
  | We validate the incoming form values based
  | on the desired form schema.
  */
  const validationResult = await validateEntitiesValues(
    Object.entries(values),
    formBuilder,
    form?.data
  );

  if (validationResult.success) {
    /*
    | The `validationResult.data` contains valid values
    | that can be stored in the database.
    */

    const dateUTC = new Date();
    const dateISO = dateUTC.toISOString();
    const { data: schema } = await supabase
      .from("entitiesValues")
      .upsert({ id: 1, created_at: dateISO, data: values });
  } else {
    /*
    | The `validationResult.entitiesErrors` object contains
    | validation errors corresponding to invalid
    | entities values.
    */
  }
}
