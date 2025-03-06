import Content from "@/components/content";
import { notFound } from 'next/navigation'
import { getPageData } from "@/actions/pages";


// Mark the revalidation interval if you want ISR-like behavior in the App Router
// (optional; if omitted, the page is SSR on every request)

export const revalidate = 60; 

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = await params;
  // `params.slug` corresponds to the dynamic segment in the URL, e.g. /about -> "about"
    
    const { html, css, error } = await getPageData(process.env.NEXT_PUBLIC_WEBSITE_ID!, slug);
 
  if(!html) notFound()

  if (error) {
    // handle error: you can throw or return a "not found" UI
    // throw new Error(error.message);
    return null;
  }

  
  let page = html.replace('<body','<div');
  page = page.replace('</body>','</div>');

  return (<><Content html={page} css={css} /> </>)
}
