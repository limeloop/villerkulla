"use server";

import { validateEntitiesValues } from "@coltorapps/builder";
import { formBuilder } from "@/types/formBuilder/formBuilder";
import { FormBuilderSchema } from "@/app/formBuilder/formInterpreter";

export async function saveSubmission(
  values: Record<string, string>,
  form: {id: number},
  schema: FormBuilderSchema,
  submissionId?: number,
  publicKey?: string|null,
): Promise<boolean> {
  // Retrieve the form schema from your storage of choice.

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
      const data = {
        formId: form.id,
        submissionId: submissionId,
        publicKey: publicKey,
        ...validationResult.data,
      };
      const url = `${process.env.WEBSITE_URL}/api/submission/${
          submissionId ? "update" : "create"
        }`;
      console.log(url);
      await fetch(
        url,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
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
    /*
    | The `validationResult.entitiesErrors` object contains
    | validation errors corresponding to invalid
    | entities values.
    */
    return false;
  }
}

export async function cancelSubmission(
  submissionId?: number,
  publicKey?: string|null,
): Promise<boolean> {
  // Retrieve the form schema from your storage of choice.

  try {
    const data = {
      publicKey: publicKey,
      submissionId: submissionId,
    };
    await fetch(
      `${process.env.WEBSITE_URL}/api/submission/cancel`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return true;
  } catch (err) {
    console.log(err);
    return false;
    // setError(err.message);
  } finally {
    // setLoading(false);
    return true;
  }
}
