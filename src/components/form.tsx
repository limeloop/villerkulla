"use client";

import { useEffect, useState } from "react";
import { FormInterpreter } from "@/app/formBuilder/formInterpreter";

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
  submissionId?: any;
}) => {

  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(true);
  const [initialData, setInitialData] = useState<any>();

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
        setForm(result.data);
      } catch (error:any) {
        console.error(error);
        setError(error.message);
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
      console.log("Submission data:", result);
      const entitiesValues = result.data.meta.reduce((acc: any, entity: any) => {
        acc[entity.fieldId] = maybeConvertValue(entity.value);
        return acc;
      }, {});
      setInitialData({entitiesValues});
  } catch (error:any) {
    console.error(error);
    setError(error.message);
    setInitialData(null);
  }
  }
    getSubmission();
  }, [id, submissionId]);

  return (
    <div>
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
