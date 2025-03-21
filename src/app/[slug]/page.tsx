import { unstable_cache } from 'next/cache';
import Content from "@/components/content";
import { notFound } from 'next/navigation';
import { getPageData } from "@/actions/pages";
import VisitorTracker from '@/components/visitor';

// This page component uses unstable_cache to cache getPageData for a given slug.
export default async function Page({ params }: { params: Promise<{ slug: string }>}) {
  const { slug } = await params;

  // Wrap the getPageData call in unstable_cache.
  // Including `slug` in the key ensures each slug gets its own cache entry.
  const getCachedPageData = unstable_cache(
    async () => {
      return await getPageData(process.env.WEBSITE_ID!, slug);
    },
    ['page-data', slug],
    { revalidate: 60 }
  );

  const { html, css, error } = await getCachedPageData();

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
