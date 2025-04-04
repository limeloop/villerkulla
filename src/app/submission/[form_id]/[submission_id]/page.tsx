// app/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { Form } from "@/components/form";

export const revalidate = 60; 
export default async function Page({ params }: { params: Promise<{ form_id: number, submission_id: number }>}) {
  const { form_id, submission_id } = await params;

  if(!form_id || !submission_id) notFound();

  return (
     <div className="bg-gray-100">
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <Form id={form_id} submissionId={submission_id} />
        </div>
      </div>
      </div>
  )
}


