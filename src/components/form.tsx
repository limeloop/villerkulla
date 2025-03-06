"use client";

import { supabase } from "@/supabaseClient";
import { useEffect, useState } from "react";
import { FormInterpreter } from "./formBuilder/formInterpreter";
import { fetchSubmission } from "@/actions/formBuilder";

/*

 1. Create submit here and pass down
 2. Create fetch submission here and pass down

*/


export const Form = ({ id, submissionId }: { id: number, submissionId?: any }) => {
  // fetch data json from supabase for website_forms with id;
  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(true);
  const [initialData, setInitialData] = useState<any>();
// 
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
      // console.log(data);
      setForm(data);
      setLoading(false);
    };
    fetchData();
  }, []);


  useEffect(() => {
    // if(initialData) return;
    const fetchData = async () => {
      if(!submissionId) return;
      const fetchedData = await fetchSubmission(submissionId, id);
      console.log("Fetched data", fetchedData);
      if (fetchedData) {
        setInitialData(fetchedData);
      }
    };
    fetchData();
  }, [submissionId]);

  // console.log("Form", form);

  return (
    <div>
      {(form && form.data && !submissionId) && (<FormInterpreter form={form} schema={form.data.schema} />)}
      {(form && form.data && submissionId && initialData) && (<FormInterpreter form={form} schema={form.data.schema} initialData={initialData} />)}
    </div>
  );
};
