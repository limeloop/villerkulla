// app/[slug]/page.tsx
import { supabase } from "@/supabaseClient"; 
import Content from "./../components/content";
import { notFound } from 'next/navigation'



// Mark the revalidation interval if you want ISR-like behavior in the App Router
// (optional; if omitted, the page is SSR on every request)

export const revalidate = 60; 

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  // `params.slug` corresponds to the dynamic segment in the URL, e.g. /about -> "about"
  console.log(slug);

  const { data, error } = await supabase
    .from("website_pages")
    .select("*") // or whatever columns you need
    .eq("website_id", process.env.NEXT_PUBLIC_WEBSITE_ID)
    .eq("slug", "/")
    .single();
  // console.log(data)

  if (!data) notFound();

  if (error) {
    // handle error: you can throw or return a "not found" UI
    // throw new Error(error.message);
    return null;
  }

  // console.log(data)
  let page = data.html.replace("<body", "<div");
  page = page.replace("</body>", "</div>");

  return (
    <>
      <Content html={page} css={data.css} />{" "}
    </>
  );
}
