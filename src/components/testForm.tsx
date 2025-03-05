"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; // adjust the import to your client

type SubmissionFormProps = {
  projectId: string;
};

export const SubmissionForm: React.FC<SubmissionFormProps> = ({ projectId }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
        console.log('event', event);
        console.log('session', session);
    })
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Insert into "submissions" table
      const { data: submissionData, error: submissionError } = await supabase
        .from('submissions')
        .insert({
          project_id: projectId, // assuming your column name is "project_id"
        })
        .select();

      if (submissionError || !submissionData || submissionData.length === 0) {
        throw new Error(submissionError?.message || 'Error inserting submission');
      }

      // Get the inserted submission id
      const submissionId = submissionData[0].id;

      // Prepare meta rows for each field
      const metaRows = [
        { submission_id: submissionId, meta_key: 'first_name', meta_value: firstName },
        { submission_id: submissionId, meta_key: 'last_name', meta_value: lastName },
        { submission_id: submissionId, meta_key: 'email', meta_value: email },
        { submission_id: submissionId, meta_key: 'phone', meta_value: phone },
      ];

      // Insert into "submissions_meta" table
      const { error: metaError } = await supabase
        .from('submissions_meta')
        .insert(metaRows);

      if (metaError) {
        throw new Error(metaError.message);
      }

      setSuccess(true);
      // Optionally, reset the form fields
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
     
    } catch (err) {
       // @ts-expect-error: Should expect error obj
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white rounded shadow mt-10"
    >
      <div className="mb-4">
        <label htmlFor="firstName" className="block text-gray-700">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="lastName" className="block text-gray-700">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block text-gray-700">
          Phone
        </label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          required
        />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">Submission added successfully!</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default SubmissionForm;
