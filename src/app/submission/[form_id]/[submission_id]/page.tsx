// app/[slug]/page.tsx
import Content from "../../../../components/content";
import { notFound } from 'next/navigation'
import { Form } from "@/components/form";



// Mark the revalidation interval if you want ISR-like behavior in the App Router
// (optional; if omitted, the page is SSR on every request)

export const revalidate = 60; 

export default async function Page({ params }: { params: { form_id: number, submission_id: number } }) {
  const { form_id, submission_id } = await params;


//   const submissionResponse  = await fetch(`/api/submission/get`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({ submissionId: submission_id, formId: form_id })
//   });

//  const submission = await submissionResponse.json();

//  const formResponse  = await fetch(`/api/forms/get`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({ formId: form_id })
//   });

// const form = await formResponse.json();
  // // `params.slug` corresponds to the dynamic segment in the URL, e.g. /about -> "about"

 
  // if(!data) notFound()

  // if (error) {
  //   // handle error: you can throw or return a "not found" UI
  //   // throw new Error(error.message);
  //   return null;
  // }


  // let page = data.html.replace('<body','<div');
  // page = page.replace('</body>','</div>');

  return (<>
     <Form id={form_id} submissionId={submission_id} />
  </>)
}
