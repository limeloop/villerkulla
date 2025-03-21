// app/[slug]/page.tsx
import PagesDebug from "./../components/pagesDebug";
import { notFound } from 'next/navigation'
import { getPages } from "@/actions/pages";


export const revalidate = 60; 

export default async function Page() {
  
  const data = await getPages(process.env.NEXT_PUBLIC_WEBSITE_ID!);
  
  if (!data) notFound();

  return (
    <PagesDebug pages={data} />
  );
}
