// app/[slug]/page.tsx
// import Content from "../../../../components/content";
import { notFound } from 'next/navigation'



// Mark the revalidation interval if you want ISR-like behavior in the App Router
// (optional; if omitted, the page is SSR on every request)

export const revalidate = 60; 

export default async function Page({ params }: { params: { form_id: number } }) {
  const { form_id } = await params;

  
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
     <p>Submission</p>
    <p>{form_id}</p>
  </>)
}
