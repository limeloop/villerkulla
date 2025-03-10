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
      const data = await fetch(`/api/forms/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formId: id }),
      });
      const result = await data.json();
      setForm(result.data);
    };
    getForm();
  }, [id]);

  useEffect(() => {
    if (!id || !submissionId) {
      return;
    }

    const getSubmission = async () => {
      const data = await fetch(`/api/submission/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ submissionId: submissionId, formId: id }),
      });
      const result = await data.json();
      const entitiesValues = result.data.meta.reduce((acc: any, entity: any) => {
        acc[entity.fieldId] = maybeConvertValue(entity.value);
        return acc;
      }, {});
      setInitialData({entitiesValues});
    };
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
