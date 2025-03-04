"use client";

import { supabase } from "@/supabaseClient";
import { useEffect, useState } from "react";
import { FormInterpreter } from "./formInterpreter";

export const Form = ({ id }: { id: number }) => {
  // fetch data json from supabase for website_forms with id;
  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log(
        "selecting form with id:",
        id,
        "website id",
        process.env.NEXT_PUBLIC_WEBSITE_ID
      );
      const { data, error } = await supabase
        .from("website_forms")
        .select("*") // or whatever columns you need
        .eq("id", id)
        .single();
      console.log(data);
      setForm(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Form {id}</h1>
      <br />

      <p>Form body:</p>
      {form && form.data && <FormInterpreter form={form} schema={form.data.schema} />}
      <br />

      {/* {JSON.stringify(form.data, null, 2)} */}
      <br />
      {/* <button onClick={handleSubmit}>Submit</button> */}
    </div>
  );
};
