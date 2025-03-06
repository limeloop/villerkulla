// app/[slug]/page.tsx
import PagesDebug from "./../components/pagesDebug";
import { notFound } from 'next/navigation'
import { getPages } from "@/actions/pages";



// Mark the revalidation interval if you want ISR-like behavior in the App Router
// (optional; if omitted, the page is SSR on every request)

export const revalidate = 60; 

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  // `params.slug` corresponds to the dynamic segment in the URL, e.g. /about -> "about"
  
  const data = await getPages(process.env.NEXT_PUBLIC_WEBSITE_ID!);
 
  if (!data) notFound();

  return (
    <>
      <PagesDebug pages={data} />
    </>
  );
}
