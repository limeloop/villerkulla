// import { unstable_cache } from 'next/cache';
import Content from "@/components/content";
import { notFound } from 'next/navigation';
import { getPageData } from "@/actions/pages";
import VisitorTracker from '@/components/visitor';

export const revalidate = 5; // revalidate at every 5 seconds
export const dynamic = 'force-dynamic';

// This page component uses unstable_cache to cache getPageData for a given slug.
export default async function Page() {
  
  // Wrap the getPageData call in unstable_cache.
  // Including `slug` in the key ensures each slug gets its own cache entry.
  // const getCachedPageData = unstable_cache(
  //   async () => {
  //     return await getPageData(process.env.WEBSITE_ID!, "/", 'home');
  //   },
  //   ['page-data', 'home'],
  //   { revalidate: 5 }
  // );

  // const { html, css, error } = await getCachedPageData();
  const pageData = await getPageData(process.env.WEBSITE_ID!, "/", 'home');


  const { html, css, error } = pageData;

  if (!html) notFound();

  if (error) {
    // You can throw an error or handle it as needed.
    return null;
  }

  // Replace <body> tags with <div> tags.
  let page = html.replace('<body', '<div');
  page = page.replace('</body>', '</div>');

  return <>
  <Content html={page} css={css} />
  <VisitorTracker />
  </>;
}
