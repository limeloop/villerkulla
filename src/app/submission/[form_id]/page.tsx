// app/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { Form } from "@/components/form";

export const revalidate = 60; 

export default async function Page({ params }: { params: { form_id: number } }) {
  const { form_id } = await params;
  return (
     <div className="bg-gray-100">
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <Form id={form_id} />
        </div>
      </div>
      </div>
  )
}


