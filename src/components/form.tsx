"use client";

import { useEffect, useState } from "react";
import { FormBuilderSchema, FormInterpreter } from "@/app/formBuilder/formInterpreter";

const maybeConvertValue = (value: string) => {
  switch (value) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      return value;
  }
}


export const Form = ({
  id,
  submissionId,
}: {
  id: number;
  submissionId?: number;
}) => {

  const [form, setForm] = useState<{id: number, data: {schema: FormBuilderSchema, entities: { [key: string]: string }}}|null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<{ [key: string]: string }|null>();

  useEffect(() => {
    const getForm = async () => {
      try {
        setLoading(true);
        const data = await fetch(`/api/forms/get`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ formId: id }),
        });
        const result = await data.json();
        // console.log("Form data:", result);
        setForm(result.data);
      } catch (error: unknown) {
        setForm(null);
        if(error instanceof Error) {
          setError(error.message);
        } else {
        console.error(error);
          setError("Internal Server Error");
        }
      }
      setLoading(false);
    };
    getForm();
  }, [id]);

  useEffect(() => {
    if (!id || !submissionId) {
      return;
    }
    const params = new URLSearchParams(window.location.search);
    const publicKey = params.get("publicKey");
    
    const getSubmission = async () => {
      try {
      const data = await fetch(`/api/submission/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ submissionId: submissionId, formId: id, publicKey: publicKey }),
      });
      const result = await data.json();
      // console.log("Submission data:", result);
      const entitiesValues = result.data.meta.reduce(
        (acc: { [key: string]: string }, entity: { fieldId: string; value: number }) => {
          // Convert the number to a string before passing it in.
          const converted = maybeConvertValue(entity.value.toString());
          // If the result is a boolean, convert it to a string.
          acc[entity.fieldId] = typeof converted === "boolean" ? String(converted) : converted;
          return acc;
        },
        {}
      );
      setInitialData({entitiesValues});
  } catch (error: unknown) {
    setInitialData(null);
    if(error instanceof Error) {
      setError(error.message);
    } else {
    console.error(error);
      setError("Internal Server Error");
    }
  }
  }
    getSubmission();
  }, [id, submissionId]);

  if(loading) {
    return <div>Loading form...</div>;
  }
  if(error) {
    return <div>Error loading form</div>;
  }

  return (
    <div>
      {/* <p>form: {form?.id}</p> */}
      {form && form.data && !submissionId && (
        <FormInterpreter form={form} schema={form.data.schema} />
      )}
      {form && form.data && submissionId && initialData && (
        <FormInterpreter
          form={form}
          submissionId={submissionId}
          schema={form.data.schema}
          initialData={initialData}
        />
      )}
    </div>
  );
};
