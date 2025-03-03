'use client';

import { supabase } from "@/supabaseClient";
import { useEffect, useState } from "react";

export const Form = ({id}: {id: number}) => {
     // fetch data json from supabase for website_forms with id;
    const [form, setForm] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string|null>(null);
    const [success, setSuccess] = useState<boolean>(true);

    useEffect(() => {
     const fetchData = async () => {
        setLoading(true)
        console.log('selecting form with id:', id, 'website id', process.env.NEXT_PUBLIC_WEBSITE_ID)
        const { data , error } = await supabase
            .from("website_forms")
            .select("*") // or whatever columns you need
            .eq('id', id)
            .single();
            console.log(data)
            setForm(data);
        setLoading(false);
     }
     fetchData();
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
    
        try {
          // Insert into "participants" table
          console.log(form)

          const { data: participantData, error: participantError } = await supabase
            .from('participants')
            .insert({
              website_id: process.env.NEXT_PUBLIC_WEBSITE_ID,
              project_id: form.project_id,
              form_id: id,
            })
            .select();
           console.log(participantData)
           console.log(participantError)
          if (participantError || !participantData || participantData.length === 0) {
            throw new Error(participantError?.message || 'Error inserting participant');
          }
    
          // Get the inserted participant id
          const participantId = participantData[0].id;
    
          // Prepare meta rows for each field
          const metaRows = [
            { participant_id: participantId, name: 'first_name', value: 'Jonas' },
            { participant_id: participantId, name: 'last_name', value: 'Öström' },
            { participant_id: participantId, name: 'email', value: 'jonas.ostrom@limeloop.se' },
            { participant_id: participantId, name: 'phone', value: '0702788238' },
          ];
    
          // Insert into "participants_meta" table
          const { error: metaError } = await supabase
            .from('participants_meta')
            .insert(metaRows);
    
          if (metaError) {
            throw new Error(metaError.message);
          }
    
          setSuccess(true);
          // Optionally, reset the form fields
         
        } catch (err) {
            console.log(err)
           // @ts-expect-error: Should expect error obj
          setError(err.message || 'Unknown error');
        } finally {
          setLoading(false);
        }
      };

    return (
        <div>
            <h1>Form {id}</h1>
            <br />

            <p>Form body:</p>
            <br />

            {JSON.stringify(form, null, 2)}
            <br />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}